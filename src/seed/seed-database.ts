import { initialData } from "./seed";

async function main() {


    console.log(initialData);

    console.log('Seed se ejecuto correctamente');
}



//creando funcion anonima autoinvocada
(()=> {
    main();
})();