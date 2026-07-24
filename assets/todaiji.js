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

  // 27 August itinerary authority: keep this page aligned with the shared Google Calendar.
  const statusHeading = document.querySelector("#visit-status .section-heading");
  if (statusHeading) {
    const title = statusHeading.querySelector("h2");
    const intro = statusHeading.querySelector("p");
    if (title) title.textContent = "8月27日：Plan A／Plan B與交通分開計";
    if (intro) intro.textContent = "兩條下午方案均參觀至16:30，再另計步行往近鐵奈良站。17:15共同回大阪，19:00到緑橋一帶晚餐。";
  }

  const conflict = document.querySelector("#visit-status .route-conflict");
  if (conflict) {
    conflict.innerHTML = `
      <div><span class="status-dot"></span><strong>Plan A｜東大寺 14:00–16:30</strong><p>ミュージアム、南大門、大佛殿、法華堂、二月堂；16:30–17:05由二月堂步行往近鐵奈良站。</p></div>
      <div><span class="status-dot amber"></span><strong>Plan B｜依水園 14:00–16:30</strong><p>依水園與寧樂美術館；16:30–16:50步行往近鐵奈良站。只在人流明顯擠迫時採用。</p></div>
      <div class="route-verdict"><span>共同回程</span><strong>17:15–18:15 近鐵奈良 → 緑橋／じょうじ方向；18:15後保留約45分鐘晚餐緩衝。</strong></div>`;
  }

  const routeHeading = document.querySelector("#routes .section-heading p");
  if (routeHeading) routeHeading.textContent = "Plan A現場時間為2小時30分；16:30後另預35分鐘步行回近鐵奈良站。3小時20分版留作日後專程完整考察。";

  const compactButton = document.querySelector('[data-route-select="compact"]');
  if (compactButton) compactButton.textContent = "Plan A · 14:00–16:30";

  const compactPanel = document.querySelector('[data-route-panel="compact"]');
  if (compactPanel) {
    compactPanel.innerHTML = `
      <div class="route-summary"><strong>適用前提</strong><span>14:00由東大寺ミュージアム開始，16:30由二月堂離開；16:30–17:05步行往近鐵奈良站。</span><span class="route-warning">法華堂16:00關門，15:55前必須離堂。排隊較長時先壓縮博物館至25分鐘，再縮短二月堂停留。</span></div>
      <ol class="field-route" id="field-route">
        <li><time>14:00–14:30</time><div><strong>東大寺ミュージアム</strong><span>集中看當期寺寶、盧舍那佛與重建材料；略過一般年表。</span></div></li>
        <li><time>14:30–14:42</time><div><strong>南大門</strong><span>先看門內通高與貫材，再由吽形側面看扭轉與木塊接合。</span></div></li>
        <li><time>14:42–14:50</time><div><strong>走向大佛殿</strong><span>保留中軸視線，不在鹿群停留。</span></div></li>
        <li><time>14:50–15:25</time><div><strong>大佛殿</strong><span>八角燈籠 → 中軸 → 側面 → 蓮座；先看尺度，再看跨年代修補。</span></div></li>
        <li><time>15:25–15:35</time><div><strong>上坡往法華堂</strong><span>補水；鐘樓只從路上看。</span></div></li>
        <li><time>15:35–15:55</time><div><strong>法華堂</strong><span>不空羂索觀音整體、寶冠反光、不同材料表面與群像站位。</span></div></li>
        <li><time>15:55–16:30</time><div><strong>二月堂</strong><span>舞台、樓梯與修二會空間；16:30準時開始下山。</span></div></li>
      </ol>
      <div class="notice sage"><strong>交通另計：</strong>16:30–17:05 二月堂 → 近鐵奈良站；17:15–18:15 近鐵奈良 → 緑橋／じょうじ方向。</div>`;
  }

  const checklist = document.querySelector("#field-checklist .field-checklist");
  if (checklist) {
    checklist.innerHTML = `
      <article data-field-stop="museum"><div><span>01</span><h3>ミュージアム</h3><em>30分鐘</em></div><label><input type="checkbox"> 當期寺寶與原位置</label><label><input type="checkbox"> 木、銅、漆與泥的差異</label><label><input type="checkbox"> 只讀必要重建背景</label><p>14:30離館往南大門</p></article>
      <article data-field-stop="nandaimon"><div><span>02</span><h3>南大門</h3><em>12分鐘</em></div><label><input type="checkbox"> 門內通高與貫材</label><label><input type="checkbox"> 吽形側面扭轉</label><label><input type="checkbox"> 木塊拼接與低光</label><p>下一站：大佛殿 · 約8分鐘</p></article>
      <article data-field-stop="daibutsuden"><div><span>03</span><h3>大佛殿</h3><em>35分鐘</em></div><label><input type="checkbox"> 八角燈籠音聲菩薩</label><label><input type="checkbox"> 三段距離看尺度</label><label><input type="checkbox"> 蓮座與修補接縫</label><p>15:25離開；可拍，禁三腳架</p></article>
      <article data-field-stop="hokkedo"><div><span>04</span><h3>法華堂</h3><em>20分鐘</em></div><label><input type="checkbox"> 天平正堂／鎌倉禮堂</label><label><input type="checkbox"> 八臂與寶冠碎亮</label><label><input type="checkbox"> 三種材料表面</label><p>15:55前離堂；堂內禁拍</p></article>
      <article data-field-stop="nigatsudo"><div><span>05</span><h3>二月堂</h3><em>35分鐘</em></div><label><input type="checkbox"> 舞台與樓梯</label><label><input type="checkbox"> 儀式人流方向</label><label><input type="checkbox"> 奈良盆地與寺院地理</label><p>16:30準時下山</p></article>
      <article data-field-stop="walk-station"><div><span>06</span><h3>步行回站</h3><em>35分鐘</em></div><label><input type="checkbox"> 二月堂16:30離開</label><label><input type="checkbox"> 沿途補水，不再加景點</label><label><input type="checkbox"> 17:05前到近鐵奈良站</label><p>17:15共同回大阪</p></article>`;
  }

  const updated = document.querySelector(".footer .updated");
  if (updated) updated.textContent = "行程同步：2026-07-24 · 交通已獨立計算";

  const checklistKey = "kansai-todaiji-field-checklist-v2";
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
