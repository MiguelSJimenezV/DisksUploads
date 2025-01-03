'use strict';

/* 
Miguel Jimenez - DWN2AP - Programacion 1
*/

// Discos:
let discos = [];
// disco:
let disco = {};
// codigo unico
let codigos = [];


// Función Cargar: -----------------------------------------------

function Cargar(){
   let disco = {
       nombre: prompt("Defina el nombre del disco"),
       autor: prompt("defina el autor"),
       codigo: '',
       pistas: []
    }

    //validar disco
    vPrompts(disco)

    //validar codigo unico
    while (true) {
        codigoUnico(disco);
        
        if (codigos.includes(disco.codigo)) {
            alert("El código ya ha sido ingresado. Ingrese un código único.");
        } else {
            break;
        }
    }

    //validar Pistas
    vPistas(disco)

    //agregados
    discos.push(disco)
    codigos.push(disco.codigo)
    console.log(codigos)
}

//--------------------------------------------------------funcion Mostrar

const Mostrar = () => {
    
    let html = '';

    for (let disco of discos) {
        html += `<h2>Discos</h2>
        <br>
        
        <ul>
            <li>Disco: ${disco.nombre}</li>
            <li>Autor: ${disco.autor}</li>
            <li>Codigo: ${disco.codigo}</li>
            <li>Pistas:</li>
            <ul>`;

        // Resaltado de rojo

        for (let pista of disco.pistas) {

            const duracionClass = pista.duracion > 180 ? 'resaltado' : '';

            html += `<li class="${duracionClass}">Nombre: ${pista.nombre}, Duración: ${pista.duracion} segundos</li>`;
        }

        html += `</ul>
            </ul>
            <br>`;
    }

    //Mostrar Apartdados adicionales

    let duracionTotalMasAlta = 0;

    for (let disco of discos) {
        const duracionTotal = calcularDuracionTotal(disco);
        const promedioDuracion = duracionTotal / disco.pistas.length;
        const pistaMasLarga = encontrarPistaMasLarga(disco);

        if (duracionTotal > duracionTotalMasAlta) {
            duracionTotalMasAlta = duracionTotal;
        }

        html += `
            <div class="disco">
                <h2>${disco.nombre}</h2>
                <p>Autor: ${disco.autor}</p>
                <p>Cantidad de pistas: ${disco.pistas.length}</p>
                <p>Duracion total del disco: ${duracionTotal} segundos</p>
                <p>Promedio de duracion de las pistas: ${promedioDuracion} segundos</p>
                <p>Pista con mayor duracion: ${pistaMasLarga.nombre} (${pistaMasLarga.duracion} segundos)</p>
            </div>
        `;
    }

    //detacar la duracion mas alta

    const discosHTML = document.getElementById('info');
    discosHTML.innerHTML = html;
    const discosElementos = discosHTML.querySelectorAll('.disco');

    for (let elemento of discosElementos) {
        const duracionTotal = parseInt(elemento.querySelector('p:nth-child(4)').textContent.split(' ')[4]);
        if (duracionTotal === duracionTotalMasAlta) {
            elemento.style.backgroundColor = 'yellow';
        }
    }

    // Mostrar la información en el elemento HTML con el id 'info'
    document.getElementById('info').innerHTML = html;
};



//------------------------------------------------------------------------------------------------------------------------------

// Todas las funciones que necesites:




//Validar los Prompts ------------------------------------------------------

function vPrompts(disco){

    while(disco.nombre === '' || disco.autor === '' || disco.codigo === NaN){
        if(disco.nombre.trim() === ""){
            alert("El nombre del disco no ha sido definido");
            disco.nombre = prompt("Defina el nombre del disco nuevamente")
        }else if(disco.autor.trim() === ""){
            alert("El Autor/banda no ha sido definido");
            disco.autor = prompt("Defina el nombre del autor/banda nuevamente")
        }
    }
}  

// Validacion Codigo unico -------------------------------------------

function codigoUnico(disco) {
    let codigo;

    while (true) {
        codigo = parseInt(prompt("Por favor, ingrese su codigo unico"));

        if (isNaN(codigo) || codigo < 1 || codigo > 999 || codigo === '') {
            alert("El codigo no puede ser ni mayor a 999 ni menor que 1.");
        } else {
            break;
        }
    }

    disco.codigo = codigo;
}

//validar pistas ------------------------------------------------------------

function vPistas(disco) {

    while (true) {
        let nombre = prompt("Ingrese el nombre de la pista");

        if (nombre.trim() === "") {
            alert("El nombre de la pista no es valido. Por favor ingreselo.");
            continue;
        }

        let duracion = parseInt(prompt("Ingrese los segundos que dura la pista"));

        if (isNaN(duracion) || duracion < 1 || duracion > 7200) {
            alert("Numero invalido. Ingrese una cantidad entre 1 y 7200.");
            continue;
        }

        disco.pistas.push({ nombre: nombre, duracion: duracion });

        if (!confirm("¿Desea agregar otra pista?")) {
            break;
        }
    }
}

// Otra funciones ------------------------------------------------------------

// Buscar por codigo -----------------------------------------------------

function Buscar(){
    const codigoBuscado = parseInt(prompt("Ingrese el código del disco que desea buscar"));
    mostrarDiscoPorCodigo(codigoBuscado);
}


// mostrar disco por su codigo ------------------------------------------------------


function mostrarDiscoPorCodigo(codigo) {
    const discoEncontrado = discos.find((disco) => disco.codigo === codigo);

    if (discoEncontrado) {
        const html = `
            <div class="disco">
                <h2>${discoEncontrado.nombre}</h2>
                <p>Autor: ${discoEncontrado.autor}</p>
                <p>Cantidad de pistas: ${discoEncontrado.pistas.length}</p>
                <p>Duración total del disco: ${calcularDuracionTotal(discoEncontrado)} segundos</p>
                <p>Promedio de duración de las pistas: ${
                    calcularDuracionTotal(discoEncontrado) / discoEncontrado.pistas.length
                } segundos</p>
                <p>Pista con mayor duración: ${
                    encontrarPistaMasLarga(discoEncontrado).nombre
                } (${encontrarPistaMasLarga(discoEncontrado).duracion} segundos)</p>
            </div>
            <br>
        `;

        document.getElementById('info').innerHTML = html;
    } else {
        alert('No se encontró ningún disco con ese código.');
    }
}



// Función para calcular la duración total de un disco ----------------------------------


function calcularDuracionTotal(disco) {
    let duracionTotal = 0;

    for (let pista of disco.pistas) {
        duracionTotal += pista.duracion;
    }

    return duracionTotal;
}

//  encontrar la pista con mayor duración en un disco----------------------------


function encontrarPistaMasLarga(disco) {
    let pistaMasLarga = null;

    for (let pista of disco.pistas) {
        if (!pistaMasLarga || pista.duracion > pistaMasLarga.duracion) {
            pistaMasLarga = pista;
        }
    }

    return pistaMasLarga;
}


