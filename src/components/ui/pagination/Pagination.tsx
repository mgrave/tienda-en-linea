'use client';

import { generatePaginationNumbers } from "@/utils";
import clsx from "clsx";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props {
    totalPages: number;
}

export const Pagination = ({totalPages}: Props) => {
    //conseguir cierta informacion de la url
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const pageString = searchParams.get('page') ?? 1;
    const currentPage = isNaN(+pageString) ? 1 : +pageString;

    if(currentPage < 1 || isNaN(+pageString)){
        redirect(pathname);
    }
  
    const allPages = generatePaginationNumbers(currentPage, totalPages);
    

    //funcion que nos sirve para navegar en la url y se colocara en los href de los enlaces
    const createPageUrl = (pageNumber: number | string) => {

        //este nos servira para construir nuestros parametros de url
        const params = new URLSearchParams(searchParams);

        //regresa el mismo url en el cual nos encontramos
        if (pageNumber === '...'){
            return `${pathname}?${params.toString()}` 
        }
            //el + en pageNumber hace que lo transforme en un numero si este fuera un string
        if (+pageNumber <= 0){
            return `${pathname} `; //href="/"
        }

        if(+pageNumber > totalPages){ //para que se quede en la ruta en que se encuentra en caso de que le de click en NEXT pero ya no existen mas paginas para navegar.
            return ` ${pathname}?${params.toString()}`;
        }

        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    }

  return (
    
    <div className="flex text-center justify-center mt-10 mb-32">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">

          <li className="page-item"><Link
              className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPage - 1)}><IoChevronBackOutline size={30}></IoChevronBackOutline></Link></li>

            {
                allPages.map((page)=> (
                    <li key={page} className="page-item"><Link
                        className={
                            clsx(
                                "page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                                {
                                    'bg-blue-500 shadow-sm text-white hover:bg-blue-400': page === currentPage
                                }
                            )
                        }
                        href={createPageUrl(page)}>{page}</Link></li>

                ))
            }


          <li className="page-item"><Link
              className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPage + 1)}><IoChevronForwardOutline size={30}></IoChevronForwardOutline></Link></li>
        </ul>
      </nav>
    </div>
  )
}
