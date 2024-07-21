'use client';


import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";


interface Props {
    quantity: number;
    onQuantityChanged: (value: number) => void;
}

export const QuantitySelector = ({quantity, onQuantityChanged}:Props) => {
    
   
    //creamos la constante para recibir el valor
    const onValueChanged = (value: number) => {
        if (quantity + value < 1) return; //no va a regresar nada

        onQuantityChanged(quantity + value);
    }

  return (
    <div className="flex">
        
        <button onClick={ () => onValueChanged(-1)}>
            <IoRemoveCircleOutline size={30}></IoRemoveCircleOutline>
        </button>

        <span className="w-20 mx-3 px-5 bg-gray-200 text-center rounded">
            {quantity}
        </span>

        <button onClick={ () => onValueChanged(+1)}>
            <IoAddCircleOutline size={30}></IoAddCircleOutline>
        </button>
    </div>
  )
}
