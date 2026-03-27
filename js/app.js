const API = "https://script.google.com/macros/s/AKfycbzfCXuObPNkFwoj3g3AYPj8rmpkxPJQ2bWS3Mkm1-uBqQNaSJncCxxYOUd1Go1HoZozOQ/exec";

// OBTENER DATA

function cargarCategorias() {
  fetch(API + "?action=getCategorias")
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById("categoria");

      select.innerHTML = "<option value=''>Seleccionar</option>";

      data.forEach(c => {
        const option = document.createElement("option");
        option.value = c.nombre;
        option.textContent = c.nombre;
        select.appendChild(option);
      });
    });
}

let competidoresGlobal = [];

function cargarCompetidores() {
  fetch(API + "?action=getCompetidores")
    .then(res => res.json())
    .then(data => {
      competidoresGlobal = data;
    });
}

document.getElementById("categoria").addEventListener("change", function () {
  const categoria = this.value;
  const select = document.getElementById("competidor");

  select.innerHTML = "<option value=''>Seleccionar</option>";

  const filtrados = competidoresGlobal.filter(c => c.categoria === categoria);

  filtrados.forEach(c => {
    const option = document.createElement("option");
    option.value = c.codigo;
    option.textContent = c.nombre;
    select.appendChild(option);
  });
});

window.onload = () => {
  cargarCategorias();
  cargarCompetidores();
};
// ---------------- JUDGE ----------------

function sendScore(score) {
  const judge = document.getElementById("judge").value;

  fetch(API, {
    method: "POST",
    body: JSON.stringify({
      action: "score",
      judge,
      score
    })
  });
}

// ---------------- DISPLAY ----------------

function loadDisplay() {
  fetch(API + "?action=get")
    .then(res => res.json())
    .then(data => {
      document.getElementById("competitor").innerText = data.competitor;
      document.getElementById("category").innerText = data.category;
      document.getElementById("timer").innerText = data.timer;

      const scoresDiv = document.getElementById("scores");
      scoresDiv.innerHTML = "";

      data.scores.forEach(s => {
        const p = document.createElement("p");
        p.innerText = `${s.judge}: ${s.score}`;
        scoresDiv.appendChild(p);
      });
    });
}

function obtenerData() {
    fetch(API + "?action=getScores&tatami=1")
    .then(res => res.json())
    .then(data => console.log(data));
}