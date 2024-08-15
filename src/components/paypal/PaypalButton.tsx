'use client';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {CreateOrderData, CreateOrderActions, OnApproveActions, OnApproveData} from '@paypal/paypal-js';
import { paypalCheckPayment, setTransactionId } from "@/actions";

interface Props {
    orderId: string;
    amount: number;
}

export const PaypalButton = ({orderId, amount}:Props) => {
    const [{ isPending }] = usePayPalScriptReducer();

    const rountedAmount = (Math.round(amount * 100)) / 100; //para tener el numero con 2 decimales


    if (isPending) {
        return (
            <div className="animate-pulse">
                <div className="h-9 bg-gray-300 rounded"></div>
                <div className="h-9 bg-gray-300 rounded mt-2"></div>
                <div className="h-9 bg-gray-300 rounded mt-2"></div>
            </div>
        )
    }

    //generar el ID de transaction
    const createOrder = async(data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {

        const transactionId = await actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    invoice_id: orderId,
                    amount: {
                        value: `${rountedAmount}`,
                        currency_code: 'USD'
                    }
                }
            ]
        });
        //Guardamos el ID en la orden en la base de datos
        const {ok} = await setTransactionId(orderId, transactionId);
        if (!ok) {
            throw new Error('No se pudo actualizar la orden'); 
        }

        return transactionId;
    }

    const onApprove = 
    async( data: OnApproveData, actions: OnApproveActions) => {
       
        const details = await actions.order?.capture();
        if(!details?.id) return;

        await paypalCheckPayment(details.id);
    }

  return (
    <div className="relative z-0">
        <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        ></PayPalButtons>

    </div>
  )
}
