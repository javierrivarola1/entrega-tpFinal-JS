"use strict";

let botonHamburguesa = document.getElementById("btn-hamburguesa");

botonHamburguesa.addEventListener("click", cambiarMenu);

function cambiarMenu() {
  if (fondoMenu.style.display === "flex") {
    fondoMenu.style.display = "none";
  } else {
    fondoMenu.style.display = "flex";
  }
}

const fondoMenu = document.getElementById("fondo-menu");

const cierreFondoMenu = document.getElementById("cierre-fondo-menu");

//Animacion para cerrar el nav version mobile

function cerrarNav() {
  fondoMenu.classList.add("cerrar");

  setTimeout(() => {
    fondoMenu.classList.remove("cerrar");
    fondoMenu.style.display = "none";
  }, 600);
}

cierreFondoMenu.addEventListener("click",cerrarNav);

// CatChap funciones

let charactersCaptcha = [
  "A", "B", "C", "D",
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

//Evita que se ejecute el el codigo si no existe pCaptcha para evitar un consol con un null en otras paginas donde no esten

if (pCaptcha) {
  let cadenaRetornada = [];
  const lengthCaptcha = 5;

  function generarCadenaAleatoria() {
    for (let i = 0; i < lengthCaptcha; i++) {
      let numRandom = generarNumeroAleatorio(0, charactersCaptcha.length);
      cadenaRetornada.push(charactersCaptcha[numRandom]);
      asignacionLetraIndex();
      concatenar();
    }
  }
  function generarNumeroAleatorio(limitInf, limitSup) {
    const result = Math.floor(Math.random() * (limitSup - limitInf)) + limitInf;
    return result;
  }

  // A cada span del index le asigna una letra de la cadenaRetornada

  function asignacionLetraIndex() {
    for (let i = 0; i < lengthCaptcha; i++) {
      let caracter = cadenaRetornada[i];
      const nodosHijos = pCaptcha.children[i];
      nodosHijos.innerText = `${caracter}`;
      generarColores(nodosHijos);
      generarTamanios(nodosHijos);
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

  const inputCapchat = document.getElementById("texto-escrito");
  const formulario = document.getElementById("formulario");

  formulario.addEventListener("submit", () => {
    event.preventDefault();
    modalCapchat();
    generarCadenaAleatoria();
  });

  function limpiarArray() {
    cadenaRetornada = [];
    generarCadenaAleatoria();
  }

  const mensajeCaptchat = document.getElementById("mensaje-captcha");
  const botonConfirmar = document.getElementById("enviar-texto");

  botonConfirmar.addEventListener("click", () => {
    let texto = inputCapchat.value;
    comparar(texto);
  });

  // Limpia el modal

  function limpiarCapchat() {
    inputCapchat.innerText = "";
    mensajeCaptchat.innerText = " ";
  }

  // Compara si coincide con lo ingresado por el usuario con el capchat

  function comparar(textoEscrito) {
    if (palabra === textoEscrito) {
      mensajeCaptchat.innerText = "Correcto!";
      setTimeout(() => {
        modalCapchat();
        limpiarCapchat();
      }, 600);
    } else {
      mensajeCaptchat.innerText = "Incorrecto o vacio intentelo otra vez.";
      setTimeout(() => {
        limpiarArray();
        limpiarCapchat();
      }, 600);
    }
  }

  //Genera un modal con el catchap
  const modal = document.getElementById("modal");
  const cerrar = document.getElementById("cerrar");

  function modalCapchat() {
    modal.classList.toggle("mostrar");
  }

  cerrar.addEventListener("click", modalCapchat);
}