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

  const mapQueries = new Map([
    ['ジュンジーノ', 'ジュンジーノ 大阪'],
    ['弥助', '弥助 堺'],
    ['鉄炮鍛冶屋敷', '鉄炮鍛冶屋敷 堺'],
    ['七道駅', '七道駅 堺'],
    ['ritmicita', 'ritmicita 大阪'],
    ['炭火いわ田', '炭火いわ田 大阪'],
    ['トンカツとワイン 日月', 'トンカツとワイン 日月 神戸'],
    ['エスピス', 'エスピス 神戸'],
    ['口縄坂', '口縄坂 大阪'],
    ['鮨まさる', '鮨まさる 大阪'],
    ['Osteria Shoru', 'Osteria Shoru 箕面'],
    ['瀧安寺', '瀧安寺 箕面'],
    ['黒杉', '黒杉 大阪'],
  ]);

  document.querySelectorAll('.route-steps li').forEach((item) => {
    if (item.querySelector('a')) return;

    const label = item.textContent.trim();
    if (!label) return;

    const query = mapQueries.get(label) || label;
    const link = document.createElement('a');
    link.className = 'map-point-link';
    link.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    link.target = '_blank';
    link.rel = 'noopener';
    link.setAttribute('aria-label', `${label} — 在 Google Maps 開啟`);
    link.append(document.createTextNode(`${label} `));

    const arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '↗';
    link.append(arrow);

    item.replaceChildren(link);
  });

  if (document.querySelector('.map-grid')) {
    const heroText = document.querySelector('.page-hero p');
    if (heroText) {
      heroText.textContent = '每個景點、餐廳與交通節點均可獨立開啟 Google Maps；整段多站路線保留作備用。';
    }

    const notice = document.querySelector('.notice.sage');
    if (notice) {
      notice.innerHTML = '<strong>使用提示：</strong>直接按景點名稱開啟該點。Google Maps 的整段路線可能按即時交通重新排序；堺、奈良與灘五鄉仍應維持網站列出的次序。';
    }

    document.querySelectorAll('.map-actions a[href*="google.com/maps/dir"]').forEach((link) => {
      link.textContent = '整段路線（備用）';
    });
  }
})();
