import { create } from "zustand";
import { persist } from "zustand/middleware";



interface State {
    address: {
        firstName: string;
        lastName: string;
        address: string;
        address2?: string;
        postalCode: string;
        city: string;
        state: string;
        country: string;
        phone: string;
    }

    //methods
    setAddress: (address: State['address']) => void;
}

export const useAddressStore = create<State>()(
    persist(
        (set, get) => ({
            address: {
                firstName: '',
                lastName: '',
                address: '',
                address2: '',
                postalCode: '',
                city: '',
                state: '',
                country: '',
                phone: '',
            },
            //cuando mandemos a llamar el setAddress, le pasamos toda la direccion completa
            // y la establecemos arriba en el address con los string vacios
            setAddress: (address) => {
                set({address});
            }
        }),
        //luego se va a grabar en el localstorage automaticamente y lo va cargar automaticamente del localstorage tambien.
        {
            name: 'address-storage'
        }
    )
    

);