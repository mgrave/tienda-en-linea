import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    cart: CartProduct[];
    //metodos para modificar el carrito de compras
    getTotalItems: () => number;

    getSumaryInformation: () => {
        subTotal: number;
        tax: number;
        total: number;
        itemsInCart: number;
    };

    //addProductToCart
    addProductTocart: (product: CartProduct) => void;
    //updateProductQuantity
    updateProductQuantity: (product: CartProduct, quantity: number) => void;
    //removeProduct
    removeProduct: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(
    
    persist(
        //la definicion como primer arguemento
        (set, get) => ({

            cart: [],
        
            //Methods
            getTotalItems: () => {
                const {cart} = get();
                //tenemos que barrer todos nuestros elementos
                return cart.reduce((total, item) => total + item.quantity, 0);
            },


                getSumaryInformation: () => {
                    const {cart} = get();

                    const subTotal = cart.reduce(
                        (subTotal, product) => (product.quantity * product.price) + subTotal,
                        0
                    );
                    const tax = subTotal * 0.12;
                    const total = subTotal + tax;
                    const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0)

                    return {
                        subTotal, tax, total, itemsInCart
                    }
                },

            addProductTocart: (product: CartProduct) => {
                const {cart} = get();
            
                //1. Revisar si el producto existe en el carrito con la talla seleccionada
                const productInCart = cart.some(
                    //la funcion de some verifica si hay al menos 1 que cumpla la condicion
                    (item) => item.id === product.id && item.size === product.size
                );
                console.log('el producto va en camino al carrito', productInCart);
                if (!productInCart){
                    set({cart: [...cart, product]});
                    return;
                }
                //paso 2. se que el producto existe por talla, tengo que incrementar
                //ahoara vamos a barrer el carrito de comprasa para que regrese un carrito de compras
                const updateCartProducts = cart.map((item)=> {
                    //este es el articulo que yo quiero actualizar
                    if (item.id === product.id && item.size === product.size){
                        //aqui regresamos el articulo actualizado
                        return {...item, quantity: item.quantity + product.quantity}
                    }
                    return item;
                   
                });
                set({cart: updateCartProducts});
            },

            updateProductQuantity: (product: CartProduct, quantity: number) => {
                const {cart} = get();

                const updateCartProducts = cart.map( item => {
                    if (item.id === product.id && item.size === product.size){
                        return {...item, quantity: quantity};
                    }
                    //si ese no es el articulo, entonces que lo regrese para no hacerle modificaciones
                    return item;
                });
                set({cart: updateCartProducts});
            },
            removeProduct: (product: CartProduct) => {
                const {cart} = get();

                const updateCartProduct = cart.filter( 
                    (item) =>  item.id !== product.id || item.size !== product.size
                );
                set({cart: updateCartProduct});
            }
        })
        , {
            //segundo argumento va el nombre de nuestro store, el nombre de la llave que le queremos dar en el local storage
            name: 'shopping-cart'
        }
    )
)