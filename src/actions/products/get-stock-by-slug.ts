'use server';

import prisma from "@/lib/prisma";

export const getStockBySlug = async (slug: string): Promise<number> => {

    try {
       const stock = await prisma.product.findFirst({
        where: {slug},
        //necesito selecionar el instock en true, porque es el unico campo que necesito
        select: {inStock: true}
       });
       //este siempre va a regresar uyn numero
       return stock?.inStock ?? 0;
      
    } catch (error) {
       return 0;
    }
}