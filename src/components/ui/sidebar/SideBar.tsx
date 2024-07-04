'use client'

import Link from 'next/link'
import { IoCloseOutline, IoPersonOutline, IoLogOutOutline, IoSearchOutline, IoTicketOutline, IoLogOut, IoShirtOutline, IoPeopleOutline } from 'react-icons/io5'

import { useUIStore } from '@/store';
import clsx from 'clsx';

export const SideBar = () => {

const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen);
const closeMenu = useUIStore(state => state.closeSideMenu);


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
            <Link 
            href="/"
            className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            >
                <IoPersonOutline 
                size={30}
                >
                </IoPersonOutline>
                    <span className='ml-3 text-xl '>Perfil</span>
            </Link>
            
            <Link 
            href="/"
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
                <IoLogOutOutline 
                size={30}
                >
                </IoLogOutOutline>
                    <span className='ml-3 text-xl '>Ingresar</span>
            </Link>
            <Link 
            href="/"
            className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            >
                <IoLogOut 
                size={30}
                >
                </IoLogOut>
                    <span className='ml-3 text-xl '>Salir</span>
            </Link>

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
            href="/"
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
        </nav>
    </div>
  )
}
