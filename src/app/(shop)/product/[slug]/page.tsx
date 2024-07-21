export const revalidate = 604800; //en 7 dias se va a revalidar

import { getProductBySlug } from "@/actions";
import { ProductMobileSlideshow, ProductSlideshow, QuantitySelector, SizeSelector, StockLabel } from "@/components";
import { titleFont } from "@/config/fonts";
import { Metadata, ResolvingMetadata } from "next";

import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";

interface Props {
    params: {
        slug: string;
    }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    // read route params
    const slug = params.slug
   
    // fetch data
    const product = await getProductBySlug(slug);
   
    // optionally access and extend (rather than replace) parent metadata
    //const previousImages = (await parent).openGraph?.images || []
   
    return {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      openGraph: {
        title: product?.title ?? 'Producto no encontrado',
        description: product?.description ?? '',
       // images: ['/some-specific-page-image.jpg', ...previousImages],
       images: [`/product/${product?.images[1]}`],
      },
    }
  }

//desestructuramos los props
export default async function ProductBySlugPage({params}: Props) {

const {slug} = params;
const product = await getProductBySlug(slug);
console.log(product);

if (!product){
    //importar el notFound del next-navigation
    notFound();
}


    return (
        <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
           {/* Slideshow*/}
           <div className="col-span-1 md:col-span-2 ">

            {/* Mobile Slideshow */}
            <ProductMobileSlideshow 
            title={product.title}
            images={product.images}
            //en pantallas medianas va a estar oculto
            className="block md:hidden"
            >                
            </ProductMobileSlideshow>

            {/* Desktop Slideshow */}
           <ProductSlideshow 
           title={product.title} 
           images={product.images}
            className="hidden md:block"
           >
           </ProductSlideshow>
           </div>

           {/* Detalles del producto */}
           <div className="col-span-1 px-5 ">
            <StockLabel slug={product.slug}></StockLabel>
            <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
                {product.title}
            </h1>

            <p className="text-lg mb-5">${product.price}</p>

            <AddToCart product={product}></AddToCart>
           
            {/* Descripcion */}
            <h3 className="font-bold text-sm">Descripción</h3>
            <p className="font-light">
                {product.description}
            </p>

           </div>
        </div>
    )
}