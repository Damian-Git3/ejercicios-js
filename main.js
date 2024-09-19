let [first, second, third] = ["Maya", "Marisa", "Chi"];
console.log(first); // ?
console.log(second); // ?
console.log(third); // ?

let facts = { numPlanets: 8, yearNeptuneDiscovered: 1846 };
let { numPlanets, yearNeptuneDiscovered } = facts;
console.log(numPlanets); // ?
console.log(yearNeptuneDiscovered); // ?

let [raindrops, whiskers, ...aFewOfMyFavoriteThings] = [
  "Raindrops on roses",
  "whiskers on kittens",
  "Bright copper kettles",
  "warm woolen mittens",
  "Brown paper packages tied up with strings",
];
console.log(raindrops); // ?
console.log(whiskers); // ?
console.log(aFewOfMyFavoriteThings); // ?

document
  .getElementById("formularioJuego")
  .addEventListener("submit", function (evento) {
    evento.preventDefault();

    const eleccionUsuario = document.getElementById("eleccionUsuario").value;
    const eleccionComputadora = obtenerEleccionComputadora();
    const resultado = determinarGanador(eleccionUsuario, eleccionComputadora);

    document.getElementById(
      "resultado"
    ).textContent = `Tú elegiste: ${eleccionUsuario}. La computadora eligió: ${eleccionComputadora}. ${resultado}`;
  });

const obtenerEleccionComputadora = () => {
  const opciones = ["piedra", "papel", "tijera"];
  const indiceAleatorio = Math.floor(Math.random() * opciones.length);
  return opciones[indiceAleatorio];
};

const determinarGanador = (eleccionUsuario, eleccionComputadora) => {
  if (eleccionUsuario === eleccionComputadora) {
    return "¡Es un empate!";
  }

  if (
    (eleccionUsuario === "piedra" && eleccionComputadora === "tijera") ||
    (eleccionUsuario === "papel" && eleccionComputadora === "piedra") ||
    (eleccionUsuario === "tijera" && eleccionComputadora === "papel")
  ) {
    return "¡Ganaste!";
  } else {
    return "La computadora ganó.";
  }
};

document
  .getElementById("formularioEdad")
  .addEventListener("submit", function (evento) {
    evento.preventDefault();

    const fechaNacimiento = new Date(
      document.getElementById("fechaNacimiento").value
    );
    const hoy = new Date();

    const edad = calcularEdad(fechaNacimiento, hoy);

    document.getElementById(
      "resultado-2"
    ).textContent = `Han pasado ${edad.años} años, ${edad.meses} meses y ${edad.días} días desde que naciste.`;
  });

const calcularEdad = (fechaNacimiento, hoy) => {
  let años = hoy.getFullYear() - fechaNacimiento.getFullYear();
  let meses = hoy.getMonth() - fechaNacimiento.getMonth();
  let días = hoy.getDate() - fechaNacimiento.getDate();

  if (días < 0) {
    meses--;
    días += new Date(hoy.getFullYear(), hoy.getMonth(), 0).getDate();
  }

  if (meses < 0) {
    años--;
    meses += 12;
  }

  return { años, meses, días };
};

document.getElementById("botonGenerar").addEventListener("click", function () {
  const numeros = Array.from({ length: 20 }, () =>
    Math.floor(Math.random() * 101)
  );

  const numeroMaximo = Math.max(...numeros);
  const numeroMinimo = Math.min(...numeros);

  document.getElementById(
    "listaNumeros"
  ).textContent = `Números: ${numeros.join(", ")}`;
  document.getElementById(
    "numeroMaximo"
  ).textContent = `Número mayor: ${numeroMaximo}`;
  document.getElementById(
    "numeroMinimo"
  ).textContent = `Número menor: ${numeroMinimo}`;
});

document.getElementById("botonObtener").addEventListener("click", function () {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((respuesta) => respuesta.json())
    .then((usuarios) => {
      mostrarUsuarios(usuarios);
      window.usuarios = usuarios; // Guardar los usuarios en una variable global para la búsqueda
    });
});

document.getElementById("botonBuscar").addEventListener("click", function () {
  const nombreUsuario = document.getElementById("entradaBusqueda").value;
  const usuario = window.usuarios.find(
    (usuario) => usuario.username.toLowerCase() === nombreUsuario.toLowerCase()
  );
  if (usuario) {
    mostrarUsuarios([usuario]);
  } else {
    document.getElementById("listaUsuarios").innerHTML =
      '<li class="list-group-item">Usuario no encontrado</li>';
  }
});

function mostrarUsuarios(usuarios) {
  const listaUsuarios = document.getElementById("listaUsuarios");
  listaUsuarios.innerHTML = "";
  usuarios.forEach((usuario) => {
    const elementoLista = document.createElement("li");
    elementoLista.className = "list-group-item";
    elementoLista.innerHTML = `
            <strong>ID:</strong> ${usuario.id} <br>
            <strong>Nombre:</strong> ${usuario.name} <br>
            <strong>Username:</strong> ${usuario.username} <br>
            <strong>Email:</strong> ${usuario.email}
        `;
    listaUsuarios.appendChild(elementoLista);
  });
}
