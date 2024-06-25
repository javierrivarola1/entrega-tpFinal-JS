"use strict";

let botonHamburguesa = document.getElementById("btn-hamburguesa");
botonHamburguesa.addEventListener("click", cambiarMenu);

const fondoMenu = document.getElementById("fondo-menu");
const cierreFondoMenu = document.getElementById("cierre-fondo-menu");

function cambiarMenu() {
  fondoMenu.classList.toggle("ocultar");
}

function cerrarNav() {
  fondoMenu.classList.add("cerrar");
  setTimeout(() => {
    fondoMenu.classList.remove("cerrar");
    fondoMenu.classList.toggle("ocultar");
  }, 600);
}

const ubicacion = window.location.href

const inputCapchat = document.getElementById("texto-escrito");

const pCaptcha = document.getElementById("captcha");
const lengthCaptcha = 5;

cierreFondoMenu.addEventListener("click", cerrarNav);

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

function generarCadenaAleatoria() {
  let cadenaRetornada = [];
  for (let i = 0; i < lengthCaptcha; i++) {
    let numRandom = generarNumeroAleatorio(0, charactersCaptcha.length);
    cadenaRetornada.push(charactersCaptcha[numRandom]);
  }
  return cadenaRetornada;
}

function generarNumeroAleatorio(limitInf, limitSup) {
  return Math.floor(Math.random() * (limitSup - limitInf)) + limitInf;
}

function asignacionLetraIndex(cadena) {
  for (let i = 0; i < lengthCaptcha; i++) {
    let caracter = cadena[i];
    const nodoHijo = pCaptcha.children[i];
    nodoHijo.innerText = caracter;
    generarColores(nodoHijo);
    generarTamanios(nodoHijo);
  }
}

function generarColores(hijos) {
  const num = generarNumeroAleatorio(1, 5);
  hijos.className = ""; // Limpiar clases anteriores
  switch (num) {
    case 1:
      hijos.classList.add("rojo");
      break;
    case 2:
      hijos.classList.add("verde");
      break;
    case 3:
      hijos.classList.add("azul");
      break;
    case 4:
      hijos.classList.add("naranja");
      break;
    case 5:
      hijos.classList.add("marron");
      break;
    default:
      break;
  }
}

function generarTamanios(hijos) {
  const num = generarNumeroAleatorio(1, 3);
  switch (num) {
    case 1:
      hijos.classList.add("tamanio-chico");
      break;
    case 2:
      hijos.classList.add("tamanio-medio");
      break;
    case 3:
      hijos.classList.add("tamanio-grande");
      break;
    default:
      break;
  }
}

const mensajeCaptchat = document.getElementById("mensaje-captcha");
const botonConfirmar = document.getElementById("enviar-texto");

function limpiarCapchat() {
  inputCapchat.value = "";
  mensajeCaptchat.innerText = "";
}

function comparar(textoEscrito) {
  const captchaActual = Array.from(pCaptcha.children)
    .map((span) => span.innerText)
    .join("");
  if (textoEscrito === captchaActual) {
    mensajeCaptchat.innerText = "Correcto!";
    setTimeout(() => {
      modalCapchat();
      enviar();
      limpiarCapchat();
    }, 600);
  } else {
    mensajeCaptchat.innerText = "Incorrecto o vacío, inténtelo otra vez.";
    setTimeout(() => {
      generarCaptcha();
      limpiarCapchat();
    }, 600);
  }
}

const modal = document.getElementById("modal");
const cerrar = document.getElementById("cerrar");

function modalCapchat() {
  modal.classList.toggle("mostrar");
  if (modal.classList.contains("mostrar")) {
    generarCaptcha();
  }
}

function generarCaptcha() {
  const nuevaCadena = generarCadenaAleatoria();
  asignacionLetraIndex(nuevaCadena);
}

const url = "https://6668aa24f53957909ff8d160.mockapi.io/volcanes/montanias";

function enviar() {
  const titulo = document.querySelector("#titulo").value;
  const urlImagen = document.querySelector("#url-img").value;
  const contenido = document.querySelector("#contenido").value;

  const data = {
    titulo: titulo,
    img: urlImagen,
    contenido: contenido,
  };

  postData(url, data);
}

// Envia los datos a la base de datos

