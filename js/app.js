const API = "TU_GOOGLE_APPS_SCRIPT_URL";

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
