

export const generatePagination = (currenPage: number, totalPages: number) => {
    //Si el numero total de paginas es 7 o menos
    //vamos a mostrar todas las paginas sin puntos suspensivos
    if (totalPages <= 7){
        return Array.from({length: totalPages}, (_, i) =>  i + 1); //[1,2,3,4,5,6,7];
    }

    //si la pagina actual esta entre las primeras 3 paginas
    //mostrar las primeras 3, puntos suspensivos, y las ultimas 2
    if (currenPage <= 3 ){
        return [1,2,3,'...', totalPages -1, totalPages]; //[1,2,3,'...',49,50];
    }
    //Si la pagina actual esta entre las 3 ultimas paginas
    //mostrar las primeras 2, puntos suspensivos, las ultimas 3 paginas
    if (currenPage >= totalPages -2) {
        return [1,2,'...', totalPages -2, totalPages -1, totalPages];
    }

    //si la pagina acutal esta en otro lugar medio
    //mostrar la primera pagina, puntos suspensivos, la pagina actual y vecinos
    return[
        1,
        '...',
        currenPage -1,
        currenPage,
        currenPage +1,
        '...',
        totalPages
    ];
}