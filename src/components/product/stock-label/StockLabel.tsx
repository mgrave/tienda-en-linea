'use client'

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts"
import { useEffect, useState } from "react";

//necesitamos recibir el slug para buscar el producto
interface Props {
    slug: string;
}

export const StockLabel = ({slug}:Props) => {
    const [stock, setStock] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    //con ese slug necesito determinar cuanta cantidad ahi en el stock
    useEffect(()=> {
        getStock();
    }, [])
    //creando funcion
    const getStock = async () => { 
        const inStock = await getStockBySlug(slug);
        setStock(inStock);
    }
    
  return (
    <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
    stock: {stock}
 </h1>
  )
}
