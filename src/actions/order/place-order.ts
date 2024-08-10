'use server';

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
    productId: string;
    quantity: number;
    size: Size;
}

export const  placeOrder = async(producIds: ProductToOrder[], address: Address) => {

    const session = await auth();
    const userId = session?.user.id;

    //verificar session de usuario

    if (!userId) {
        return {
            ok: false,
            message: 'No hay sesión de usuario'
        }
    }
    //Obtener la informacion de los productos
    //nota: podemos llevar mas de 2 productos  con el mismo ID
    const products = await prisma.product.findMany({
        where: {
            id: {
                in: producIds.map(p => p.productId)
            }
        }
    });
    //calcular los montos
    const itemsInOrder = producIds.reduce((count, p) =>count + p.quantity , 0);
    console.log(itemsInOrder);
  
    //calcular los totales
    const {subTotal, tax, total} = producIds.reduce( (totals, item) => {

        const productQuantity = item.quantity;
        const product = products.find(product => product.id === item.productId);

        if(!product) throw new Error(`${item.productId} no existe Error - 500`);

        const subTotal = product.price * productQuantity;

        totals.subTotal += subTotal;
        totals.tax += subTotal * 0.12;
        totals.total += subTotal * 1.12;

        return totals;
    }, {subTotal: 0, tax: 0, total: 0})
   
    //Crear la transacción de base de datos
    try {
        const prismaTx = await prisma.$transaction(async(tx) => {

            //paso 1. actualizar el stock de los productos
            const updatedProductsPromises = products.map( (product) => {
    
                //acumular los valores
                const productQuantity = producIds.filter(
                    p => p.productId === product.id
                ).reduce((acc, item) => item.quantity + acc, 0);
    
                if (productQuantity === 0){
                    throw new Error(`${product.id} no tiene cantidad definida`);
                }
                
                return tx.product.update({
                    where: {id: product.id},
                    data: {
                        inStock: {
                            decrement: productQuantity
                        }
                    }
                })
    
            });
            //aqui esta nuestro arreglo con todos los productos actualizados
            const updatedProducts = await Promise.all(updatedProductsPromises);
    
            //Verificar valores negativos en las existencias = no hay stock
            updatedProducts.forEach(product => {
                if (product.inStock < 0){
                    throw new Error(`${product.title} no tiene inventario suficiente`)
                }
            });
    
    
    
            //paso 2. crear la orden ENCABEZADO - DETALLE
            const order = await tx.order.create({
                data: {
                    userId: userId,
                    itemsInOrder: itemsInOrder,
                    subTotal: subTotal,
                    tax: tax,
                    total: total,
    
                    OrderItem: {
                        createMany: {
                            data: producIds.map(p => ({
                                quantity: p.quantity,
                                size: p.size,
                                productId: p.productId,
                                price: products.find(product => product.id === p.productId)?.price ?? 0
                            }))
                        }
                    }
                }
            });
    
            //Validar si el price es cero, entonces lanzar un error
    
    
            
            //paso 3. Crear la direccion de la orden
            const {country, ...restAddress} = address;
            const orderAddress = await tx.orderAddress.create({
                data: {
                    ...restAddress,
                    countryId: country,
                    orderId: order.id,
                }
            })
    
    
            return {
                updatedProducts: updatedProducts,
                order: order,
                orderAddress: orderAddress,
            }
        });

        return {
            ok: true,
            order: prismaTx.order,
            prismaTx: prismaTx,

        }

    } catch (error:any) {
        return {
            ok: false,
            message: error?.message,
        }
    }
  

}