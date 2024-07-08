import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

//creando constante para los items
const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]

export default function() {
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
                    </div>
                    {/* items */}
                    {
                        productsInCart.map(product => (
                            <div key={product.slug} className="flex">
                                <Image 
                                src={`/products/${product.images[0]}`}
                                alt={product.title}
                                width={100}
                                height={100}
                                className="mr-5 rounded"
                                priority={true}
                                ></Image>

                                <div>
                                    <p>{product.title}</p>
                                    <p>${product.price}</p>
                                    <QuantitySelector quantity={1}></QuantitySelector>
                                    <button className="underline mt-3">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    }



                    {/* checkOut */}
                </div>
            </div>
        </div>
    )
}