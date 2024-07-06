'use client';

import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";


interface Props {
    quantity: number;
}

export const QuantitySelector = ({quantity}:Props) => {
    
    const [count, setCount] = useState(quantity);
    //creamos la constante para recibir el valor
    const onQuantityChanged = (value: number) => {
        if (count + value < 1) return; //no va a regresar nada

        setCount(count + value);
    }

  return (
    <div className="flex">
        
        <button onClick={ () => onQuantityChanged(-1)}>
            <IoRemoveCircleOutline size={30}></IoRemoveCircleOutline>
        </button>

        <span className="w-20 mx-3 px-5 bg-gray-200 text-center rounded">
            {count}
        </span>

        <button onClick={ () => onQuantityChanged(+1)}>
            <IoAddCircleOutline size={30}></IoAddCircleOutline>
        </button>
    </div>
  )
}
