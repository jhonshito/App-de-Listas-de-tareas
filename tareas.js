
// seleccionando los componentes necesarios
const formulario = document.querySelector('#formulario');
const mostrar = document.querySelector('#mostrar');
const template = document.querySelector('#template');
const fragment = document.createDocumentFragment();

// contenedor de la informacion
let todo = [];


formulario.addEventListener('submit', e => {

    e.preventDefault();

    const data = new FormData(formulario);
    const [datico] = [...data.values()];

    // funcion si el usuario envia espacios en blanco
    if(!datico.trim()){
        Swal.fire({
            position: 'top',
            title: 'Error!',
            text: 'No se permiten espacios vacios',
            icon: 'error',
            confirmButtonText: 'Intentar de nuevo',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
          });

          return
    };

    agregar(datico);
    pintar();

    formulario.reset();
});

// creando datos para poder manipular la informacion
const agregar = datico => {
    let objeto = {
        nombre: datico,
        id: `${Date.now()}`,
        dato: `${Date.now()}`
    };

    todo.push(objeto);
};


// funcion para pintando la informacion y enviandola al localStorage
const pintar = () => {

    localStorage.setItem('local', JSON.stringify(todo));

    mostrar.textContent = '';

    // recorriendo la informacion y mostrandola
    todo.forEach(item => {

        let clone = template.cloneNode(true).content;
        clone.querySelector('.lead').textContent = item.nombre;
        clone.querySelector('.btn-danger').dataset.a = item.id;
        clone.querySelector('.btn-success').dataset.b = item.dato;

        fragment.appendChild(clone);
    });

    mostrar.appendChild(fragment);
};

// eliminando la informacion
document.addEventListener('click', r => {

    
    if (r.target.matches('.btn-danger')){

        todo = todo.filter(item => item.id !== r.target.dataset.a);
        pintar();
    };

    if (r.target.matches('.btn-success')){
        
        todo.forEach(element => {
            if(element.id === r.target.dataset.b) {
                let articulo = r.target.parentElement;
                articulo.className = 'alert alert-success shadow w-100 rounded d-flex justify-content-between mt-3 align-self-center';
            }
        });
    };
});


// llamando la informacion del localStorage
document.addEventListener('DOMContentLoaded', a => {

    if (localStorage.getItem('local')){
        todo = JSON.parse(localStorage.getItem('local'));
        pintar();
    };

});

