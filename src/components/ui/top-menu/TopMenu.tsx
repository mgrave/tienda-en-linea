'use client'

import { titleFont } from '@/config/fonts'
import { useCartStore, useUIStore } from '@/store';
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5'


export const TopMenu = () => {
    //este closeMenu es un hook, asi que tenemos que usar use client
    const openSideMenu = useUIStore(state => state.openSideMenu);
    const totalItemsInCart = useCartStore(state => state.getTotalItems());

    const [loadedProductsInCart, setLoadedProductsInCart] = useState(false);

    useEffect(() => {
        setLoadedProductsInCart(true);
    }, [])

  return (
    <nav className='flex px-5 justify-between items-center w-full'>
    
    <div>
       
        <Link href='/'>
        <span className={` ${titleFont.className} antialiased font-bold`}> Teslo</span>
        <span> | Shop</span>
        </Link>
    </div>

    {/* Center Menu */}
    {/* hidden sm: block sirve en este caso para ocultar las categorias en pantallas chicas como los telefonos */}
    <div className='hidden sm:block'> 
            <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-100' href='/gender/men'>Hombres</Link>
            <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-100' href='/gender/women'>Mujeres</Link>
            <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-100' href='/gender/kid'>Niños</Link>
    </div>

    {/* Search, Cart, Menu */}
    <div className='flex items-center'>
        <Link href='/search' className='mx-2'>
        <IoSearchOutline className='w-5 h-5'></IoSearchOutline>
        </Link>

        <Link href={
           ( (totalItemsInCart === 0) && loadedProductsInCart)
            ? '/empty'
            : '/cart'
        } className='mx-2'>
        <div className='relative'>
            {
                (loadedProductsInCart && totalItemsInCart > 0 )&& (
            <span className='fade-in absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white'>
                {totalItemsInCart}
            </span>

                )
            }
            <IoCartOutline className='w-5 h-5'></IoCartOutline>
        </div>
        </Link>
        <button onClick={openSideMenu} className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'>
            Menú
        </button>
    </div>

    </nav>
  )
}
