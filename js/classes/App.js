import { cargarCategoria, seleccionarCategoria } from "../funciones.js";
import { categorias } from "../selectores.js";


export default class App{

    constructor(){
        this.initApp();
    }

    initApp(){

        document.addEventListener('DOMContentLoaded', () => {
            
            categorias.addEventListener('change', seleccionarCategoria);
            cargarCategoria();

        })

    }

}