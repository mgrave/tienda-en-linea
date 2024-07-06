//si le agregamos la palabra type a la importacion, significa que esto lo puede ignorar en el tiempo de transpilacion.
//porque no estamos importando el objeto, solamente el tipo.
import type { Size } from "@/interfaces"
import clsx from "clsx";

interface Props {
    selectedSize: Size;
    availableSizes: Size[];
}

//aqui lo vamos a desestructurar
export const SizeSelector = ({selectedSize, availableSizes}: Props) => {
  
    return (
  <div className="my-5">
        <h3 className="font-bold mb-4">Tallas disponibles</h3>

        {/* Aqui viene la construccion de las tallas */}
        <div className="flex">
            {
                availableSizes.map( size => (
                    // para hacer el claseName como estamos en un map, tenemos que poner la key.
                    <button key={size} className={
                        clsx(
                            "mx-2 hover:underline text-lg",
                            {
                                //el clsx, sirve para agregar una expresion en la clase
                                'underline': size === selectedSize
                            }
                        )
                    }>
                        {size}
                    </button>
                ))
            }
        </div>
  </div>
  )
}
