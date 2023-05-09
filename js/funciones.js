import { categorias, resultado } from "./selectores.js";
import UI from "./classes/UI.js";

const ui = new UI();
let arrRecetas = [];

export function cargarCategoria(){

    const URL = 'https://www.themealdb.com/api/json/v1/1/categories.php';

    fetch(URL)
        .then(respuesta => respuesta.json())
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
    const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idReceta}`

    fetch(URL)
        .then(respuesta => respuesta.json())
        .then(resultado => ui.mostrarInfoModal(resultado.meals[0]))
        .catch(error => error)
}

export function agregarFavorito(receta){
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];

    const recetaExistente = favoritos.find(favorito => favorito.id === receta.id);
    if(recetaExistente){
        return;
    }else{
        localStorage.setItem('favoritos', JSON.stringify([...favoritos, receta]));
    }
}


