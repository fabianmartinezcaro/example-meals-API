import { categorias, resultado } from "../selectores.js";
import { seleccionarReceta } from "../funciones.js";

export default class UI{

    mostrarCategorias(listaCategorias = []){
        listaCategorias.forEach(categoria => {
            const option = document.createElement('OPTION');
            option.value = categoria.strCategory;
            option.text = categoria.strCategory;

            categorias.add(option)
        });
    }

    mostrarRecetas(recetas = []){

        this.limpiarHTML(resultado);

        const heading = document.createElement('H2');
        heading.classList.add('text-center', 'text-black', 'my-5');
        heading.textContent = recetas.length ? 'Resultados' : 'No hay resultados';
        resultado.appendChild(heading);

        recetas.forEach(receta => {

            const { idMeal, strMeal, strMealThumb} = receta;

            const recetaContenedor = document.createElement('DIV');
            recetaContenedor.classList.add('col-md-4');

            const recetaCard = document.createElement('DIV');
            recetaCard.classList.add('card', 'mb-4')

            const imagenReceta = document.createElement('IMG');
            imagenReceta.classList.add('card-img-top');
            imagenReceta.alt = `Nombre de la receta ${strMeal}`;
            imagenReceta.src = `${strMealThumb}`;

            const recetaCardBody = document.createElement('DIV');
            recetaCardBody.classList.add('card-body');

            const recetaHeading = document.createElement('H3');
            recetaHeading.classList.add('card-title', 'mb-3');
            recetaHeading.textContent = strMeal;

            const recetaButton = document.createElement('BUTTON');
            recetaButton.classList.add('btn', 'btn-danger', 'w-100');
            recetaButton.textContent = 'Ver Receta';
            // recetaButton.dataset.bsTarget = '#modal';
            // recetaButton.dataset.bsToggle = 'modal';
            recetaButton.onclick = function () {
                seleccionarReceta(idMeal);
            }


            recetaCardBody.appendChild(recetaHeading);
            recetaCardBody.appendChild(recetaButton);


            recetaCard.appendChild(imagenReceta);
            recetaCard.appendChild(recetaCardBody);

            recetaContenedor.appendChild(recetaCard);

            resultado.appendChild(recetaContenedor);
        })
    }

    mostrarInfoModal(receta = []){
        console.log(receta.meals);
    }

    limpiarHTML(contenedor){
        while(contenedor.firstChild){
            contenedor.removeChild(contenedor.firstChild);
        }
    }

}