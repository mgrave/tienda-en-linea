'use server';

import prisma from "@/lib/prisma";

export const getCountries = async() => {

    try {
        const countries = await prisma.country.findMany({
            orderBy: {
                name: 'asc'
            }
        });

        //aqui nos regresa el arreglo de paises
        return countries;
        
    } catch (error) {
        console.log(error);
        return [];
    }
}