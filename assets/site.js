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

  const culturePage = document.querySelector('a[aria-current="page"][href="culture.html"]');
  const cultureMain = document.querySelector('#main');
  if (culturePage && cultureMain && !document.querySelector('#osaka-region')) {
    const firstSection = cultureMain.querySelector('.page-hero + .section');
    const quickNav = firstSection?.querySelector('.quick-nav');
    const storyline = firstSection?.querySelector('.storyline');

    if (quickNav) {
      quickNav.insertAdjacentHTML('afterbegin', '<a href="#osaka-region">府內連結</a>');
    }

    if (storyline) {
      storyline.insertAdjacentHTML('beforeend', '<a href="#osaka-region"><strong>地域網絡</strong><span>堺的商業與工藝流入大阪；大阪的鐵路與人口再向箕面伸展。</span></a>');
    }

    const regionalSection = document.createElement('section');
    regionalSection.className = 'section';
    regionalSection.id = 'osaka-region';
    regionalSection.innerHTML = `
      <div class="wrap"><article class="essay culture-depth">
        <div class="kicker">Osaka Prefecture / linked urban history</div>
        <h2>堺—大阪—箕面：由港市、商都到鐵路郊區</h2>
        <p class="pullquote">三地分別位於大阪府南部、中央與北部，卻屬於同一條城市發展長線：堺累積港口貿易、茶湯和專門工藝；大阪把這些資源吸納並擴大；箕面則呈現近代大阪人口、資本和休閒生活向郊外伸展。</p>
        <h3>一、堺到大阪：商業文明由港市進入城下町</h3>
        <p>中世堺依靠海運、環濠、商人組織和海外交易成為高度自主的港市。<a class="term-link" href="https://www.sakai-tcb.or.jp/about-sakai/history/" target="_blank" rel="noopener noreferrer" title="堺觀光指南：堺的歷史">堺商人</a>累積的不只財富，也包括信用、人脈、器物鑑賞、金工和跨地域資訊。茶湯、火器與刃物都在這個城市環境中成熟。</p>
        <p><a class="term-link" href="https://www.sakai-tcb.or.jp/feature/detail/81" target="_blank" rel="noopener noreferrer" title="堺觀光指南：豐臣秀吉與堺">豐臣秀吉築大坂城並收編堺</a>後，區域政治與商業重心逐步移向大坂。堺的商人、茶人、工匠、貨物流通與審美資本進入新的城下町網絡。大阪後來的町人文化、批發市場和消費生活，承接了堺早已形成的商業能力，再以更大人口、運河和全國市場加以擴張。</p>
        <p>兩地之間還有具體道路與祭禮聯繫。<a class="term-link" href="https://www.city.osaka.lg.jp/sumiyoshi/page/0000001253.html" target="_blank" rel="noopener noreferrer" title="大阪市住吉區：紀州街道與住吉祭">紀州街道及住吉祭</a>把大阪、住吉與堺接成一條南北軸線。這條線提醒人，堺與大阪長期共享商品、信仰、行旅和城市人口。</p>
        <h3>二、大阪到箕面：城市財富沿私鐵走向郊外</h3>
        <p>箕面原有山岳信仰、西國街道、寺院和紅葉遊覽文化。大阪人口在近世持續增長後，箕面逐漸成為城市居民可到達的參詣與休養地。二十世紀初，<a class="term-link" href="https://www.city.minoh.lg.jp/soumu/shishi/column/topic-1.html" target="_blank" rel="noopener noreferrer" title="箕面市：箕面有馬電氣軌道與觀光開發">箕面有馬電氣軌道</a>把這種關係制度化：鐵路公司利用瀑布、山林和遊樂設施吸引大阪乘客，同時培養沿線住宅需求。</p>
        <p><a class="term-link" href="https://www.city.minoh.lg.jp/soumu/shishi/column/topic-2.html" target="_blank" rel="noopener noreferrer" title="箕面市：櫻井住宅地與近代郊區生活">櫻井住宅地等郊區開發</a>直接面向大阪通勤人口。鐵路把工作地、消費地和居住地重新分開，箕面的自然、教育環境和住宅文化則回過頭塑造大阪中產階層對理想生活的想像。今日由市中心乘阪急到箕面，再由住宅區走入滝道，仍然重演這條近代都市路線。</p>
        <h3>三、三地合讀：大阪都市文明的三個尺度</h3>
        <p>堺展示商業信用、茶湯與製造技術如何在中世港市形成；大阪展示城下町、物流、金融和町家社會如何把它們放大；箕面展示現代都會成熟後，人口與資本如何追求交通便利、自然和較佳居住環境。三地合起來，便能看到大阪由海港商業走向大型城市，再走向鐵路郊區的完整變化。</p>
        <div class="interpret-box"><strong>行程閱讀線：</strong>28/8在堺看商業文明的前史；31/8在大阪看城下町與町人生活的成熟；1/9在箕面看近代私鐵如何把大阪的城市生活延伸到北攝山麓。</div>
        <div class="contextual-links"><a href="deep-itinerary.html#sakai">28/8堺深度行程</a><a href="deep-itinerary.html#osaka">31/8大阪深度行程</a><a href="deep-itinerary.html#minoh">1/9箕面深度行程</a></div>
      </article></div>`;

    if (firstSection) {
      firstSection.insertAdjacentElement('afterend', regionalSection);
    }

    const updated = document.querySelector('.footer .updated');
    if (updated) updated.textContent = '文化筆記內容更新：2026-07-21';
  }
})();
