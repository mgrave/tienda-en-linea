'use client';

import { placeOrder } from "@/actions";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat, } from "@/utils";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const PlaceOrder = () => {
    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    //aqui tomaremos la informacion que viene de nuestro store
    const address = useAddressStore(state => state.address);

    const {itemsInCart, subTotal, tax, total} = useCartStore(state => state.getSumaryInformation());

    const cart = useCartStore(state => state.cart);
    const clearCart = useCartStore(state => state.clearCart);

    useEffect(() => {
        setLoaded(true);
    }, []);

    //funcion para dar solo un click al boton de pagar orden
    const onPlaceOrder = async() => {
        setIsPlacingOrder(true);
        // await sleep(2);

        const productsToOrder = cart.map(product => ({
            productId: product.id,
            quantity: product.quantity,
            size: product.size,
        }))

       

        const resp = await placeOrder(productsToOrder, address)
        if(!resp.ok){
            setIsPlacingOrder(false);
            setErrorMessage(resp.message);
            return; 
        }

        //despues de aqui todo ha salido bien, asi que tenemos que limpiar el carrito y redireccionar a la persona
        clearCart();
        router.replace('/orders/' + resp.order?.id)
         

    }

    if (!loaded){
        return <p>Loading......</p>
    }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">

    <h2 className="font-bold text-2xl mb-2">Delivery address</h2>
    <div className="mb-10">
        <p className="text-xl">{address.firstName} {address.lastName}</p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.city} {address.state}</p>
        <p>{address.postalCode}</p>
        <p>{address.country}</p>
        <p>{address.phone}</p>

    </div>
    {/*    Divider */}
    <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>

    <h2 className="text-2xl mb-2">Purchase order summary</h2>

    <div className="grid grid-cols-2">
    <span>Number products</span>
    <span className="text-right">{itemsInCart === 1 ? 'artículo': `${itemsInCart} artículos`}</span>

    <span>Subtotal</span>
    <span className="text-right">{currencyFormat(subTotal)}</span>
    
    <span>Taxes (12%)</span>
    <span className="text-right">{currencyFormat(tax)}</span>
    
    <span className="mt-5 text-2xl">Total:</span>
    <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
    </div>

    <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
            {/* Disclaimer */}
            <span className="text-xs">
                Al hacer click en &quot;Pay Now&quot;, aceptas nuestros 
                <a href="#" className="underline"> términos y condiciones</a> y 
                <a href="#" className="underline"> política de privacidad</a>
            </span>
        </p>

        <p className="text-red-500">{errorMessage}</p>

        <button 
        onClick={onPlaceOrder}
        className={
            clsx({
                'btn-primary': !isPlacingOrder,
                'btn-disabled': isPlacingOrder
            })
        } 
        //href="/orders/1234"
        >
        Pay Now   
        </button>
    </div>

</div>
  )
}
