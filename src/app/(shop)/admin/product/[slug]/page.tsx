import { getCategories, getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";

interface Props {
    params: {
        slug: string;
    }
}

export default async function ProductPage({params}:Props){

    const {slug} = params;

    const [product, categories] = await Promise.all([
        getProductBySlug(slug),
        getCategories()
    ])

    //TODO: new
    if (!product) {
        redirect('/admin/products')
    }

    const title = (slug === 'new') ? 'Nuevo producto' : 'Editar producto'


    return (
       <>
       <Title title={product?.title ?? ''}/>
       <ProductForm product={product} categories={categories}/>
       </>
    )
}