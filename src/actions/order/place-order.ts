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
    const prismaTx = await prisma.$transaction(async(tx) => {

        //paso 1. actualizar el stock de los productos


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
            updatedProducts: [],
            order: order,
            orderAddress: orderAddress,
        }
    });

}