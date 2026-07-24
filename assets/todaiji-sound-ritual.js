(() => {
  const init = () => {
    if (!document.body.classList.contains('todaiji-page') || document.querySelector('#sound .sound-ritual-grid')) return;

    if (!document.querySelector('link[href*="todaiji-sound-ritual.css"]')) {
      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = 'assets/todaiji-sound-ritual.css?v=20260724-1';
      document.head.appendChild(style);
    }

    const grid = document.querySelector('#sound .media-grid');
    if (!grid) return;
    grid.className = 'media-grid sound-ritual-grid';

    const commons = (filename, width = 1200) => {
      const encoded = encodeURIComponent(filename);
      return {
        preview: `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encoded}?width=${width}`,
        original: `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encoded}`,
        page: `https://commons.wikimedia.org/wiki/File:${encoded}`
      };
    };

    const nigatsudo = commons('Nigatsu-dou Todaiji JPN1.jpg');
    const bell = commons('The bronze bell of Tōdai-ji, Nara, Japan (NYPL Hades-2360351-4044150).tiff');
    const daibutsu = commons('Daibutsu_of_Todaiji_2.jpg');
    const shunie = commons('Todaiji_Syunie_Nara_JPN_001.JPG');

    const player = (id, title, query = '') => `<div class="video-frame sound-video-frame"><iframe src="https://www.youtube-nocookie.com/embed/${id}${query}" title="${title}" loading="lazy" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;

    grid.innerHTML = `
      <article class="sound-ritual-card" data-sound-card="shomyo">
        <figure class="sound-card-image">
          <a href="${nigatsudo.original}" target="_blank" rel="noopener" aria-label="查看二月堂完整原圖">
            <img src="assets/images/todaiji/nigatsudo.webp" alt="東大寺二月堂舞台與木構外觀，作為修二會聲明的空間背景" loading="lazy">
          </a>
          <figcaption>二月堂：修二會聲明的木構與內外陣空間背景。<a href="${nigatsudo.page}" target="_blank" rel="noopener">原圖與授權 ↗</a></figcaption>
        </figure>
        <div class="sound-card-copy">
          <span class="media-type">聲明 · 原站試聽</span>
          <h3>華嚴宗聲明</h3>
          <p>多位僧侶把「甲／乙」高低音疊合。先聽五段示例，再想像二月堂木構與內外陣如何承接聲音。</p>
          <div class="external-player-panel">
            <strong>國立劇場數碼教材</strong>
            <span>原頁提供五段2009年華嚴宗聲明演出試聽；播放器未能可靠地獨立嵌入本站。</span>
            <a class="button secondary" href="https://www2.ntj.jac.go.jp/dglib/contents/learn/edc28/miru/temple/s_11.html" target="_blank" rel="noopener">開啟華嚴宗聲明播放器 ↗</a>
          </div>
        </div>
      </article>

      <article class="sound-ritual-card" data-sound-card="nara-taro">
        <figure class="sound-card-image">
          <a href="${bell.original}" target="_blank" rel="noopener" aria-label="查看東大寺大鐘完整原圖">
            <img src="${bell.preview}" alt="東大寺大鐘奈良太郎的歷史照片" loading="lazy">
          </a>
          <figcaption>東大寺大鐘「奈良太郎」歷史照片。<a href="${bell.page}" target="_blank" rel="noopener">NYPL／Wikimedia原圖與權利說明 ↗</a></figcaption>
        </figure>
        <div class="sound-card-copy">
          <span class="media-type">鐘聲 · 現地錄影</span>
          <h3>奈良太郎</h3>
          <p>先聽撞擊後的低頻與長餘韻。錄影可補足撞木動作；現場重點仍是鐘、屋架與懸掛關係。</p>
          ${player('QmBk12w649s', '東大寺大鐘奈良太郎鐘聲錄影')}
          <a class="sound-source-link" href="https://www.youtube.com/watch?v=QmBk12w649s" target="_blank" rel="noopener">在YouTube開啟 ↗</a>
        </div>
      </article>

      <article class="sound-ritual-card" data-sound-card="omigui">
        <figure class="sound-card-image">
          <a href="${daibutsu.original}" target="_blank" rel="noopener" aria-label="查看東大寺大佛完整原圖">
            <img src="assets/images/todaiji/daibutsu.webp" alt="東大寺盧舍那大佛正面，供對照お身拭い影片中的人物尺度" loading="lazy">
          </a>
          <figcaption>盧舍那大佛正面；配合影片比較清潔者與佛身尺度。<a href="${daibutsu.page}" target="_blank" rel="noopener">原圖與授權 ↗</a></figcaption>
        </figure>
        <div class="sound-card-copy">
          <span class="media-type">儀式 · 尺度</span>
          <h3>大佛お身拭い</h3>
          <p>看清潔者在佛身上的比例，十五米由抽象數字變成可見身體尺度。留意梯具、繩索、移動路徑與多人協作如何把巨像轉化成可操作的儀式空間。</p>
          ${player('eUj8tb6q1z0', '東大寺大佛お身拭い影片')}
          <a class="sound-source-link" href="https://www.youtube.com/watch?v=eUj8tb6q1z0" target="_blank" rel="noopener">在YouTube開啟 ↗</a>
        </div>
      </article>

      <article class="sound-ritual-card" data-sound-card="shunie-recording">
        <figure class="sound-card-image">
          <a href="${shunie.original}" target="_blank" rel="noopener" aria-label="查看修二會松明完整原圖">
            <img src="assets/images/todaiji/shunie.webp" alt="東大寺修二會松明火光，作為現地錄音的儀式背景" loading="lazy">
          </a>
          <figcaption>修二會松明與二月堂夜間儀式。<a href="${shunie.page}" target="_blank" rel="noopener">Ignis攝・CC BY-SA 2.5 ↗</a></figcaption>
        </figure>
        <div class="sound-card-copy">
          <span class="media-type">現地錄音 · 聲明與儀式聲景</span>
          <h3>修二會現地錄音</h3>
          <p>把聲明、木履與堂內動作放在同一條時間線聽。先辨人聲的高低層次，再留意腳步、器物聲、停頓與二月堂回響如何組成完整儀式聲景。</p>
          ${player('n7FU3r4Nlek', '東大寺修二會現地錄音', '?list=PLRbGqqBTO3HaZoQ2Keur6W5LOjqaS_Vyn')}
          <div class="sound-card-links"><a class="sound-source-link" href="https://www.youtube.com/watch?v=n7FU3r4Nlek&list=PLRbGqqBTO3HaZoQ2Keur6W5LOjqaS_Vyn" target="_blank" rel="noopener">在YouTube開啟播放清單 ↗</a><a class="sound-source-link" href="https://s.jtcf.jp/item.php?id=vzcg-731" target="_blank" rel="noopener">1972年商業錄音資料 ↗</a></div>
        </div>
      </article>`;
  };

  if (document.readyState === 'complete') init();
  else window.addEventListener('load', init, { once: true });
})();
