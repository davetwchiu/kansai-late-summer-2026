(() => {
  const body = document.body;
  if (!body.classList.contains("todaiji-page")) return;

  const modeButtons = document.querySelectorAll("[data-reading-mode-toggle]");
  const modeLinks = document.querySelectorAll("[data-mode-link]");
  const setMode = (mode, updateUrl = false) => {
    const field = mode === "field";
    body.dataset.readingMode = field ? "field" : "study";
    modeButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(field));
      button.textContent = field ? "研讀模式" : "現場模式";
    });
    modeLinks.forEach((link) => {
      link.textContent = field ? "返回研讀模式" : "開啟現場模式";
      link.href = field ? "todaiji.html" : "todaiji.html?mode=field#field-route";
    });
    if (updateUrl) {
      const url = new URL(window.location.href);
      if (field) url.searchParams.set("mode", "field");
      else url.searchParams.delete("mode");
      history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
    }
  };

  const initialMode = new URLSearchParams(window.location.search).get("mode") === "field" ? "field" : "study";
  setMode(initialMode);
  modeButtons.forEach((button) => button.addEventListener("click", () => {
    setMode(body.dataset.readingMode === "field" ? "study" : "field", true);
    if (body.dataset.readingMode === "field") document.querySelector("#field-route")?.scrollIntoView({ behavior: "smooth" });
  }));

  const routeButtons = document.querySelectorAll("[data-route-select]");
  const routePanels = document.querySelectorAll("[data-route-panel]");
  routeButtons.forEach((button) => button.addEventListener("click", () => {
    const route = button.dataset.routeSelect;
    routeButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    routePanels.forEach((panel) => {
      const selected = panel.dataset.routePanel === route;
      panel.hidden = !selected;
      panel.classList.toggle("active", selected);
    });
  }));

  const materialButtons = document.querySelectorAll("[data-material-filter]");
  const techniqueCards = document.querySelectorAll("[data-material-card]");
  const objectCards = document.querySelectorAll("[data-object-material]");
  materialButtons.forEach((button) => button.addEventListener("click", () => {
    const filter = button.dataset.materialFilter;
    materialButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    techniqueCards.forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.materialCard !== filter;
    });
    objectCards.forEach((card) => {
      const visible = filter === "all" || card.dataset.objectMaterial === filter;
      card.hidden = !visible;
      card.classList.toggle("material-match", filter !== "all" && visible);
    });
  }));

  const reconstructionButtons = document.querySelectorAll("[data-reconstruction]");
  const reconstructionStage = document.querySelector("[data-reconstruction-stage]");
  const hypotheses = document.querySelectorAll("[data-hypothesis]");
  reconstructionButtons.forEach((button) => button.addEventListener("click", () => {
    const state = button.dataset.reconstruction;
    reconstructionButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    if (reconstructionStage) reconstructionStage.dataset.reconstructionStage = state;
    hypotheses.forEach((item) => { item.hidden = state !== "hypothesis"; });
  }));

  const hallRange = document.querySelector("#hall-scale");
  const hallCurrent = document.querySelector("[data-hall-current]");
  const hallOutput = document.querySelector("#hall-scale-output");
  const updateHall = () => {
    if (!hallRange || !hallCurrent || !hallOutput) return;
    hallCurrent.style.width = `${hallRange.value}%`;
    hallOutput.value = `${hallRange.value}%`;
    hallOutput.textContent = `${hallRange.value}%`;
  };
  hallRange?.addEventListener("input", updateHall);
  updateHall();

  const checklistKey = "kansai-todaiji-field-checklist-v1";
  const checkboxes = [...document.querySelectorAll("[data-field-stop] input[type='checkbox']")];
  try {
    const saved = JSON.parse(localStorage.getItem(checklistKey) || "[]");
    checkboxes.forEach((checkbox, index) => { checkbox.checked = Boolean(saved[index]); });
  } catch (_) {
    // Device-local checklist is optional.
  }
  const saveChecklist = () => {
    try {
      localStorage.setItem(checklistKey, JSON.stringify(checkboxes.map((checkbox) => checkbox.checked)));
    } catch (_) {
      // Keep the checklist usable even when storage is disabled.
    }
  };
  checkboxes.forEach((checkbox) => checkbox.addEventListener("change", saveChecklist));
  document.querySelector("[data-reset-checklist]")?.addEventListener("click", () => {
    checkboxes.forEach((checkbox) => { checkbox.checked = false; });
    saveChecklist();
  });

  if ("serviceWorker" in navigator && window.location.protocol.startsWith("http")) {
    window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
  }
})();
