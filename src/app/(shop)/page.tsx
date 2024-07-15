import { ProductGrid, Title } from "@/components";

import { getPaginatedProductsWithImages } from "@/actions";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: string;
  }
}


export default async function Home({searchParams}: Props) {
//si viene el searchParams lo parseamos y si no viene entonces va a ser la pagina 1
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const {products, currentPage, totalPages} = await getPaginatedProductsWithImages({page});
 
  if (products.length === 0){
    redirect('/')
  }

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