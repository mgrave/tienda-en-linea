import {Title } from "@/components";
import Link from "next/link";
import { ProductsInCart } from "./ui/productsInCart";
import { OrderSummary } from "./ui/OrderSummary";



//creando constante para los items

export default function CartPage() {

    // redirect('/empty');

    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
            <div className="flex flex-col w-[1000px]">
                <Title title="Shopping Cart"></Title>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    {/* carrito */}
                    <div className="flex flex-col mt-5">
                        <span className="text-xl">Add more items</span>
                        <Link href="/" className="underline mb-5">
                        Continue shopping
                        </Link>
                    {/* items */}
                     <ProductsInCart/>

                    </div>



                    {/* checkOut */}
                    <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
                        <h2 className="text-2xl mb-2">Purchase order summary</h2>

                        <OrderSummary/>

                        <div className="mt-5 mb-2 w-full">
                            <Link className="flex btn-primary justify-center" href="/checkout/address">
                            Checkout    
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}