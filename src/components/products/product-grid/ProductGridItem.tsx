'use client';

import {Product} from '@/interfaces';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
    product: Product;
}

export const ProductGridItem = ({product}: Props) => {

        //nuestro estado inicial
        const [displayImage, setDisplayImage] = useState(product.images[0]);

    return (
        //el overflow hiden es para que corte las partes que se salgan de las imagenes.
        <div className='rounded-md overflow-hidden fade-in'>
            <Link href={`/product/${product.slug} `}>
            <Image
            src={`/products/${displayImage}`}
            alt={product.title}
            className='w-full object-cover rounded'
            width={500}
            height={500}
            onMouseEnter={() => setDisplayImage(product.images[1])}
            onMouseLeave={() => setDisplayImage(product.images[0]) }
            >
            </Image>
            
            </Link>

            <div className='p-4 flex flex-col'>
            <Link className='hover:text-blue-500' href={`/product/${product.slug} `}>
            {product.title}
            </Link>
            <span className='font-bold'>${product.price}</span>
            </div>
        </div>
    )
}