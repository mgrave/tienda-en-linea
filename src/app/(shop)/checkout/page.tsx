import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

//creando constante para los items
const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]

export default function CheckoutPage() {
    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1000px]">
                <Title title="Verify purchase order"></Title>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {/* carrito */}
                    <div className="flex flex-col mt-5">
                        {/* <span className="text-xl">Add more items</span> */}
                        <Link href="/cart" className="underline mb-5">
                        Edit shopping cart
                        </Link>
                    {/* items */}
                    {
                        productsInCart.map(product => (
                            <div key={product.slug} className="flex mb-5">
                                <Image 
                                src={`/products/${product.images[0]}`}
                                alt={product.title}
                                width={100}
                                height={100}
                                style={{
                                    width: '100px',
                                    height: '100px'
                                }}
                                className="mr-5 rounded"
                                priority={true}
                                ></Image>

                                <div>
                                    <p>{product.title}</p>
                                    <p>${product.price}</p>
                                    <p className="font-bold">Subtotal: ${product.price * 3}</p>
                                    
                                </div>
                            </div>
                        ))
                    }

                    </div>



                    {/* checkOut */}
                    <div className="bg-white rounded-xl shadow-xl p-7">

                        <h2 className="font-bold text-2xl mb-2">Delivery address</h2>
                        <div className="mb-10">
                            <p className="text-xl">Ramses indalecio</p>
                            <p>Av. Paseo de reforma 6464</p>
                            <p>Col. Centro</p>
                            <p>Puebla</p>
                            <p>CP: 54372</p>
                            <p>12323-343-23</p>

                        </div>
                        {/*    Divider */}
                        <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>

                        <h2 className="text-2xl mb-2">Purchase order summary</h2>

                        <div className="grid grid-cols-2">
                            <span>Number products</span>
                            <span className="text-right">3 items</span>

                            <span>Subtotal</span>
                            <span className="text-right">$ 100</span>
                            
                            <span>Taxes (11.97%)</span>
                            <span className="text-right">$ 11.97</span>
                            
                            <span className="mt-5 text-2xl">Total:</span>
                            <span className="mt-5 text-2xl text-right">$ 111.97</span>
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

                            <Link 
                            className="flex btn-primary justify-center" 
                            href="/orders/1234">
                            Pay Now   
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}