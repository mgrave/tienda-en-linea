 export default function ShopLayout({children}: {
    children: React.ReactNode;
 }) {
    return (
        //min-h-screen hace que abarque toda la pantalla
      <main className="min-h-screen bg-gray-500">
        {children}
      </main>
    );
 }