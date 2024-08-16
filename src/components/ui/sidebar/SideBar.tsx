'use client'

import Link from 'next/link'
import { IoCloseOutline, IoPersonOutline, IoLogOutOutline, IoSearchOutline, IoTicketOutline, IoLogOut, IoShirtOutline, IoPeopleOutline } from 'react-icons/io5'

import { useUIStore } from '@/store';
import clsx from 'clsx';

import { useSession } from 'next-auth/react';
import {signOut} from 'next-auth/react';



export const SideBar = () => {

const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen);
const closeMenu = useUIStore(state => state.closeSideMenu);
const {data: session} = useSession();
const isAuthenticated = !!session?.user;
const isAdmin = (session?.user.role === 'admin');


// const refresh = () => {

//     logout();
//     closeMenu();
//     window.location.replace('/');



//   }
console.log({isAdmin});
console.log({session});





  return (
    <div>
        {/* Background  black*/}
        {
            isSideMenuOpen && (

                <div
                className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30'></div>
            )
        }

        {/* blur */}
        {
            isSideMenuOpen && (

                <div
                onClick={closeMenu}
                 className='fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm'></div>
            )
        }

        {/* SideMenu */}
        <nav 
        //TODO: Efecto de slide
        className={
            clsx(
                'fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
               //si el menu no esta abierto entonces se va a anadir esa clase
                {
                    "translate-x-full": !isSideMenuOpen
                }
            )
        }>
            <IoCloseOutline 
            size={50}
            className='absolute top-5 right-5 cursor-pointer'
            //evento
            onClick={() => closeMenu()}
            ></IoCloseOutline>

            {/* Input de busqueda */}
            <div className='relative mt-14'>
                <IoSearchOutline
                size={20}
                className='absolute top-2 left-2'
                ></IoSearchOutline>
                <input 
                type="text"
                placeholder='Buscar'
                className='w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500'
                />
            </div>

            {/* options menu */}
            {
                isAuthenticated && (
                    <>
                    
                    <Link 
                    href="/profile"
                     //evento
                     onClick={() => closeMenu()}
                    className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                    >
                        <IoPersonOutline 
                        size={30}
                        >
                        </IoPersonOutline>
                            <span className='ml-3 text-xl '>Perfil</span>
                    </Link>
                    
                    <Link 
                    href="/orders"
                    onClick={() => closeMenu()}
                    className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                    >
                        <IoTicketOutline 
                        size={30}
                        >
                        </IoTicketOutline>
                            <span className='ml-3 text-xl '>Ordenes</span>
                    </Link>
                    </>
                        )
            }

            {
                isAuthenticated && (
                    <button 
                    //mandamos a llamar el logout con funcion de flecha, porque necesitamos mandar un objeto plano
                    className='flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                    onClick={() => signOut()}
                    
                    >
                        <IoLogOut 
                        size={30}
                        >
                        </IoLogOut>
                            <span className='ml-3 text-xl '>Salir</span>
                    </button>
                )
            }

            {
                !isAuthenticated && (
                    <Link 
                    href="/auth/login"
                    className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                    onClick={() => closeMenu()}
                    >
                        <IoLogOutOutline 
                        size={30}
                        >
                        </IoLogOutOutline>
                            <span className='ml-3 text-xl '>Ingresar</span>
                    </Link>
                  
                )
            }

            {
                isAdmin && (
                    <>
                        {/* line Seoarator */}
            <div className='w-full h-px bg-gray-200 my-10'></div>

                <Link 
                href="/"
                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                >
                    <IoShirtOutline 
                    size={30}
                    >
                    </IoShirtOutline>
                        <span className='ml-3 text-xl '>Productos</span>
                </Link>
                <Link 
                href="/admin/orders"
                onClick={() => closeMenu()}
                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                >
                    <IoTicketOutline 
                    size={30}
                    >
                    </IoTicketOutline>
                        <span className='ml-3 text-xl '>Ordenes</span>
                </Link>
                <Link 
                href="/"
                className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                >
                    <IoPeopleOutline 
                    size={30}
                    >
                    </IoPeopleOutline>
                        <span className='ml-3 text-xl '>Usuarios</span>
                </Link>
                                    </>
                                )
                            }

        
        </nav>
    </div>
  )
}
