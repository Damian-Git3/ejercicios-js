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
  .getElementById("gameForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const userChoice = document.getElementById("userChoice").value;
    const computerChoice = getComputerChoice();
    const result = determineWinner(userChoice, computerChoice);

    document.getElementById(
      "result"
    ).textContent = `Tú elegiste: ${userChoice}. La computadora eligió: ${computerChoice}. ${result}`;
  });

const getComputerChoice = () => {
  const choices = ["piedra", "papel", "tijera"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
};

const determineWinner = (userChoice, computerChoice) => {
  if (userChoice === computerChoice) {
    return "Es un empate!";
  }

  if (
    (userChoice === "piedra" && computerChoice === "tijera") ||
    (userChoice === "papel" && computerChoice === "piedra") ||
    (userChoice === "tijera" && computerChoice === "papel")
  ) {
    return "¡Ganaste!";
  } else {
    return "La computadora ganó.";
  }
};

document.getElementById("ageForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const birthDate = new Date(document.getElementById("birthDate").value);
  const today = new Date();

  const age = calculateAge(birthDate, today);

  document.getElementById(
    "result-2"
  ).textContent = `Han pasado ${age.years} años, ${age.months} meses y ${age.days} días desde que naciste.`;
});

const calculateAge = (birthDate, today) => {
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
};

document
  .getElementById("generateButton")
  .addEventListener("click", function () {
    const numbers = Array.from({ length: 20 }, () =>
      Math.floor(Math.random() * 101)
    );

    const maxNumber = Math.max(...numbers);
    const minNumber = Math.min(...numbers);

    document.getElementById(
      "numbersList"
    ).textContent = `Números: ${numbers.join(", ")}`;
    document.getElementById(
      "maxNumber"
    ).textContent = `Número mayor: ${maxNumber}`;
    document.getElementById(
      "minNumber"
    ).textContent = `Número menor: ${minNumber}`;
  });

document.getElementById("fetchButton").addEventListener("click", function () {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => {
      displayUsers(users);
      window.users = users; // Guardar los usuarios en una variable global para la búsqueda
    });
});

document.getElementById("searchButton").addEventListener("click", function () {
  const username = document.getElementById("searchInput").value;
  const user = window.users.find(
    (user) => user.username.toLowerCase() === username.toLowerCase()
  );
  if (user) {
    displayUsers([user]);
  } else {
    document.getElementById("userList").innerHTML =
      '<li class="list-group-item">Usuario no encontrado</li>';
  }
});

function displayUsers(users) {
  const userList = document.getElementById("userList");
  userList.innerHTML = "";
  users.forEach((user) => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.innerHTML = `
            <strong>ID:</strong> ${user.id} <br>
            <strong>Nombre:</strong> ${user.name} <br>
            <strong>Username:</strong> ${user.username} <br>
            <strong>Email:</strong> ${user.email}
        `;
    userList.appendChild(listItem);
  });
}
