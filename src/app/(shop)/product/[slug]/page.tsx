import { QuantitySelector, SizeSelector } from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
    params: {
        slug: string;
    }
}

//desestructuramos los props
export default function({params}: Props) {

const {slug} = params;
const product = initialData.products.find(product => product.slug === slug);

if (!product){
    //importar el notFound del next-navigation
    notFound();
}


    return (
        <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
           {/* Slideshow*/}
           <div className="col-span-1 md:col-span-2 ">
            Hola mundo
           </div>

           {/* Detalles del producto */}
           <div className="col-span-1 px-5 ">
            <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
                {product.title}
            </h1>
            <p className="text-lg mb-5">${product.price}</p>
            {/* selector de tallas */}
                <SizeSelector selectedSize={product.sizes[0]} availableSizes={product.sizes}></SizeSelector>
            {/* selector de cantidad */}
            <QuantitySelector quantity={2}></QuantitySelector>

            {/* button */}
                <button className="btn-primary my-5">
                    Agregar al carrito
                </button>
            {/* Descripcion */}
            <h3 className="font-bold text-sm">Descripción</h3>
            <p className="font-light">
                {product.description}
            </p>

           </div>
        </div>
    )
}