const expressionEl = document.getElementById("expression");
const resultEl = document.getElementById("result");
const historyList = document.getElementById("historyList");
const calcView = document.getElementById("calcView");
const historyView = document.getElementById("historyView");
const toggleViewBtn = document.getElementById("toggleView");
const backspaceBtn = document.getElementById("clearAll"); // ✕ button (top)

let input = "";
let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
let openParen = true;

/* INITIALIZE */
renderHistory();
adjustResultSize();

/* WINDOW RESIZE HANDLER */
window.addEventListener("resize", adjustResultSize);

/* BUTTON INPUT */
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", () => handleInput(btn.dataset.key));
});

/* OPERATOR BUTTONS IN HISTORY VIEW */
document.querySelectorAll(".operator-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    if (!historyView.classList.contains("hidden")) {
      showInvalidFormatMessage(e.target);
    } else {
      handleInput(btn.dataset.key);
    }
  });
});

/* KEYBOARD SUPPORT */
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (key >= "0" && key <= "9") handleInput(key);
  else if ("+-*/%".includes(key)) handleInput(key);
  else if (key === ".") handleInput(".");
  else if (key === "Enter" || key === "=") handleInput("=");
  else if (key === "Backspace") deleteOne(); // ✅ FIX
});

/* DELETE ONE BY ONE (✕ BUTTON) */
backspaceBtn.onclick = deleteOne;

function deleteOne() {
  input = input.slice(0, -1);
  updateDisplay();
}

/* VIEW TOGGLE */
toggleViewBtn.onclick = () => {
  const keypad = document.querySelector(".keypad");

  if (historyView.classList.contains("hidden")) {
    historyView.classList.remove("hidden");
    keypad.classList.add("hidden");
    toggleViewBtn.textContent = "🧮";
  } else {
    historyView.classList.add("hidden");
    keypad.classList.remove("hidden");
    toggleViewBtn.textContent = "🕘";
  }

  toggleViewBtn.classList.toggle("active");
};

/* CLEAR HISTORY */
document.getElementById("clearHistory").onclick = () => {
  history = [];
  localStorage.setItem("calcHistory", JSON.stringify(history));
  renderHistory();
};

/* SHOW INVALID FORMAT MESSAGE */
function showInvalidFormatMessage(element) {
  document.querySelector(".popup-message")?.remove();

  const popup = document.createElement("div");
  popup.className = "popup-message";
  popup.textContent = "Invalid format used.";

  element.appendChild(popup);

  setTimeout(() => popup.classList.add("show"), 10);
  setTimeout(() => {
    popup.classList.remove("show");
    setTimeout(() => popup.remove(), 300);
  }, 2000);
}

/* INPUT HANDLING */
function handleInput(key) {
  resultEl.classList.remove("final");

  // ✅ FIX: C = CLEAR ALL
  if (key === "C") {
    input = "";
    expressionEl.textContent = "";
    resultEl.textContent = "0";
    adjustResultSize();
    return;
  }

  if (key === "=") {
    calculate();
    return;
  }

  if (key === "±") {
    toggleSign();
    return;
  }

  if (key === "%") {
    input = `(${input})/100`;
    updateDisplay();
    return;
  }

  if (key === "()") {
    input += openParen ? "(" : ")";
    openParen = !openParen;
    updateDisplay();
    return;
  }

  input += key;
  updateDisplay();
}

/* SIGN TOGGLE */
function toggleSign() {
  const match = input.match(/(-?\d+\.?\d*)$/);
  if (!match) return;

  const value = match[0];
  const toggled = value.startsWith("-") ? value.slice(1) : "-" + value;
  input = input.slice(0, -value.length) + toggled;
  updateDisplay();
}

/* CALCULATE */
function calculate() {
  if (!input) return;

  try {
    const safe = input.replace(/×/g, "*").replace(/÷/g, "/");
    const result = Function(`"use strict";return (${safe})`)();

    expressionEl.textContent = input;
    resultEl.textContent = result;
    resultEl.classList.add("final");

    history.unshift({ exp: input, res: result });
    localStorage.setItem("calcHistory", JSON.stringify(history));
    renderHistory();

    input = result.toString();
    adjustResultSize();
  } catch {
    resultEl.textContent = "Error";
  }
}

/* DISPLAY */
function updateDisplay() {
  expressionEl.textContent = input;
  resultEl.textContent = input || "0";
  adjustResultSize();
}

/* DYNAMIC RESULT SCALING */
function adjustResultSize() {
  const maxWidth = resultEl.parentElement.clientWidth;
  let fontSize = 52;

  resultEl.style.fontSize = fontSize + "px";
  while (resultEl.scrollWidth > maxWidth && fontSize > 16) {
    fontSize--;
    resultEl.style.fontSize = fontSize + "px";
  }

  resultEl.scrollLeft = resultEl.scrollWidth;
}

/* HISTORY RENDER */
function renderHistory() {
  historyList.innerHTML = "";

  if (!history.length) {
    historyList.innerHTML =
      `<div style="text-align:center;color:#8a8a8a;padding:20px;font-size:14px;">
        No calculation history
      </div>`;
    return;
  }

  history.forEach(item => {
    const div = document.createElement("div");
    div.className = "history-item";
    div.innerHTML = `
      <div class="history-exp">${item.exp}</div>
      <div class="history-res">= ${item.res}</div>
    `;
    div.onclick = () => {
      input = item.res.toString();
      updateDisplay();
      historyView.classList.add("hidden");
      document.querySelector(".keypad").classList.remove("hidden");
      toggleViewBtn.textContent = "🕘";
    };
    historyList.appendChild(div);
  });
}
