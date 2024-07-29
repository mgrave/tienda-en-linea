import type { Metadata } from "next";

import "./globals.css";
import { inter } from "@/config/fonts";
import { Provider } from "@/components";



export const metadata: Metadata = {
  title: {
    template: '%s - Store',
    default: 'Home'
  },
  description: "Tienda virtual de productos digitales",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
        {children}

        </Provider>
        </body>
    </html>
  );
}
