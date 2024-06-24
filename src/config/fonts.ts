import { Inter, Montserrat_Alternates } from "next/font/google";


export const inter = Inter({ subsets: ["latin" ] });

//de esta manera si despues queremos cambiar la fuente
//lo podemos hacer desde aqui y no afectar otras cosas
export const titleFont = Montserrat_Alternates({
    subsets: ['latin'],
    weight: ['500', '700']
})