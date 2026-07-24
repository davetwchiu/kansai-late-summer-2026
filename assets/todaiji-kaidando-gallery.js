(() => {
  const init = () => {
    if (!document.body.classList.contains('todaiji-page') || document.querySelector('#kaidando-four-kings')) return;

    if (!document.querySelector('link[href*="todaiji-kaidando-gallery.css"]')) {
      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = 'assets/todaiji-kaidando-gallery.css?v=20260724-1';
      document.head.appendChild(style);
    }

    const kaidando = document.querySelector('#kaidando');
    if (!kaidando) return;
    const copy = kaidando.querySelector('.stop-copy');
    const guardianGrid = copy?.querySelector('.guardian-grid');
    if (!copy || !guardianGrid) return;

    const commons = (filename, width) => {
      const encoded = encodeURIComponent(filename);
      return {
        preview: `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encoded}?width=${width}`,
        original: `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encoded}`,
        page: `https://commons.wikimedia.org/wiki/File:${encoded}`
      };
    };

    const kings = [
      {
        name: '持國天', kana: 'じこくてん', direction: '東方', attribute: '劍', focus: '比較沉著面相、向前壓低的重心，以及甲冑與邪鬼如何把垂直身體鎖住。',
        file: '『Japanese Temples and Their Treasures』《四天王立像 持国天》8世紀中頃、奈良時代、東大寺（戒壇堂所在）、奈良.jpg'
      },
      {
        name: '增長天', kana: 'ぞうちょうてん', direction: '南方', attribute: '長兵器', focus: '看張口、抬臂和軀幹扭轉帶來的外放動勢；再比較甲片邊緣與衣褶的泥塑過渡。',
        file: '『Japanese Temples and Their Treasures』《四天王立像 増長天》8世紀中頃、奈良時代、東大寺（戒壇堂所在）、奈良.jpg'
      },
      {
        name: '廣目天', kana: 'こうもくてん', direction: '西方', attribute: '筆與卷', focus: '怒相收斂成觀察與記錄的姿態；重點看手指、卷軸、眉眼及袴部殘存文樣。',
        file: '小川晴暘撮影《四天王立像 広目天》8世紀、奈良時代、東大寺、奈良.jpg'
      },
      {
        name: '多聞天', kana: 'たもんてん', direction: '北方', attribute: '寶塔', focus: '四像中重心最穩；看托塔與持物如何平衡身體，亦留意面部、胸甲和邪鬼的上下層次。',
        file: '小川晴暘撮影《四天王立像 多聞天》8世紀、奈良時代、東大寺、奈良.jpg'
      }
    ];

    const gallery = document.createElement('section');
    gallery.id = 'kaidando-four-kings';
    gallery.className = 'kaidando-four-kings';
    gallery.innerHTML = `
      <header>
        <div><span>Four Heavenly Kings · visual comparison</span><h4>四尊要並排比較，才看得出泥塑身體的差異</h4></div>
        <p>四像同為8世紀國寶塑像，約1.6米高，立於戒壇堂壇上四角。先看整體群像節奏，再逐尊比較面相、重心、持物、甲冑與邪鬼。</p>
      </header>
      <div class="four-kings-grid">
        ${kings.map((king) => {
          const image = commons(king.file, 720);
          return `<article class="four-king-card" data-four-king="${king.name}">
            <a class="four-king-image" href="${image.original}" target="_blank" rel="noopener" aria-label="查看${king.name}完整原圖">
              <img src="${image.preview}" alt="東大寺戒壇堂${king.name}立像歷史照片" loading="lazy">
              <span>查看完整原圖 ↗</span>
            </a>
            <div class="four-king-copy">
              <div class="four-king-meta"><strong>${king.name}</strong><span>${king.kana}</span></div>
              <p class="four-king-role">${king.direction} · 持物：${king.attribute}</p>
              <p>${king.focus}</p>
              <a href="${image.page}" target="_blank" rel="noopener">Wikimedia原檔與公有領域說明 ↗</a>
            </div>
          </article>`;
        }).join('')}
      </div>
      <footer>
        <a href="https://www.todaiji.or.jp/information/kaidando/" target="_blank" rel="noopener">東大寺官方：戒壇堂與四天王 ↗</a>
        <a href="https://imagedb.narahaku.go.jp/005180-000-000.html" target="_blank" rel="noopener">奈良國立博物館：四天王像資料與攝影原板記錄 ↗</a>
      </footer>`;

    guardianGrid.insertAdjacentElement('afterend', gallery);
  };

  if (document.readyState === 'complete') init();
  else window.addEventListener('load', init, { once: true });
})();
