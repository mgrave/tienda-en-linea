import { ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";
import {Category} from '@/interfaces'
import { notFound } from "next/navigation";

//De aqui vamos a tomar los productos, por el momento
const seedProducts = initialData.products;

interface Props {
    params: {
        id: Category;
    }
}


export default function({params}: Props) {

    const {id} = params;

    const products = seedProducts.filter(product => product.gender === id);

    const labels:  Record<Category, string> = {
        'men': 'para hombres',
        'women': 'para mujeres',
        'kid': 'para niños',
        'unisex': 'Para todos',
    }

    // if (id === 'kids') {
    //     notFound();
    // }

    return (
        <>
    
        <Title 
            title={`Artìculos ${labels [id]}`} 
        subtitle="Todos los Productos" 
        className="mb-2">
     
        </Title>
     
        <ProductGrid products={products}></ProductGrid>
        </>
    )
}