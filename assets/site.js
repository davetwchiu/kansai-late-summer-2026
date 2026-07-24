(() => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  document.querySelectorAll('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      const text = button.getAttribute('data-copy');
      try {
        await navigator.clipboard.writeText(text);
        const original = button.textContent;
        button.textContent = '已複製';
        setTimeout(() => { button.textContent = original; }, 1200);
      } catch (_) {
        window.prompt('請複製以下地址：', text);
      }
    });
  });

  const naraDay = document.querySelector('#d0827');
  if (naraDay) {
    const summary = naraDay.querySelector('.summary');
    if (summary) summary.textContent = '佛畫之後，按人流選東大寺或庭園';

    const tbody = naraDay.querySelector('table.schedule tbody');
    if (tbody) {
      tbody.innerHTML = `
        <tr><td>08:00</td><td>由大阪出發</td></tr>
        <tr><td>09:30–12:10</td><td><a class="context-link museum-link" href="museums.html#nara-museum">奈良國立博物館：南都仏画、佛像館、青銅器館</a></td></tr>
        <tr><td>12:10–12:30</td><td><a class="context-link map-link" href="maps.html#d0827">步行前往うな菊</a></td></tr>
        <tr><td>12:30–13:40</td><td><a class="context-link food-link" href="food.html#unagiku">うな菊 奈良本店</a></td></tr>
        <tr><td>13:40–14:00</td><td><a class="context-link map-link" href="maps.html#d0827">步行前往東大寺／依水園決策點</a></td></tr>
        <tr><td>14:00</td><td><strong>現場分流：</strong>先看東大寺人流；可接受則走東大寺線，明顯擠迫則轉依水園線。</td></tr>
        <tr><td>A｜14:00–16:15</td><td><a class="context-link museum-link" href="todaiji.html#routes">東大寺ミュージアム → 南大門・大佛殿 → 法華堂 → 二月堂</a></td></tr>
        <tr><td>B｜14:10–15:20</td><td><a class="context-link museum-link" href="museums.html#isuien">依水園／寧樂美術館</a>；其後只看東大寺外圍或直接回站</td></tr>
        <tr><td>17:00</td><td>近鐵奈良出發</td></tr>
        <tr><td>19:00</td><td><a class="context-link food-link" href="food.html#joji">旨い料理・旨い酒 じょうじ</a></td></tr>
        <tr><td>餐後可選</td><td><a class="context-link drink-link" href="drinks.html#d0827-drinks">緑橋小店／熟悉 bar</a></td></tr>`;
    }

    const priorities = naraDay.querySelector('.day-aside ul');
    if (priorities) {
      priorities.innerHTML = `
        <li>核心：奈良國博、下午其中一條主線、19:00晚餐。</li>
        <li>14:00按東大寺人流決定；毋須硬塞兩條線。</li>
        <li>選東大寺後預留約2小時15至30分；17:00離開奈良。</li>`;
    }
  }

  const naraDeep = document.querySelector('#nara');
  if (naraDeep) {
    const coreParagraph = Array.from(naraDeep.querySelectorAll('p')).find((paragraph) => {
      const strong = paragraph.querySelector('strong');
      return strong && strong.textContent.includes('今日核心');
    });
    if (coreParagraph) {
      coreParagraph.innerHTML = '<strong>今日核心：</strong>奈良國立博物館先建立圖像與造像的觀看框架；午餐後約14:00按東大寺人流二選一。東大寺線把作品放回寺院、儀式與伽藍，依水園線則以庭園和收藏收束下午。19:00じょうじ是回大阪後的硬節點。';
    }

    const gardenParagraph = Array.from(naraDeep.querySelectorAll('p')).find((paragraph) => {
      const strong = paragraph.querySelector('strong');
      return strong && strong.textContent.includes('依水園');
    });
    if (gardenParagraph) {
      gardenParagraph.innerHTML = '<strong>14:00現場分流：</strong>午餐後先到東大寺周邊看人流。若人流可接受，保留東大寺ミュージアム、南大門、大佛殿、法華堂與二月堂；若團客明顯擠迫，立即轉往依水園／寧樂美術館。當日只選體驗較好的一條。';
    }

    const decisionGrid = naraDeep.querySelector('.decision-grid');
    if (decisionGrid) {
      decisionGrid.innerHTML = `
        <div><strong>必留</strong><span>奈良國博、下午其中一條主線、19:00晚餐</span></div>
        <div><strong>現場決策</strong><span>14:00看東大寺人流；擠迫即轉依水園</span></div>
        <div><strong>硬時間</strong><span>12:10離開國博；17:00離開奈良</span></div>`;
    }
  }

  const unagiku = document.querySelector('#unagiku');
  if (unagiku) {
    const timingParagraph = Array.from(unagiku.querySelectorAll('p')).find((paragraph) =>
      paragraph.textContent.includes('出餐需約20至30分鐘')
    );
    if (timingParagraph) {
      timingParagraph.textContent = '店方說明預約後仍會在到店才開始調理，出餐需約20至30分鐘，座位為90分鐘制。90分鐘是席位上限；行程按一般鰻重節奏預留70分鐘，目標13:40左右離席。若出餐較慢，下午直接按人流選東大寺或依水園，毋須為趕兩邊而倉促用餐。';
    }
  }

  const naraMap = document.querySelector('.map-card#d0827');
  if (naraMap) {
    const meta = naraMap.querySelector('.meta');
    if (meta) meta.textContent = '14:00按人流：東大寺／依水園二選一';

    const actions = naraMap.querySelector('.map-actions');
    if (actions) {
      const oldRoute = actions.querySelector('a[href*="google.com/maps/dir"]');
      if (oldRoute) oldRoute.remove();

      const eastRoute = document.createElement('a');
      eastRoute.className = 'button secondary';
      eastRoute.href = 'https://www.google.com/maps/dir/?api=1&origin=奈良国立博物館&destination=近鉄奈良駅&waypoints=うな菊+奈良本店|東大寺ミュージアム|東大寺&travelmode=walking';
      eastRoute.target = '_blank';
      eastRoute.rel = 'noopener';
      eastRoute.textContent = '東大寺線（備用）';

      const gardenRoute = document.createElement('a');
      gardenRoute.className = 'button secondary';
      gardenRoute.href = 'https://www.google.com/maps/dir/?api=1&origin=奈良国立博物館&destination=近鉄奈良駅&waypoints=うな菊+奈良本店|依水園&travelmode=walking';
      gardenRoute.target = '_blank';
      gardenRoute.rel = 'noopener';
      gardenRoute.textContent = '依水園線（備用）';

      actions.prepend(gardenRoute);
      actions.prepend(eastRoute);
    }
  }

  const naraVisit = document.querySelector('#nara-visit');
  if (naraVisit) {
    const heading = naraVisit.querySelector('.section-heading');
    if (heading) {
      const title = heading.querySelector('h2');
      const intro = heading.querySelector('p');
      if (title) title.textContent = '上午建立觀看框架；下午按人流二選一';
      if (intro) intro.textContent = '奈良國立博物館是固定核心。午餐後約14:00先看東大寺人流：可接受便走東大寺線；團客明顯擠迫便轉依水園／寧樂美術館。兩條線各自完整，當日不需要兩邊走完。';

      if (!heading.parentElement.querySelector('.nara-choice-note')) {
        const note = document.createElement('div');
        note.className = 'notice sage nara-choice-note';
        note.innerHTML = '<strong>14:00現場決策：</strong>A線為東大寺ミュージアム與寺院本體；B線為依水園／寧樂美術館。選定一線後，不再趕往另一線。';
        heading.insertAdjacentElement('afterend', note);
      }
    }

    const naraMuseum = naraVisit.querySelector('#nara-museum');
    if (naraMuseum) {
      const meta = naraMuseum.querySelector('.museum-head .meta');
      if (meta) meta.textContent = '09:30–12:10 · 固定核心';
      const grid = naraMuseum.querySelector('.decision-grid');
      if (grid) {
        grid.innerHTML = '<div><strong>時間分配</strong><span>南都仏画約100分鐘；佛像館約45分鐘；青銅器館約15分鐘</span></div><div><strong>硬離館</strong><span>12:10離館；12:30準時到うな菊</span></div><div><strong>延伸</strong><span><a href="daily.html#d0827">27/8行程</a> · <a href="culture.html#nara">奈良文化線</a> · <a href="deep-itinerary.html#nara">當日取捨</a></span></div>';
      }
    }

    const todaiji = naraVisit.querySelector('#todaiji');
    if (todaiji) {
      const meta = todaiji.querySelector('.museum-head .meta');
      if (meta) meta.textContent = 'A線｜14:00–16:15 · 東大寺人流可接受時';
      const grid = todaiji.querySelector('.decision-grid');
      if (grid) {
        grid.innerHTML = '<div><strong>選擇條件</strong><span>14:00到場時人流仍可接受，便完整走東大寺線</span></div><div><strong>路線</strong><span>ミュージアム → 南大門 → 大佛殿 → 法華堂 → 二月堂</span></div><div><strong>離開</strong><span>約16:15開始回近鐵奈良站；不再轉去依水園</span></div>';
      }
      const notice = todaiji.querySelector('.notice.sage');
      if (notice) {
        notice.innerHTML = '<strong>完整預習已獨立成頁：</strong><a href="todaiji.html">東大寺特別專頁</a>收錄三層重建史、華嚴思想、造像材料、27/8約2小時15至30分路線、3小時20分完整線、實景圖片、聲明與現場勾選模式。';
      }
    }

    const isuien = naraVisit.querySelector('#isuien');
    if (isuien) {
      const meta = isuien.querySelector('.museum-head .meta');
      if (meta) meta.textContent = 'B線｜14:10–15:20 · 東大寺明顯擠迫時';
      const grid = isuien.querySelector('.decision-grid');
      if (grid) {
        grid.innerHTML = '<div><strong>選擇條件</strong><span>東大寺團客明顯擠迫，約14:00立即轉往依水園</span></div><div><strong>路線</strong><span>前園 → 後園 → 寧樂美術館；其後只看東大寺外圍或直接回站</span></div><div><strong>硬時間</strong><span>16:00前入園；選此線後不再進東大寺各付費區</span></div>';
      }
    }
  }

  const todaijiPage = document.querySelector('.todaiji-page');
  if (todaijiPage) {
    const statusHeading = todaijiPage.querySelector('#visit-status .section-heading');
    if (statusHeading) {
      const title = statusHeading.querySelector('h2');
      const intro = statusHeading.querySelector('p');
      if (title) title.textContent = '8月27日按人流二選一';
      if (intro) intro.textContent = '東大寺線由14:00東大寺ミュージアム起計，主要參觀至約16:15；連同排隊與稍慢觀看，可用至16:30。依水園只在人流明顯擠迫時替代。';
    }

    const conflict = todaijiPage.querySelector('#visit-status .route-conflict');
    if (conflict) {
      conflict.innerHTML = `
        <div><span class="status-dot"></span><strong>東大寺線：14:00–16:15</strong><p>由ミュージアム開始，連南大門、大佛殿、法華堂與二月堂，實際可用約2小時15至30分。</p></div>
        <div><span class="status-dot amber"></span><strong>依水園線：14:10–15:20</strong><p>只在東大寺團客明顯擠迫時改行；選定後不再趕回各付費堂區。</p></div>
        <div class="route-verdict"><span>現行判斷</span><strong>若選東大寺，當日下午集中走完整主線，約16:15開始回近鐵奈良站；依水園留作替代方案。</strong></div>`;
    }

    const routeHeading = todaijiPage.querySelector('#routes .section-heading p');
    if (routeHeading) routeHeading.textContent = '27/8現行線由博物館開始，約2小時15至30分；3小時20分版供日後專程完整考察。';

    const compactButton = todaijiPage.querySelector('[data-route-select="compact"]');
    if (compactButton) compactButton.textContent = '27/8 · 約2小時15至30分';

    const compactPanel = todaijiPage.querySelector('[data-route-panel="compact"]');
    if (compactPanel) {
      compactPanel.innerHTML = `
        <div class="route-summary"><strong>適用前提</strong><span>14:00由東大寺ミュージアム開始，16:15左右完成二月堂，之後步行回近鐵奈良站。</span><span class="route-warning">法華堂16:00關門，15:50前必須離堂；排隊較長時先壓縮博物館至25分鐘，再縮短二月堂外部停留。</span></div>
        <ol class="field-route" id="field-route">
          <li><time>14:00–14:30</time><div><strong>東大寺ミュージアム</strong><span>集中看當期寺寶、盧舍那佛與重建材料；略過一般年表。</span></div></li>
          <li><time>14:30–14:42</time><div><strong>南大門</strong><span>先看門內通高與貫材，再由吽形側面看扭轉與木塊接合。</span></div></li>
          <li><time>14:42–14:50</time><div><strong>走向大佛殿</strong><span>保留中軸視線，不在鹿群停留。</span></div></li>
          <li><time>14:50–15:20</time><div><strong>大佛殿</strong><span>八角燈籠 → 中軸 → 側面 → 蓮座；先看尺度，再看跨年代修補。</span></div></li>
          <li><time>15:20–15:30</time><div><strong>上坡往法華堂</strong><span>補水；鐘樓只從路上看。</span></div></li>
          <li><time>15:30–15:50</time><div><strong>法華堂</strong><span>不空羂索觀音整體、寶冠反光、不同材料表面與群像站位。</span></div></li>
          <li><time>15:50–16:15</time><div><strong>二月堂</strong><span>舞台、樓梯與修二會空間；16:15左右開始下山回站。</span></div></li>
        </ol>`;
    }

    const checklist = todaijiPage.querySelector('#field-checklist .field-checklist');
    if (checklist) {
      checklist.innerHTML = `
        <article data-field-stop="museum"><div><span>01</span><h3>ミュージアム</h3><em>30分鐘</em></div><label><input type="checkbox"> 當期寺寶與原位置</label><label><input type="checkbox"> 木、銅、漆與泥的差異</label><label><input type="checkbox"> 只讀必要重建背景</label><p>14:30離館往南大門</p></article>
        <article data-field-stop="nandaimon"><div><span>02</span><h3>南大門</h3><em>12分鐘</em></div><label><input type="checkbox"> 門內通高與貫材</label><label><input type="checkbox"> 吽形側面扭轉</label><label><input type="checkbox"> 木塊拼接與低光</label><p>下一站：大佛殿 · 約8分鐘</p></article>
        <article data-field-stop="daibutsuden"><div><span>03</span><h3>大佛殿</h3><em>30分鐘</em></div><label><input type="checkbox"> 八角燈籠音聲菩薩</label><label><input type="checkbox"> 三段距離看尺度</label><label><input type="checkbox"> 蓮座與修補接縫</label><p>可拍；禁三腳架、寫生、電筒</p></article>
        <article data-field-stop="hokkedo"><div><span>04</span><h3>法華堂</h3><em>20分鐘</em></div><label><input type="checkbox"> 天平正堂／鎌倉禮堂</label><label><input type="checkbox"> 八臂與寶冠碎亮</label><label><input type="checkbox"> 三種材料表面</label><p>15:50前離堂；堂內禁拍</p></article>
        <article data-field-stop="nigatsudo"><div><span>05</span><h3>二月堂</h3><em>25分鐘</em></div><label><input type="checkbox"> 舞台與樓梯</label><label><input type="checkbox"> 儀式人流方向</label><label><input type="checkbox"> 奈良盆地與寺院地理</label><p>約16:15下山回近鐵奈良站</p></article>`;
    }

    const updated = todaijiPage.querySelector('.footer .updated');
    if (updated) updated.textContent = '行程同步：2026-07-24';
  }

  if ((document.querySelector('#nara-visit #todaiji') || document.body.classList.contains('todaiji-page')) && !document.querySelector('script[src*="todaiji-quick-read.js"]')) {
    const quickReadScript = document.createElement('script');
    quickReadScript.src = 'assets/todaiji-quick-read.js?v=20260724-1';
    quickReadScript.defer = true;
    document.head.appendChild(quickReadScript);
  }

  document.body.id = document.body.id || 'top';
  document.querySelectorAll('main > .section, main > .deep-day').forEach((section) => {
    const container = section.querySelector(':scope > .wrap') || section;
    if (container.querySelector(':scope > .back-to-top')) return;
    const row = document.createElement('p');
    row.className = 'back-to-top';
    const link = document.createElement('a');
    link.href = '#top';
    link.setAttribute('aria-label', '返回頁首');
    link.textContent = '回頁首 ↑';
    row.appendChild(link);
    container.appendChild(row);
  });

})();
