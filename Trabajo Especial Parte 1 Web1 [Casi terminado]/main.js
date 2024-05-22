"use strict";

let botonHamburguesa = document.getElementById("btn-hamburguesa");

botonHamburguesa.addEventListener("click", toggleMenu);

function toggleMenu() {
  if (fondoMenu.style.display === "flex") {
    fondoMenu.style.display = "none";
  } else {
    fondoMenu.style.display = "flex";
  }
}

const fondoMenu = document.getElementById("fondo-menu");

let cierreFondoMenu = document.getElementById("cierre-fondo-menu");

//Animacion para cerrar el nav version mobile

function cerrarNav() {
  fondoMenu.classList.add("cerrar");

  setTimeout(() => {
    fondoMenu.classList.remove("cerrar");
    fondoMenu.style.display = "none";
  }, 600);
}

cierreFondoMenu.addEventListener(
  "click",

  cerrarNav
);



// CatChap funciones
   


let charactersCaptcha = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];

const pCaptcha = document.getElementById("captcha");

let cadenaRetornada = [];
const lengthCaptcha = 5;

function generarCadenaAleatoria() {
  for (let i = 0; i < lengthCaptcha; i++) {
    let numRandom = generarNumeroAleatorio(0, charactersCaptcha.length);
    cadenaRetornada.push(charactersCaptcha[numRandom]);
    catchapNode();
    concatenar();
  }
}
function generarNumeroAleatorio(limitInf, limitSup) {
  const result = Math.floor(Math.random() * (limitSup - limitInf)) + limitInf;
  return result;
}

function catchapNode() {
  for (let i = 0; i < lengthCaptcha; i++) {
    let caracter = cadenaRetornada[i];
    const hijos = pCaptcha.children[i];
    hijos.innerText = `${caracter}`;
    generarColores(hijos);
    generarTamanios(hijos);
  }

  //Genera Colores y Tamaños aleatorios para las letras

  function generarColores(hijos) {
    const num = generarNumeroAleatorio(1, 5);
    switch (num) {
      case 1:
        hijos.style.color = "red";
        break;
      case 2:
        hijos.style.color = "green";
        break;

      case 3:
        hijos.style.color = "blue";
        break;

      case 4:
        hijos.style.color = "orange";
        break;
      case 5:
        hijos.style.color = "brown";
        break;
    }
  }
}

function generarTamanios(hijos) {
  const num = generarNumeroAleatorio(1, 3);

  switch (num) {
    case 1:
      hijos.style.fontSize = "24px";
      break;
    case 2:
      hijos.style.fontSize = "50px";
      break;
    case 3:
      hijos.style.fontSize = "100px";
      break;
  }
}

// Concatena el array cadenaRetornada

let palabra = "";

function concatenar() {
  palabra = "";
  for (let i = 0; i < cadenaRetornada.length; i++) {
    palabra += cadenaRetornada[i];
  }
}

function cargarDatos() {
  let persona = document.getElementById("nombre").value;
  let correo = document.getElementById("correo").value;
  let contenido = document.getElementById("mensaje").value;

  const datos = {
    persona: persona,
    correo: correo,
    contenido: contenido,
  };

  return datos;
}

const inputCaptcha = document.getElementById("texto-escrito");
const botonConfirmar = document.getElementById("enviar-texto");


botonConfirmar.addEventListener("click", () => {
  let texto = document.getElementById("texto-escrito").value;
  let datos = cargarDatos();

  comparar(texto, datos);
});


function limpiarArray() {
  cadenaRetornada = [];
  generarCadenaAleatoria();
}

function comparar(textoEscrito, datos) {
  if (palabra === textoEscrito) {
    console.warn("Texto correcto!");
    console.log(datos);
  } else {
    limpiarArray();
    console.log("texto incorrecto intentelo otra vez");
  }
}

generarCadenaAleatoria();

//Genera un modal con el catchap

const botonFormularioModal = document.getElementById("boton-modal");
const modal = document.getElementById("modal");
const cerrar = document.getElementById("cerrar");

function modalCapchat() {
  modal.classList.toggle("mostrar");
}

botonFormularioModal.addEventListener("click", modalCapchat);
cerrar.addEventListener("click", modalCapchat);
