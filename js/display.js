let tatami = 1;

setInterval(() => {
  const tiempo = localStorage.getItem(`tatami_${tatami}_tiempo`);

  if (tiempo !== null) {
    document.getElementById("tiempo").innerText = tiempo;
  }
}, 500);