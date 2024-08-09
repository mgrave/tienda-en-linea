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


}