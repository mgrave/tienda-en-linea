'use client';

import { QuantitySelector, SizeSelector } from "@/components";
import { Product, Size } from "@/interfaces";
import { useState } from "react";

interface Props {
    product: Product;
}

export const AddToCart = ({product}:Props) => {
    const [size, setSize] = useState<Size|undefined>();
    const [quantity, setQuantity] = useState<number>(1);
    const [posted, setPosted] = useState(false);

    const addToCart = () => {
        setPosted(true);
        console.log({size, quantity})
    }

  return (
    <>
    {
        posted && !size && (
    <span className="mt-2 text-red-500">
        Debe de seleccionar una talla*
    </span>

        )
    }
     {/* selector de tallas */}
     <SizeSelector 
     selectedSize={size} 
     availableSizes={product.sizes} 
     onSizeChanged={setSize}
     ></SizeSelector>
            {/* selector de cantidad */}
            <QuantitySelector 
            onQuantityChanged={setQuantity}
            quantity={quantity}
            ></QuantitySelector>

            {/* button */}
                <button onClick={addToCart} className="btn-primary my-5">
                    Agregar al carrito
                </button>
    </>
  )
}


