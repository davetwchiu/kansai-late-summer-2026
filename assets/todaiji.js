(() => {
  const body = document.body;
  if (!body.classList.contains("todaiji-page")) return;

  const enhancedStyle = document.createElement("link");
  enhancedStyle.rel = "stylesheet";
  enhancedStyle.href = "assets/todaiji-enhanced.css?v=20260724-2";
  document.head.appendChild(enhancedStyle);

  const PUBLIC_LOTUS_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/7/7a/%E5%B0%8F%E5%B7%9D%E6%99%B4%E6%9A%98%E6%92%AE%E5%BD%B1%E3%80%8A%E5%A4%A7%E4%BB%8F%E8%93%AE%E5%BC%81%E7%B7%9A%E5%88%BB%E5%9B%B3%E3%80%8B.jpg";
  const PUBLIC_FUKUKENSAKU_IMAGE = "https://commons.wikimedia.org/wiki/Special:Redirect/file/%E3%80%8EJapanese%20Temples%20and%20Their%20Treasures%E3%80%8F%E3%80%8A%E4%B8%8D%E7%A9%BA%E7%BE%82%E7%B4%A2%E8%A6%B3%E9%9F%B3%E7%AB%8B%E5%83%8F%E3%80%8B8%E4%B8%96%E7%B4%80%E4%B8%AD%E9%A0%83%E3%80%81%E5%A5%88%E8%89%AF%E6%99%82%E4%BB%A3%E3%80%81%E6%9D%B1%E5%A4%A7%E5%AF%BA%EF%BC%88%E6%B3%95%E8%8F%AF%E5%A0%82%E6%89%80%E5%9C%A8%EF%BC%89%E3%80%81%E5%A5%88%E8%89%AF.jpg?width=900";
  const PUBLIC_GAKKO_IMAGE = "https://commons.wikimedia.org/wiki/Special:Redirect/file/%E3%80%8EJapanese%20Temples%20and%20Their%20Treasures%E3%80%8F%E3%80%8A%E4%BC%9D%E6%9C%88%E5%85%89%E8%8F%A9%E8%96%A9%E5%83%8F%E3%80%8B8%E4%B8%96%E7%B4%80%E3%80%81%E5%A5%88%E8%89%AF%E6%99%82%E4%BB%A3%E3%80%81%E6%9D%B1%E5%A4%A7%E5%AF%BA%E3%80%81%E5%A5%88%E8%89%AF.jpg?width=800";
  const PUBLIC_BONTEN_IMAGE = "https://commons.wikimedia.org/wiki/Special:Redirect/file/Bonten%20Hokkedo%20Todaiji.jpg?width=800";

  document.querySelectorAll("[data-reading-mode-toggle], [data-mode-link]").forEach((element) => {
    const clone = element.cloneNode(true);
    element.replaceWith(clone);
  });
  const modeButtons = document.querySelectorAll("[data-reading-mode-toggle]");
  const modeLinks = document.querySelectorAll("[data-mode-link]");
  const setMode = (mode, updateUrl = false) => {
    const field = mode === "field";
    body.dataset.readingMode = field ? "field" : "study";
    modeButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(field));
      button.textContent = field ? "返回完整研讀" : "開啟現場速讀";
    });
    modeLinks.forEach((link) => {
      link.textContent = field ? "返回完整研讀" : "現場速讀";
      link.href = field ? "todaiji.html" : "todaiji.html?mode=field#field-checklist";
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
    const next = body.dataset.readingMode === "field" ? "study" : "field";
    setMode(next, true);
    document.querySelector(next === "field" ? "#field-checklist" : "#visit-status")?.scrollIntoView({ behavior: "smooth" });
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
    document.querySelectorAll("[data-object-material]").forEach((card) => {
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

  const lotus = document.querySelector(".lotus-cosmos");
  if (lotus) {
    lotus.removeAttribute("role");
    lotus.removeAttribute("aria-label");
    lotus.innerHTML = `
      <figure class="lotus-evidence">
        <img src="${PUBLIC_LOTUS_IMAGE}" alt="東大寺大佛蓮座蓮瓣線刻的歷史黑白照片，畫面可見密集排列的菩薩與圓形頭光" loading="lazy">
        <figcaption>大佛蓮瓣線刻圖。小川晴暘攝；作品與照片依Wikimedia Commons標示為公有領域。<a href="https://commons.wikimedia.org/wiki/File:%E5%B0%8F%E5%B7%9D%E6%99%B4%E6%9A%98%E6%92%AE%E5%BD%B1%E3%80%8A%E5%A4%A7%E4%BB%8F%E8%93%AE%E5%BC%81%E7%B7%9A%E5%88%BB%E5%9B%B3%E3%80%8B.jpg" target="_blank" rel="noopener">看原圖與權利說明 ↗</a></figcaption>
      </figure>
      <div class="lotus-reading">
        <h3>這幅圖要表達甚麼</h3>
        <ol>
          <li><strong>大佛並非孤立巨像。</strong><span>蓮瓣把佛、菩薩、眾生與無數世界刻在同一個基座上，說明盧舍那佛代表遍照一切的法界。</span></li>
          <li><strong>由巨大走到極細。</strong><span>先感受十五米大佛的壓倒尺度，再俯身看蓮瓣細線；同一套宗教構想同時用宏觀建築與微觀圖像呈現。</span></li>
          <li><strong>華嚴的關係觀。</strong><span>畫面不是一尊佛統治下方人物的單線階級圖。重複的光背、人物與世界層層相連，視覺上把「一中有多、多中有一」具體化。</span></li>
        </ol>
        <p class="museum-link-inline"><a href="https://archive.rekihaku.ac.jp/exhibitions/project/old/141015/guide/moji/Simple/14.html" target="_blank" rel="noopener">國立歷史民俗博物館：蓮華藏世界圖解 ↗</a></p>
      </div>`;
  }

  const hallCompare = document.querySelector(".hall-compare");
  if (hallCompare) {
    hallCompare.innerHTML = `
      <div class="hall-stage" data-hall-view="current" aria-live="polite">
        <div class="hall-outline hall-old"><span>創建／鎌倉大殿 · 約88m · 11間</span></div>
        <div class="hall-outline hall-current"><span>1709現殿 · 57.012m · 7間</span></div>
      </div>
      <div class="hall-toggle" role="group" aria-label="切換大佛殿古今寬度">
        <button class="active" type="button" data-hall-view-select="current" aria-pressed="true">1709現殿</button>
        <button type="button" data-hall-view-select="ancient" aria-pressed="false">創建／鎌倉大殿</button>
      </div>
      <p data-hall-explanation><strong>現殿：</strong>正面寬57.012米，約為古代與鎌倉大殿的65%。高度48.742米、南北50.480米仍大致延續前代規模，因此身處現場仍會感到極其巨大。</p>`;
    const stage = hallCompare.querySelector("[data-hall-view]");
    const explanation = hallCompare.querySelector("[data-hall-explanation]");
    hallCompare.querySelectorAll("[data-hall-view-select]").forEach((button) => button.addEventListener("click", () => {
      const view = button.dataset.hallViewSelect;
      stage.dataset.hallView = view;
      hallCompare.querySelectorAll("[data-hall-view-select]").forEach((item) => {
        const selected = item === button;
        item.classList.toggle("active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      explanation.innerHTML = view === "ancient"
        ? "<strong>創建／鎌倉大殿：</strong>正面約88米、十一間，橫向尺度比現殿多出約31米。切換回現殿時，可看到江戶再興因資金與木材條件收窄正面，仍保留接近原來的高度與深度。"
        : "<strong>現殿：</strong>正面寬57.012米，約為古代與鎌倉大殿的65%。高度48.742米、南北50.480米仍大致延續前代規模，因此身處現場仍會感到極其巨大。";
    }));
  }

  const statusHeading = document.querySelector("#visit-status .section-heading");
  if (statusHeading) {
    const title = statusHeading.querySelector("h2");
    const intro = statusHeading.querySelector("p");
    if (title) title.textContent = "8月27日：東大寺主線與回站時間";
    if (intro) intro.textContent = "14:00由東大寺ミュージアム開始，16:30由二月堂離開；步行回近鐵奈良站及返大阪交通分開計算。";
  }

  const conflict = document.querySelector("#visit-status .route-conflict");
  if (conflict) {
    conflict.innerHTML = `
      <div><span class="status-dot"></span><strong>參觀｜14:00–16:30</strong><p>東大寺ミュージアム、南大門、大佛殿、法華堂、二月堂，共2小時30分。</p></div>
      <div><span class="status-dot amber"></span><strong>步行回站｜16:30–17:05</strong><p>由二月堂下山往近鐵奈良站，預35分鐘；沿途不再加景點。</p></div>
      <div class="route-verdict"><span>返大阪</span><strong>17:15–18:15 近鐵奈良 → 緑橋／じょうじ方向；19:00晚餐前保留約45分鐘。</strong></div>`;
  }

  const routeHeading = document.querySelector("#routes .section-heading p");
  if (routeHeading) routeHeading.textContent = "27/8現場路線為2小時30分；16:30後另預35分鐘步行回近鐵奈良站。完整3小時20分版保留作日後專程重訪。";

  const compactButton = document.querySelector('[data-route-select="compact"]');
  if (compactButton) compactButton.textContent = "27/8 · 14:00–16:30";

  const compactPanel = document.querySelector('[data-route-panel="compact"]');
  if (compactPanel) {
    compactPanel.innerHTML = `
      <div class="route-summary"><strong>當日主線</strong><span>14:00由東大寺ミュージアム開始，16:30由二月堂離開；16:30–17:05步行往近鐵奈良站。</span><span class="route-warning">法華堂16:00關門，15:55前必須離堂。排隊較長時先壓縮博物館至25分鐘，再縮短二月堂停留。</span></div>
      <ol class="field-route" id="field-route">
        <li><time>14:00–14:30</time><div><strong>東大寺ミュージアム</strong><span>頁面先補齊背景；館內集中看原物表面、體量與展示距離。</span></div></li>
        <li><time>14:30–14:42</time><div><strong>南大門</strong><span>門內通高與貫材；由吽形側面看扭轉與木塊接合。</span></div></li>
        <li><time>14:42–14:50</time><div><strong>走向大佛殿</strong><span>保留中軸視線，不在鹿群停留。</span></div></li>
        <li><time>14:50–15:25</time><div><strong>大佛殿</strong><span>八角燈籠 → 中軸 → 側面 → 蓮座；先看尺度，再看跨年代修補。</span></div></li>
        <li><time>15:25–15:35</time><div><strong>上坡往法華堂</strong><span>補水；鐘樓只從路上看。</span></div></li>
        <li><time>15:35–15:55</time><div><strong>法華堂</strong><span>不空羂索觀音、寶冠碎亮、不同材料表面與群像站位。</span></div></li>
        <li><time>15:55–16:30</time><div><strong>二月堂</strong><span>舞台、樓梯與修二會空間；16:30準時下山。</span></div></li>
      </ol>
      <div class="notice sage"><strong>交通另計：</strong>16:30–17:05 二月堂 → 近鐵奈良站；17:15–18:15 近鐵奈良 → 緑橋／じょうじ方向。</div>
      <p class="route-media-link"><a href="https://www.todaiji.or.jp/en/news-20241123/" target="_blank" rel="noopener">東大寺推薦：NHK World《The Perfect 2 Hours Guide》入口 ↗</a></p>`;
  }

  const objectRoom = document.querySelector("#object-room");
  if (objectRoom) {
    const heading = objectRoom.querySelector(".section-heading");
    if (heading) {
      const title = heading.querySelector("h2");
      const intro = heading.querySelector("p");
      if (title) title.textContent = "東大寺ミュージアム：事前讀完背景，館內專心看原物";
      if (intro) intro.textContent = "這一節代替大部分館內歷史與名詞閱讀。到場後仍值得進館，原因是泥、漆、木、金銅的表面、體量與展示距離無法由網頁取代。";
    }

    const status = objectRoom.querySelector(".exhibition-status");
    if (status) status.innerHTML = "<strong>8月27日狀態</strong><span>8/24展示替休館</span><span>8/27按現公告開館</span><em>8/25–26需重查新展品目錄</em>";

    const existingGuide = objectRoom.querySelector(".museum-replacement-guide");
    if (existingGuide) existingGuide.remove();
    const guide = document.createElement("div");
    guide.className = "museum-replacement-guide";
    guide.innerHTML = `
      <article><span>館舍功能</span><h3>為甚麼寺寶要離開原殿堂</h3><p>東大寺在戰火、火災和地震中多次失去建築與造像。2011年開館的博物館有五個展示室，展示室與收蔵庫採用房間免震，特別保護容易受震碎裂的塑像。第二室模擬法華堂內陣，讓原屬同一群像的作品在較接近原來的氣氛中重新相遇。</p><a href="https://www.todaiji.or.jp/information/museum/" target="_blank" rel="noopener">官方館舍與五室說明 ↗</a></article>
      <article><span>30分鐘走法</span><h3>館內不用逐字讀完整年表</h3><p><strong>0–4分鐘：</strong>入口影像只抓「創建—兩次大火—鎌倉復興—江戶再興」。<strong>4–10分鐘：</strong>先看千手觀音，建立木造像尺度。<strong>10–22分鐘：</strong>把日光、月光與法華堂原群像關係看清。<strong>22–28分鐘：</strong>看誕生釋迦、灌佛盤及小型金銅佛。<strong>最後2分鐘：</strong>只看8月新輪換展品中最能補本頁空白的一件。</p></article>
      <article><span>網頁可代替</span><h3>歷史、名詞、原位置與工法</h3><p>本頁可以預先處理作品名稱、年代、宗教功能、原來所在、材料技法，以及學界仍有爭議的身分與群像重構。這些正是館內最耗時間的標籤閱讀。</p></article>
      <article><span>網頁代替不到</span><h3>表面、重量感、空間與近距離比較</h3><p>泥塑眼皮的柔軟過渡、乾漆身體的連續曲面、木造接合與殘彩、金銅佛的反光，以及兩尊成對造像之間細微的不對稱，只能在原物前判斷。館內時間應全部留給這些證據。</p></article>`;
    objectRoom.querySelector(".exhibition-status")?.insertAdjacentElement("afterend", guide);

    const objectGrid = objectRoom.querySelector(".object-grid");
    if (objectGrid) objectGrid.innerHTML = `
      <article class="object-card-feature" data-object-material="wood"><span>木造 · 平安前期 · 博物館本尊</span><h3>千手觀音菩薩立像</h3><p><strong>先理解：</strong>「千手」以多臂象徵無限救濟能力，實際造像通常用有限手臂作分層扇形展開。這尊像成為博物館本尊，亦把館舍定位成寺院信仰延伸，而非純粹收藏空間。</p><p><strong>現場看：</strong>由正面辨主臂與次臂的層次，再移到側面看手臂如何插接；留意木肌、殘彩、金層及後代修理造成的表面差異。</p><p class="object-source"><a href="https://www.todaiji.or.jp/information/museum/" target="_blank" rel="noopener">官方展覽頁及館藏圖入口 ↗</a></p></article>
      <article class="object-card-feature visual" data-object-material="clay"><figure><img src="${PUBLIC_GAKKO_IMAGE}" alt="傳月光菩薩立像的歷史圖像" loading="lazy"><figcaption>歷史出版圖像；權利狀態見Wikimedia Commons。</figcaption></figure><span>塑造 · 8世紀 · 國寶</span><h3>傳日光、傳月光菩薩立像</h3><p><strong>先理解：</strong>兩像原屬法華堂，2011年移入博物館。傳統稱日光、月光，近代研究亦提出梵天、帝釋天等身分可能；名稱與原始圖像系統尚有討論空間。</p><p><strong>現場看：</strong>兩像並非左右鏡像。比較臉形、眼瞼、肩腰張力、合掌高度、衣褶疏密與腳下重心。泥塑靠木骨、草繩和分層敷泥成形，最值得看的是刀雕難以做出的柔軟過渡。</p><p class="object-source"><a href="https://commons.wikimedia.org/wiki/Category:Statue_of_Gakk%C5%8D_Bosatsu_(T%C5%8Ddai-ji)" target="_blank" rel="noopener">公海圖像集 ↗</a> · <a href="https://www.nippon.com/hk/japan-topics/b10926/" target="_blank" rel="noopener">身分與移座研究導讀 ↗</a></p></article>
      <article data-object-material="bronze"><span>鍍金銅 · 8世紀 · 國寶</span><h3>誕生釋迦佛與灌佛盤</h3><p><strong>先理解：</strong>小像右手指天、左手指地，原為佛誕日灌佛會使用。香水由小像頭頂澆下，再落入大型盤中；像與盤的比例由儀式操作決定。</p><p><strong>現場看：</strong>小像的手勢、腰部轉折、金層磨損；盤上浮雕或線刻如何把龍、花與佛誕敘事繞成一圈。把它當作被反覆使用的法會器具，避免只視為精巧小雕像。</p><p class="object-source"><a data-object-link="birth-buddha" href="https://online.bunka.go.jp/db/heritages/detail/192443" target="_blank" rel="noopener">文化庁：誕生釋迦佛作品頁（圖像） ↗</a> · <a href="https://www.tnm.jp/modules/r_free_page/index.php?id=704&amp;lang=ja" target="_blank" rel="noopener">東京國立博物館：實物展覽圖像 ↗</a></p></article>
      <article data-object-material="bronze"><span>金銅佛 · 8世紀</span><h3>菩薩半跏像</h3><p><strong>先理解：</strong>半跏姿把一腿垂下、另一腿屈放，常用於沉思或即將起身救濟的菩薩形象。小型金銅佛便於供養、移動與近距離禮拜。</p><p><strong>現場看：</strong>寶冠、面相、指尖、膝部轉折與衣紋在極小尺度如何保持清楚；再看鑄造後修整、鍍金殘留與磨蝕。</p><p class="object-source"><a data-object-link="half-seated" href="https://online.bunka.go.jp/db/heritages/detail/152018" target="_blank" rel="noopener">文化庁：銅造如意輪觀音半跏像（圖像） ↗</a></p></article>
      <article data-object-material="bronze"><span>鍍金銅 · 8世紀</span><h3>釋迦／多寶如來坐像</h3><p><strong>先理解：</strong>兩佛並坐源自《法華經》見寶塔品：多寶如來證明釋迦說法真實，釋迦入塔並坐。成對配置本身就是經文敘事。</p><p><strong>現場看：</strong>兩像手印、身軀比例、衣紋與背光是否刻意相近；共享空間如何讓「兩尊」讀成「一個事件」。</p><p class="object-source"><a data-object-link="shaka-taho" href="https://online.bunka.go.jp/heritages/detail/266902/2" target="_blank" rel="noopener">文化庁：釋迦多寶如來坐像（三幅圖） ↗</a></p></article>
      <article data-object-material="clay"><span>塑造 · 8世紀</span><h3>辯才天、吉祥天</h3><p><strong>先理解：</strong>兩像原屬法華堂群像。辯才天與語言、音樂、智慧和水相關；吉祥天關聯福德與繁榮。女性神格在國家寺院中承擔護國、增益與法會功能。</p><p><strong>現場看：</strong>服飾層次、殘彩、髮式與身體重心。泥塑極怕震動，移入免震館舍本身就是保存史的一部分。</p><p class="object-source"><a data-object-link="benten-kichijoten" href="https://online.bunka.go.jp/db/heritages/detail/181542" target="_blank" rel="noopener">文化庁：塑造辯才天・吉祥天立像（圖像） ↗</a></p></article>
      <article class="object-card-feature visual" data-object-material="lacquer"><figure><img src="${PUBLIC_FUKUKENSAKU_IMAGE}" alt="法華堂不空羂索觀音立像的歷史圖像" loading="lazy"><figcaption>歷史出版圖像；公海狀態及來源見Wikimedia Commons。</figcaption></figure><span>脫活乾漆 · 8世紀 · 法華堂本尊</span><h3>不空羂索觀音：先在館內理解，下午看原尊</h3><p><strong>先理解：</strong>三眼八臂象徵超越普通視野和多重救濟能力；「羂索」是絕不落空、能繫引眾生的索。泥胎貼麻布髹漆，硬化後抽去泥心，再以木構補強，造價與工時都極高。</p><p><strong>下午看：</strong>館內先看乾漆技法與相關群像，法華堂再看362厘米本尊、銀製寶冠和暗光。寶冠逾萬顆珠玉造成的碎亮，是殿堂照明條件的一部分。</p><p class="object-source"><a href="https://commons.wikimedia.org/wiki/Category:Statue_of_Fuk%C5%ABkensaku_Kannon_of_Hokked%C5%8D%2C_T%C5%8Ddaiji" target="_blank" rel="noopener">公海圖像集 ↗</a> · <a href="https://online.bunka.go.jp/db/heritages/detail/125587" target="_blank" rel="noopener">文化遺產資料與官方圖像 ↗</a></p></article>
      <article class="object-card-feature visual" data-object-material="lacquer"><figure><img src="${PUBLIC_BONTEN_IMAGE}" alt="法華堂梵天立像的公有領域圖像" loading="lazy"><figcaption>梵天立像歷史圖像；Wikimedia Commons標示公有領域。</figcaption></figure><span>脫活乾漆 · 8世紀 · 法華堂群像</span><h3>梵天／帝釋天及守護群像</h3><p><strong>先理解：</strong>梵天、帝釋天、金剛力士與四天王把觀音本尊包圍成完整護法世界。它們的作用不是逐尊展示名作，而是用高度、方向、武器和目光建立壇場秩序。</p><p><strong>下午看：</strong>進法華堂後先退後讀整體站位，再選一尊比較乾漆曲面、甲冑細節與身體重心。避免在有限時間內逐尊看完。</p><p class="object-source"><a href="https://commons.wikimedia.org/wiki/Category:Statues_of_Bonten_and_Taishakuten_in_the_Hokke-d%C5%8D%2C_T%C5%8Ddai-ji" target="_blank" rel="noopener">公海圖像集 ↗</a> · <a href="https://online.bunka.go.jp/db/heritages/detail/125587" target="_blank" rel="noopener">文化遺產資料庫入口 ↗</a></p></article>`;

    const footerSources = objectRoom.querySelector(".source-links");
    if (footerSources) footerSources.innerHTML = '<a href="https://www.todaiji.or.jp/information/museum/" target="_blank" rel="noopener">東大寺ミュージアム官方頁 ↗</a> · <a href="https://www.todaiji.or.jp/en/news-20241123/" target="_blank" rel="noopener">NHK World兩小時導覽入口 ↗</a> · <a href="https://commons.wikimedia.org/wiki/Category:Statues_in_T%C5%8Ddai-ji" target="_blank" rel="noopener">Wikimedia公海圖像總覽 ↗</a>';
  }

  const fieldSection = document.querySelector("#field-checklist");
  if (fieldSection) {
    const heading = fieldSection.querySelector(".section-heading");
    if (heading) {
      heading.querySelector(".label").textContent = "On-site quick read";
      heading.querySelector("h2").textContent = "現場速讀：每次只處理一站";
      heading.querySelector("p").textContent = "按「下一站」會真正切換內容並更新進度。這個模式只保留時間、三個觀察點和離開條件，不再使用無作用的勾選框。";
    }
    const fieldGrid = fieldSection.querySelector(".field-checklist");
    const fieldActions = fieldSection.querySelector(".field-actions");
    const stops = [
      {time:"14:00–14:30", title:"東大寺ミュージアム", look:["看原物表面，不再讀完整年表","日光／月光先比較臉、手、肩腰與衣褶","最後只選一件輪換展品"], exit:"14:30離館往南大門"},
      {time:"14:30–14:42", title:"南大門", look:["站門內仰看通高空間與穿柱貫材","由吽形側面看胸腹扭轉","找木塊接合與低光陰影"], exit:"14:42沿中軸往大佛殿"},
      {time:"14:50–15:25", title:"大佛殿", look:["門外先看建築與大佛如何逐步佔滿視野","入殿由正面移到側面看厚度和修補","最後俯看蓮瓣線刻，不只拍佛面"], exit:"15:25上坡；鐘樓只沿途看"},
      {time:"15:35–15:55", title:"法華堂", look:["先退後讀本尊與護法群像整體站位","看寶冠碎亮、三眼八臂及羂索","比較乾漆、泥塑與木造表面"], exit:"15:55前離堂，避過16:00關門"},
      {time:"15:55–16:30", title:"二月堂", look:["舞台、樓梯、局與坡地如何服務修二會","把盆地視野放回寺院地理","想像聲明、奔走、火與水的動線"], exit:"16:30準時下山"},
      {time:"16:30–17:05", title:"步行回近鐵奈良站", look:["沿途補水，不再加景點","下坡及人流預留35分鐘","確認17:15共同回大阪"], exit:"17:05前到站"}
    ];
    if (fieldGrid) {
      fieldGrid.className = "field-stepper";
      fieldGrid.innerHTML = `<div class="field-progress"><span data-field-progress-label>1 / ${stops.length}</span><div><i data-field-progress-bar></i></div></div><article data-field-step aria-live="polite"></article><div class="field-step-actions"><button type="button" class="button secondary" data-field-prev disabled>上一站</button><button type="button" class="button" data-field-next>下一站</button></div>`;
      const card = fieldGrid.querySelector("[data-field-step]");
      const prev = fieldGrid.querySelector("[data-field-prev]");
      const next = fieldGrid.querySelector("[data-field-next]");
      const label = fieldGrid.querySelector("[data-field-progress-label]");
      const bar = fieldGrid.querySelector("[data-field-progress-bar]");
      let index = 0;
      const render = () => {
        const stop = stops[index];
        card.innerHTML = `<div class="field-step-head"><span>${String(index + 1).padStart(2,"0")}</span><div><time>${stop.time}</time><h3>${stop.title}</h3></div></div><ol>${stop.look.map(item => `<li>${item}</li>`).join("")}</ol><p><strong>離開條件：</strong>${stop.exit}</p>`;
        label.textContent = `${index + 1} / ${stops.length}`;
        bar.style.width = `${((index + 1) / stops.length) * 100}%`;
        prev.disabled = index === 0;
        next.textContent = index === stops.length - 1 ? "回到第一站" : "下一站";
      };
      prev.addEventListener("click", () => { if (index > 0) index -= 1; render(); card.scrollIntoView({behavior:"smooth", block:"center"}); });
      next.addEventListener("click", () => { index = index === stops.length - 1 ? 0 : index + 1; render(); card.scrollIntoView({behavior:"smooth", block:"center"}); });
      render();
    }
    if (fieldActions) fieldActions.remove();
  }

  const originalImageSources = new Map([
    ["assets/images/todaiji/daibutsuden.webp", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Todaiji_daibutsuden_20070923.jpg"],
    ["assets/images/todaiji/nandaimon-structure.webp", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Todaiji06s3200.jpg"],
    ["assets/images/todaiji/nio-ungyo.webp", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Nio_Ungyo_at_Todaiji_Nandaimon.jpg"],
    ["assets/images/todaiji/daibutsu.webp", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Daibutsu_of_Todaiji_2.jpg"],
    ["assets/images/todaiji/octagonal-lantern.webp", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Octagonal_Lantern_in_front_of_Daibutsuden_of_Todaiji_Temple.jpg"],
    ["assets/images/todaiji/hokkedo.webp", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Todaiji_hokkedo.jpg"],
    ["assets/images/todaiji/nigatsudo.webp", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Nigatsu-dou_Todaiji_JPN1.jpg"],
    ["assets/images/todaiji/shunie.webp", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Todaiji_Syunie_Nara_JPN_001.JPG"]
  ]);

  const linkImageToOriginal = (image) => {
    if (!(image instanceof HTMLImageElement) || image.closest("a")) return;
    const declaredSource = image.getAttribute("src") || "";
    const source = originalImageSources.get(declaredSource.replace(/^\.\//, "")) || image.currentSrc || image.src;
    if (!source) return;
    const link = document.createElement("a");
    link.className = "image-original-link";
    link.href = source;
    link.target = "_blank";
    link.rel = "noopener";
    link.setAttribute("aria-label", `查看完整圖片：${image.alt || "東大寺圖片"}`);
    link.title = "查看完整圖片";
    image.parentNode.insertBefore(link, image);
    link.appendChild(image);
  };

  const makeContentImagesClickable = (root = document) => {
    if (root instanceof HTMLImageElement) linkImageToOriginal(root);
    root.querySelectorAll?.("main img").forEach(linkImageToOriginal);
  };
  makeContentImagesClickable();
  const imageObserver = new MutationObserver((records) => {
    records.forEach((record) => record.addedNodes.forEach((node) => {
      if (!(node instanceof Element)) return;
      makeContentImagesClickable(node);
    }));
  });
  imageObserver.observe(document.querySelector("main") || document.body, { childList: true, subtree: true });

  const sources = document.querySelector("#sources .section-heading");
  if (sources) {
    sources.querySelector("h2").textContent = "圖片直接標權利；受版權保護內容在相關段落旁即時連結";
    sources.querySelector("p").textContent = "公有領域及Creative Commons圖片可直接顯示並附作者、來源與授權；東大寺官網、博物館及其他受版權保護圖像不轉載，連結放在所述作品旁邊，方便立即對照。";
  }

  const updated = document.querySelector(".footer .updated");
  if (updated) updated.textContent = "內容與互動重整：2026-07-24";

  if ("serviceWorker" in navigator && window.location.protocol.startsWith("http")) {
    window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
  }
})();
