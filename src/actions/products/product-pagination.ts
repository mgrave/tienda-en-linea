'use server'

import prisma from "@/lib/prisma"

interface PaginationOptions {
    page?: number;
    take?: number;
}

export const getPaginatedProductsWithImages = async ({
    page = 1,
    take = 12,
}: PaginationOptions) => {
    //validacion por si no mandan un numero en la url
    if (isNaN(Number(page))) page = 1;
    if (page < 1 ) page = 1;

    try {
        const products = await prisma.product.findMany({
            take: take,
            skip: (page - 1 ) * take,
            include: {
                ProductImage: {
                    take: 2,
                    select: {
                        url: true
                    }
                }
            }
        })

      

        //regresamos un objeto
        return {
            products: products.map( product => ({
                ...product,
                images: product.ProductImage.map(image => image.url)
            }))
        }
    } catch (error) {
        throw new Error('No se pudo cargar los productos');
    }
}