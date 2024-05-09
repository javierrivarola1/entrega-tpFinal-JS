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

cierreFondoMenu.addEventListener("click", toggleMenu);









let charactersCaptcha = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
];

let cadenaRetornada = [];
const lengthCaptcha = 5;

function generarCadenaAleatoria() {
    for (let i = 0; i < lengthCaptcha; i++) {
        let numRandom = generarNumeroAleatorio()
        console.log(numRandom);
       cadenaRetornada.push(charactersCaptcha[numRandom])
    }
}
function generarNumeroAleatorio() {
    let result= Math.floor(Math.random() * charactersCaptcha.length);
return result;
}

generarCadenaAleatoria();

console.log(cadenaRetornada);