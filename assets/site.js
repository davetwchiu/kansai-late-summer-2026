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
        <tr><td>A｜14:00–16:15</td><td><a class="context-link museum-link" href="museums.html#todaiji">東大寺ミュージアム → 南大門・大佛殿 → 法華堂 → 二月堂</a></td></tr>
        <tr><td>B｜14:10–15:20</td><td><a class="context-link museum-link" href="museums.html#isuien">依水園／寧樂美術館</a>；其後只看東大寺外圍或直接回站</td></tr>
        <tr><td>17:00</td><td>近鐵奈良出發</td></tr>
        <tr><td>19:00</td><td><a class="context-link food-link" href="food.html#joji">旨い料理・旨い酒 じょうじ</a></td></tr>`;
    }

    const priorities = naraDay.querySelector('.day-aside ul');
    if (priorities) {
      priorities.innerHTML = `
        <li>核心：奈良國博、下午其中一條主線、19:00晚餐。</li>
        <li>14:00按東大寺人流決定；毋須硬塞兩條線。</li>
        <li>東大寺擠迫即轉依水園；17:00離開奈良。</li>`;
    }
  }

  const naraDeep = document.querySelector('#nara');
  if (naraDeep) {
    const gardenParagraph = Array.from(naraDeep.querySelectorAll('p')).find((paragraph) => {
      const strong = paragraph.querySelector('strong');
      return strong && strong.textContent.includes('依水園');
    });
    if (gardenParagraph) {
      gardenParagraph.innerHTML = '<strong>14:00現場分流：</strong>午餐後先到東大寺周邊看人流。若人流可接受，保留東大寺ミュージアム、南大門、大佛殿、法華堂與二月堂；若團客明顯擠迫，立即轉往依水園／寧樂美術館。兩邊都值得付入場費，當日只需選體驗較好的一條。';
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