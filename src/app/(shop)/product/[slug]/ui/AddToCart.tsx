'use client';

import { QuantitySelector, SizeSelector } from "@/components";
import type { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";
import { useState } from "react";

interface Props {
    product: Product;
}

export const AddToCart = ({product}:Props) => {
   
    //esta es la referencia a la funcion addprotuctToCart
    const addProductToCart = useCartStore(state => state.addProductTocart);
    const [selectSize, setSize] = useState<Size|undefined>();
    const [quantity, setQuantity] = useState<number>(1);
    const [posted, setPosted] = useState(false);

    const addToCart = () => {
        setPosted(true);
        if(!selectSize) return;
        console.log({selectSize, quantity, product})
        //primero extraer las propiedades que necesitamos
        const cartProduct: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            quantity: quantity,
            size: selectSize,
            image: product.images[0]
        }
        //TODO: agregar al carrito
        addProductToCart(cartProduct);
        setPosted(false);
        setQuantity(1);
        setSize(undefined);
        console.log('aqui ya esta en el carrito' ,cartProduct);
    }
   

  return (
    <>
    {
        posted && !selectSize && (
    <span className="mt-2 text-red-500">
        Debe de seleccionar una talla*
    </span>

        )
    }
     {/* selector de tallas */}
     <SizeSelector 
     selectedSize={selectSize} 
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


