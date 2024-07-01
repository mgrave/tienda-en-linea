import { SideBar, TopMenu } from "@/components";

 export default function ShopLayout({children}: {
    children: React.ReactNode;
 }) {
    return (
        //min-h-screen hace que abarque toda la pantalla
      <main className="min-h-screen">
        <TopMenu/>
        <SideBar></SideBar>

          <div className="px-0 sm:px-8">
          {children}

          </div>
      </main>
    );
 }