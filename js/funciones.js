import { categorias, resultado, resultadoFavoritos } from "./selectores.js";
import UI from "./classes/UI.js";

const ui = new UI();

export function cargarCategoria(){

    const URL = 'https://www.themealdb.com/api/json/v1/1/categories.php';

    fetch(URL)
        .then(respuesta => {
            if(respuesta.status === 500){
                ui.mostrarError();
            }else if(respuesta.status === 200){
                return respuesta.json()
            }
        })
        .then(categorias => ui.mostrarCategorias(categorias.categories))
        .catch(error => error);

}  


export function seleccionarCategoria(evento){
    const categoria = evento.target.value;
    const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`;

    fetch(URL)
        .then(respuesta => respuesta.json())
        .then(resultado => ui.mostrarRecetas(resultado.meals))
        .catch(error => console.log(error))

}


export function seleccionarReceta(idReceta){
    const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idReceta}`;

    fetch(URL)
        .then(respuesta => respuesta.json())
        .then(resultado => ui.mostrarInfoModal(resultado.meals[0]))
        .catch(error => error)
}



// localStorage

export function obtenerFavoritos(){
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
    if(favoritos.length){
        ui.mostrarRecetas(favoritos);
        return;
    }

    const noFavoritos = document.createElement('P');
    noFavoritos.textContent = 'No hay favoritos, agrega algunas recetas!';
    noFavoritos.classList.add('fs-4', 'text-center', 'font-bold', 'text-secondary', 'mt-5')
    resultadoFavoritos.appendChild(noFavoritos);

}

export function agregarFavorito(receta){
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
    localStorage.setItem('favoritos', JSON.stringify([...favoritos, receta]));
}


export function recetaExiste(id){
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
    const recetaExistente = favoritos.some(favorito => favorito.id === id);
    return recetaExistente;
}


export function eliminarFavorito(id){
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
    const favoritosActualizado = favoritos.filter(favorito => favorito.id !== id);
    localStorage.setItem('favoritos', JSON.stringify(favoritosActualizado));
}

