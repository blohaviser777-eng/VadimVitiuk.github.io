/* =========================
   MindFocus / MindSpace JS
   - Coffee Dark theme (medium)
   - LocalStorage for theme
   - Simple focus timer demo
   - Progress demo (0/7)
   ========================= */

(function () {
  const THEME_KEY = "mindfocus_theme";
  const body = document.documentElement;

  // ---------- Theme ----------
  function setTheme(theme) {
    body.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);

    const btn = document.getElementById("themeToggle");
    if (btn) {
      btn.innerHTML = theme === "dark"
        ? "🌙 Темна / Світла"
        : "☀️ Темна / Світла";
    }
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    // ✅ За замовчуванням: dark coffee
    setTheme(saved || "dark");
  }

  // ---------- Progress (demo) ----------
  function initProgress() {
    const bar = document.querySelector(".progressbar > span");
    const value = document.querySelector(".progress-value");
    if (!bar || !value) return;

    // demo: зберігаємо прогрес локально
    const key = "mindfocus_progress";
    const max = 7;

    let current = Number(localStorage.getItem(key) || "0");
    current = Math.max(0, Math.min(max, current));

    function render() {
      const percent = (current / max) * 100;
      bar.style.width = percent + "%";
      value.textContent = `${current}/${max}`;
    }

    render();

    // якщо є кнопка "день виконано" (опційно)
    const btnDone = document.getElementById("dayDone");
    const btnReset = document.getElementById("progressReset");

    if (btnDone) {
      btnDone.addEventListener("click", () => {
        current = Math.min(max, current + 1);
        localStorage.setItem(key, String(current));
        render();
      });
    }

    if (btnReset) {
      btnReset.addEventListener("click", () => {
        current = 0;
        localStorage.setItem(key, "0");
        render();
      });
    }
  }

  // ---------- Focus timer (demo) ----------
  function initTimer() {
    const timeEl = document.getElementById("focusTime");
    const startBtn = document.getElementById("focusStart");
    const resetBtn = document.getElementById("focusReset");
    if (!timeEl || !startBtn || !resetBtn) return;

    // 10 хв демо
    const TOTAL = 10 * 60;
    let left = TOTAL;
    let t = null;

    function format(sec) {
      const m = Math.floor(sec / 60);
      const s = sec % 60;
      return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    }

    function render() {
      timeEl.textContent = format(left);
    }

    function stop() {
      if (t) clearInterval(t);
      t = null;
      startBtn.textContent = "▶ Старт";
    }

    function tick() {
      left -= 1;
      if (left <= 0) {
        left = 0;
        render();
        stop();
        alert("Фокус-сесія завершена ✅");
        return;
      }
      render();
    }

    startBtn.addEventListener("click", () => {
      if (t) {
        stop();
        return;
      }
      startBtn.textContent = "⏸ Пауза";
      t = setInterval(tick, 1000);
    });

    resetBtn.addEventListener("click", () => {
      stop();
      left = TOTAL;
      render();
    });

    render();
  }

  // ---------- Mini map decor ----------
  function initMiniMap() {
    // Декор: якщо на сторінці є .mini-map, додамо ще "точки"
    const mini = document.querySelector(".mini-map");
    if (!mini) return;

    // вже є один .pin у HTML? якщо ні — створимо
    if (!mini.querySelector(".pin")) {
      const pin = document.createElement("div");
      pin.className = "pin";
      mini.appendChild(pin);
    }

    // додаткові міні-крапки (декор)
    for (let i = 0; i < 6; i++) {
      const dot = document.createElement("span");
      dot.style.position = "absolute";
      dot.style.width = "6px";
      dot.style.height = "6px";
      dot.style.borderRadius = "50%";
      dot.style.left = (10 + Math.random() * 80) + "%";
      dot.style.top = (10 + Math.random() * 75) + "%";
      dot.style.background = "rgba(208,163,107,.45)";
      dot.style.boxShadow = "0 6px 14px rgba(0,0,0,.20)";
      mini.appendChild(dot);
    }
  }

  // ---------- Wire up ----------
  document.addEventListener("DOMContentLoaded", () => {
    initTheme();

    const toggle = document.getElementById("themeToggle");
    if (toggle) {
      toggle.addEventListener("click", () => {
        const current = body.getAttribute("data-theme") || "dark";
        setTheme(current === "dark" ? "light" : "dark");
      });
    }

    initProgress();
    initTimer();
    initMiniMap();
  });
})();
