import { ProductGrid, Title } from "@/components";
import { initialData } from '../../seed/seed';
import { getPaginatedProductsWithImages } from "@/actions";

//este es el arreglo de productos semilla de la base de datos
const products = initialData.products;


export default async function Home() {

  const productTemp = await getPaginatedProductsWithImages();

  return (
   <>
   <Title 
   title="Tienda" 
   subtitle="Todos los Productos" 
   className="mb-2">

   </Title>

   <ProductGrid products={products}></ProductGrid>
   </>
  )
}