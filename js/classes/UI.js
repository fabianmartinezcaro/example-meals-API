import { categorias, resultado, modal, toast, toastBody } from "../selectores.js";
import { seleccionarReceta, agregarFavorito, eliminarFavorito, recetaExiste } from "../funciones.js";

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


    mostrarInfoModal(receta){

        const {idMeal, strMealThumb, strInstructions, strMeal} = receta;
    
        const tituloModal = document.querySelector('.modal .modal-title');
        const bodyModal = document.querySelector('.modal .modal-body');
    
        tituloModal.textContent = strMeal;
        bodyModal.innerHTML = `
            <img class="img-fluid" src="${strMealThumb}" alt="Receta ${strMeal}"></img>
            <h3 class="my-2">Instructions</h3>
            <p class="text-secondary">${strInstructions}</p>
        `


        const tituloIngredientes = document.createElement('H3');
        tituloIngredientes.textContent = 'Ingredients';
        bodyModal.appendChild(tituloIngredientes);

        const listGroup = document.createElement('UL');
        listGroup.classList.add('list-group');
        bodyModal.appendChild(listGroup)

        // Mostrar cantidades e ingredientes
        for(let i = 1; i <= 20; i++){
            if(receta[`strIngredient${i}`]){
                const ingrediente = receta[`strIngredient${i}`];
                const cantidad = receta[`strMeasure${i}`];

                const ingredienteLI = document.createElement('LI');
                ingredienteLI.classList.add('list-group-item');
                ingredienteLI.innerHTML = `<p>${ingrediente} - <span class="text-secondary">${cantidad}</span></p>`;
            
                listGroup.appendChild(ingredienteLI);

            } 
        }

        // Generar botones cerrar y agregarFavoritos
        const modalFooter = document.querySelector('.modal-footer');
        this.limpiarHTML(modalFooter);

        const btnAgregarFavorito = document.createElement('BUTTON');
        btnAgregarFavorito.classList.add('btn', 'btn-danger');

        if(recetaExiste(idMeal)){
            btnAgregarFavorito.textContent = 'Eliminar Receta';
        }else{
            btnAgregarFavorito.textContent = 'Agregar a Favoritos';
        }

        const self = this;

        btnAgregarFavorito.onclick = function () {

            if(recetaExiste(idMeal)){
                eliminarFavorito(idMeal);
                btnAgregarFavorito.textContent = 'Agregar a Favoritos';
                self.mostrarToast('Receta Eliminada Correctamente!');
                return;
            }else{
                agregarFavorito({id: idMeal, receta: strMeal, imagen: strMealThumb});
                btnAgregarFavorito.textContent = 'Eliminar Receta';
                self.mostrarToast('Receta Agregada Correctamente!');
            }

        }

        const btnCerrarModal = document.createElement('BUTTON');
        btnCerrarModal.classList.add('btn', 'btn-secondary');
        btnCerrarModal.textContent = 'Cerrar';
        btnCerrarModal.onclick = function () {
            modal.hide();
        }

        modalFooter.appendChild(btnAgregarFavorito);
        modalFooter.appendChild(btnCerrarModal);
    
        modal.show();
    
    }

    
    mostrarToast(mensaje){
        toastBody.textContent = mensaje;
        toast.show();
    }


    mostrarError(mensaje, tipo){

    }


    limpiarHTML(contenedor){
        while(contenedor.firstChild){
            contenedor.removeChild(contenedor.firstChild);
        }
    }

}