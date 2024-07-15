import { ProductGrid, Title } from "@/components";

import { getPaginatedProductsWithImages } from "@/actions";

interface Props {
  searchParams: {
    page?: string;
  }
}


export default async function Home({searchParams}: Props) {
//si viene el searchParams lo parseamos y si no viene entonces va a ser la pagina 1
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const {products} = await getPaginatedProductsWithImages({page});
 

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