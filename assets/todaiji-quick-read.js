(() => {
  const init = () => {
    const museumEntry = document.querySelector('#nara-visit #todaiji');
    const specialPage = document.body.classList.contains('todaiji-page');
    if (!museumEntry && !specialPage) return;

    if (!document.querySelector('link[href*="todaiji-quick-read.css"]')) {
      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = 'assets/todaiji-quick-read.css?v=20260724-1';
      document.head.appendChild(style);
    }

    const stops = [
      { time: '14:00–14:30', title: '東大寺ミュージアム', points: ['看原物表面，不再讀完整年表', '日光／月光先比較臉、手、肩腰與衣褶', '最後只選一件輪換展品'], exit: '14:30離館往南大門' },
      { time: '14:30–14:42', title: '南大門', points: ['站在門內仰看通高空間與穿柱貫材', '由吽形側面看胸腹扭轉', '找木塊接合與低光陰影'], exit: '14:42沿中軸往大佛殿' },
      { time: '14:50–15:25', title: '大佛殿', points: ['門外先看建築與大佛如何逐步佔滿視野', '入殿由正面移到側面看厚度與修補', '最後俯看蓮瓣線刻，不只拍佛面'], exit: '15:25上坡；鐘樓只沿途看' },
      { time: '15:35–15:55', title: '法華堂', points: ['先退後讀本尊與護法群像整體站位', '看寶冠碎亮、三眼八臂及羂索', '比較乾漆、泥塑與木造表面'], exit: '15:55前離堂，避過16:00關門' },
      { time: '15:55–16:30', title: '二月堂', points: ['看舞台、樓梯、局與坡地如何服務修二會', '把奈良盆地放回寺院地理', '想像聲明、奔走、火與水的動線'], exit: '16:30準時下山' },
      { time: '16:30–17:05', title: '步行回近鐵奈良站', points: ['沿途補水，不再加景點', '下坡及人流預留35分鐘', '確認17:15共同回大阪'], exit: '17:05前到站' }
    ];

    const renderStepper = (container) => {
      container.innerHTML = `
        <div class="tqr-heading">
          <div class="label">On-site quick read</div>
          <div><h3>現場速讀：每次只處理一站</h3><p>按「下一站」切換內容及進度。只保留時間、三個觀察點與離開條件。</p></div>
        </div>
        <div class="tqr-progress"><strong data-tqr-label>1 / ${stops.length}</strong><div><i data-tqr-bar></i></div></div>
        <article class="tqr-card" data-tqr-card tabindex="-1" aria-live="polite"></article>
        <div class="tqr-actions"><button type="button" class="button secondary" data-tqr-prev disabled>上一站</button><button type="button" class="button" data-tqr-next>下一站</button></div>`;

      const card = container.querySelector('[data-tqr-card]');
      const prev = container.querySelector('[data-tqr-prev]');
      const next = container.querySelector('[data-tqr-next]');
      const label = container.querySelector('[data-tqr-label]');
      const bar = container.querySelector('[data-tqr-bar]');
      let index = 0;

      const update = () => {
        const stop = stops[index];
        card.innerHTML = `<header><span>${String(index + 1).padStart(2, '0')}</span><div><time>${stop.time}</time><h4>${stop.title}</h4></div></header><ol>${stop.points.map((point) => `<li>${point}</li>`).join('')}</ol><p><strong>離開條件：</strong>${stop.exit}</p>`;
        label.textContent = `${index + 1} / ${stops.length}`;
        bar.style.width = `${((index + 1) / stops.length) * 100}%`;
        prev.disabled = index === 0;
        next.textContent = index === stops.length - 1 ? '回到第一站' : '下一站';
      };

      prev.addEventListener('click', () => {
        if (index > 0) index -= 1;
        update();
        card.focus({ preventScroll: true });
      });
      next.addEventListener('click', () => {
        index = index === stops.length - 1 ? 0 : index + 1;
        update();
        card.focus({ preventScroll: true });
      });
      update();
    };

    if (museumEntry) {
      const meta = museumEntry.querySelector('.museum-head .meta');
      if (meta) meta.textContent = '14:00–16:30 · 東大寺ミュージアム＋寺院主線';

      const decisionGrid = museumEntry.querySelector('.decision-grid');
      if (decisionGrid) {
        decisionGrid.innerHTML = '<div><strong>參觀</strong><span>14:00–16:30｜ミュージアム → 南大門 → 大佛殿 → 法華堂 → 二月堂</span></div><div><strong>回站</strong><span>16:30–17:05｜二月堂 → 近鐵奈良站</span></div><div><strong>延伸</strong><span><a href="todaiji.html">東大寺特別專頁</a> · <a href="daily.html#d0827">27/8行程</a> · <a href="maps.html#d0827">步行地圖</a></span></div>';
      }

      const notice = museumEntry.querySelector('.notice.sage');
      if (notice) notice.innerHTML = '<strong>背景深讀：</strong><a href="todaiji.html">東大寺特別專頁</a>保留重建史、華嚴思想、造像材料、文物圖像與逐站研究；現場操作集中在下方速讀器。';

      let quickRead = museumEntry.querySelector('#todaiji-quick-read');
      if (!quickRead) {
        quickRead = document.createElement('section');
        quickRead.id = 'todaiji-quick-read';
        quickRead.className = 'todaiji-quick-read';
        const visitScript = museumEntry.querySelector('.visit-script');
        (visitScript || museumEntry.querySelector('.orientation-grid') || museumEntry.querySelector('.museum-head')).insertAdjacentElement('afterend', quickRead);
      }
      renderStepper(quickRead);
    }

    if (specialPage) {
      const wrap = document.querySelector('#field-checklist .wrap');
      if (wrap) {
        wrap.innerHTML = `<div class="section-heading"><div class="label">On-site quick read</div><div><h2>現場速讀已移到「入館筆記」東大寺篇</h2><p>速讀器與入館安排放在同一處，避免特別專頁與入館筆記保存兩套版本。</p></div></div><div class="notice sage todaiji-quick-read-link"><strong>直接開啟：</strong><a class="button" href="museums.html#todaiji-quick-read">入館筆記｜東大寺現場速讀</a></div>`;
      }
    }
  };

  if (document.readyState === 'complete') init();
  else window.addEventListener('load', init, { once: true });
})();
