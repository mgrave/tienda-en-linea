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
  


}