import { cargarCategoria, seleccionarCategoria, obtenerFavoritos } from "../funciones.js";
import { categorias, resultadoFavoritos } from "../selectores.js";


export default class App{

    constructor(){
        this.initApp();
    }

    initApp(){

        document.addEventListener('DOMContentLoaded', () => {
            
            if(categorias){
                categorias.addEventListener('change', seleccionarCategoria);
                cargarCategoria();
            }

            if(resultadoFavoritos){
                obtenerFavoritos();
            }

        })

    }

}