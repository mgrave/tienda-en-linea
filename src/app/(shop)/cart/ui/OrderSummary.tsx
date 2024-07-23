'use client';

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react";

export const OrderSummary = () => {

    const [loaded, setLoaded] = useState(false);
    const {itemsInCart, subTotal, tax, total} = useCartStore(state => state.getSumaryInformation())
    useEffect(() => {
        setLoaded(true);
    },[])

    //TODO: en vez del parrafo, agregar  un skeleton para que se vea mas bonito
    if (!loaded) return <p>Loading...</p>

  return (

    <div className="grid grid-cols-2">
    <span>Number products</span>
    <span className="text-right">{itemsInCart === 1 ? 'artículo': `${itemsInCart} artículos`}</span>

    <span>Subtotal</span>
    <span className="text-right">{currencyFormat(subTotal)}</span>
    
    <span>Taxes (11.97%)</span>
    <span className="text-right">{currencyFormat(tax)}</span>
    
    <span className="mt-5 text-2xl">Total:</span>
    <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
</div>
  )
}