const postData = async (url, data) => {
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

//Obtiene los datos de la base de datos

const useFetch = async (url) => {
  const data = await fetch(url);
  const parsed = await data.json();
  return parsed;
};

const contenedor = document.querySelector("#contenedor");

// Carga y muestra los posteos en la pagina Comunidad

async function mostrarPosteos() {
  const datos = await useFetch(url);

  datos.forEach((e) => {
    const tarjeta = document.createElement("div");
    const titulo = document.createElement("h3");
    const contenido = document.createElement("p");
    const img = document.createElement("img");

    titulo.innerText = e.titulo;
    contenido.innerText = e.contenido;
    img.src = e.img;

    tarjeta.className = "tarjeta-comunidad";

    tarjeta.append(titulo);
    tarjeta.append(contenido);
    tarjeta.append(img);
    contenedor.append(tarjeta);
  });
};

const contenedorAdmin = document.querySelector("#admin-contenedor");
const tablaAdmin = document.querySelector("#tabla-contenido");

// Actualiza la tabla de los posteos del administrador

const mostrarTabla = async () => {
  const datos = await useFetch(url);

  tablaAdmin.innerHTML = "";

  datos.forEach((e) => {
    const tr = document.createElement("tr");

    for (let i = 1; i < Object.keys(e).length; i++) {
      const td = document.createElement("td");

      if (Object.keys(e)[i] === "img") {
        const img = document.createElement("img");
        img.src = Object.values(e)[i];
        td.appendChild(img);
      } else {
        td.textContent = Object.values(e)[i];
      }

      tr.appendChild(td);
    }

    const herramientas = adminConfig(e);
    const tdAcciones = document.createElement("td");
    tdAcciones.append(herramientas);
    tr.appendChild(tdAcciones);

    tablaAdmin.append(tr);
  });
};

// Herramientas para editar o borrar una publicacion

const adminConfig = (e) => {
  const papelera = document.createElement("img");
  const editar = document.createElement("img");
  const herramientas = document.createElement("div");
  papelera.src = "./img/iconos/icono_tacho.svg";
  editar.src = "./img/iconos/icono_lapiz.svg";
  herramientas.className = "herramientas";
  papelera.className = "papelera";
  editar.className = "editar";

  editar.addEventListener("click", () => {
    obtenerPorId(e.id);
  });
  papelera.addEventListener("click", () => {
    borrarPorId(e.id);
  });

  herramientas.append(editar);
  herramientas.append(papelera);

  return herramientas;
};

const mostrarModal = async (objeto) => {
  modal.classList.add("mostrar");

  const editar = document.createElement("div");
  const cancelar = document.createElement("button");
  const aplicar = document.createElement("button");
  editar.className = "modal-editar";
  cancelar.textContent = "Cancelar";
  aplicar.textContent = "Aplicar";
  modalVentana.className = "modal-ventana";

  cancelar.addEventListener("click", () => {
    modalVentana.innerHTML = "";
    modal.classList.remove("mostrar");
  });

  aplicar.addEventListener("click", async () => {
    const objetoNuevo = {
      titulo: modalVentana.childNodes[0].value,
      img: modalVentana.childNodes[1].value,
      contenido: modalVentana.childNodes[2].value,
    };
    await editarInfo(objeto.id, objetoNuevo);
    modal.classList.remove("mostrar");
    modalVentana.innerHTML = "";
    tablaAdmin.innerHTML = "";
    mostrarTabla();
  });

  for (let i = 1; i < Object.keys(objeto).length; i++) {
    let entrada;
    if (i === Object.keys(objeto).length - 1) {
      // Crear un <textarea> para el último campo
      entrada = document.createElement("textarea");
    } else {
      // Crear un <input> para los otros campos
      entrada = document.createElement("input");
    }

    entrada.value = Object.values(objeto)[i];
    modalVentana.append(entrada);
  }

  editar.append(cancelar);
  editar.append(aplicar);
  modalVentana.append(editar);
};

//Solicitudes a la base de datos

const obtenerPorId = async (id) => {
  const data = await fetch(
    `https://6668aa24f53957909ff8d160.mockapi.io/volcanes/montanias/${id}`
  );
  const parsed = await data.json();
  mostrarModal(parsed);
};

const borrarPorId = async (id) => {
  await fetch(
    `https://6668aa24f53957909ff8d160.mockapi.io/volcanes/montanias/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  tablaAdmin.innerHTML = "";
  mostrarTabla();
};
const editarInfo = async (id, data) => {
  await fetch(
    `https://6668aa24f53957909ff8d160.mockapi.io/volcanes/montanias/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
};

if (ubicacion.indexOf("comunidad") > -1) {
  mostrarPosteos();
} else if (ubicacion.indexOf("admin") > -1) {
  mostrarTabla();
}

if (ubicacion.indexOf("index") > -1 || window.location.pathname === '/') {
  generarCadenaAleatoria();

  const formulario = document.getElementById("formulario");

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    modalCapchat();
    const nuevaCadena = generarCadenaAleatoria();
    asignacionLetraIndex(nuevaCadena);
  });

  botonConfirmar.addEventListener("click", () => {
    let texto = inputCapchat.value;
    comparar(texto);
  });

  cerrar.addEventListener("click", modalCapchat);
}