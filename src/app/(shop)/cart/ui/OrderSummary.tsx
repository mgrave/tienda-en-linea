'use client';

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const OrderSummary = () => {
  const router = useRouter();


    const [loaded, setLoaded] = useState(false);
    const {itemsInCart, subTotal, tax, total} = useCartStore(state => state.getSumaryInformation())
    useEffect(() => {
        setLoaded(true);
    },[])


    useEffect(() => {

      if ( itemsInCart === 0 && loaded === true )   {
        router.replace('/empty')
      }
  
  
    },[ itemsInCart, loaded, router ])

    //TODO: en vez del parrafo, agregar  un skeleton para que se vea mas bonito
    if (!loaded) return <p>Loading...</p>

  return (

    <div className="grid grid-cols-2">
    <span>Number products</span>
    <span className="text-right">{itemsInCart === 1 ? 'artículo': `${itemsInCart} artículos`}</span>

    <span>Subtotal</span>
    <span className="text-right">{currencyFormat(subTotal)}</span>
    
    <span>Taxes</span>
    <span className="text-right">{currencyFormat(tax)}</span>
    
    <span className="mt-5 text-2xl">Total:</span>
    <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
</div>
  )
}
