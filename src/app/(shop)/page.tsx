import { ProductGrid, Title } from "@/components";
import { initialData } from '../../seed/seed';

//este es el arreglo de productos semilla de la base de datos
const products = initialData.products;


export default function Home() {
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