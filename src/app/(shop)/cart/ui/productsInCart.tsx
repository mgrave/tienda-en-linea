'use client';

import { QuantitySelector } from "@/components";
import { useCartStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const ProductsInCart = () => {
    const updateProductQuantity = useCartStore(state => state.updateProductQuantity);
    const removeProduct = useCartStore(state => state.removeProduct);
    const [loaded, setLoaded] = useState(false);
    const productsInCart = useCartStore(state => state.cart);

    useEffect(() => {
        setLoaded(true);
    });

    if (!loaded) {
        return <p>Loading...</p>
    }
  return (
   <>
            {
                        productsInCart.map(product => (
                            <div key={`${product.slug}-${product.size}`} className="flex mb-5">
                                <Image 
                                src={`/products/${product.image}`}
                                alt={product.title}
                                width={100}
                                height={100}
                                style={{
                                    width: '100px',
                                    height: '100px'
                                }}
                                className="mr-5 rounded"
                                priority={true}
                                ></Image>

                                <div>
                                    <Link className="hover:underline cursor-pointer" href={`/product/${product.slug}`}>
                                    <p>{product.title} {product.size}</p>
                                    
                                    </Link>
                                    <p>${product.price}</p>
                                    <QuantitySelector 
                                    quantity={product.quantity}
                                    onQuantityChanged={value => updateProductQuantity(product, value)}
                                    ></QuantitySelector>
                                    <button  
                                    onClick={ () => removeProduct(product)}
                                    className="underline mt-3">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    }
   </>
  )
}
