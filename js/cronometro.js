// Duración inicial en segundos
let duracionInicial = 75;

// Tiempo restante
let tiempoRestante = duracionInicial;

// Referencia al intervalo
let intervalo = null;
let tatami = 1;

// Guarda tiempo de cronometro en localstorage
function guardarTiempo() {
  localStorage.setItem(`tatami_${tatami}_tiempo`, tiempoRestante);
}

// Actualiza el número en pantalla
function actualizarUI() {
  const cronometro = document.getElementById("cronometro");
  if (!cronometro) return;

  cronometro.innerText = tiempoRestante;
}

// Iniciar el cronometro
function iniciarCronometro() {
  // Evita múltiples intervalos
  if (intervalo !== null) return;

  intervalo = setInterval(() => {
    if (tiempoRestante > 0) {
      tiempoRestante--;
      actualizarUI();
      guardarTiempo();
    } else {
      detenerCronometro();
      console.log("Tiempo finalizado");
    }
  }, 1000);
}

// Pausar el cronometro
function pausarCronometro() {
  detenerCronometro();
}

// Reiniciar el cronometro
function reiniciarCronometro() {
  detenerCronometro();
  tiempoRestante = duracionInicial;
  actualizarUI();
  guardarTiempo();
}

// Función interna para limpiar intervalo
function detenerCronometro() {
  clearInterval(intervalo);
  intervalo = null;
}

// Inicializar UI al cargar
actualizarUI();