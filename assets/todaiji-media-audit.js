(() => {
  if (!document.body.classList.contains('todaiji-page')) return;

  const mediaByTitle = [
    {
      match: '千手觀音菩薩立像',
      image: ['https://www.ktv.jp/kenbutsu_app/20141129_5/', '關西電視台「ほとけんさく」：千手觀音實物圖'],
      data: [['https://www.todaiji.or.jp/information/museum/', '東大寺：常設展示資料']]
    },
    {
      match: '傳日光、傳月光菩薩立像',
      image: ['https://commons.wikimedia.org/wiki/Category:Statues_of_Nikk%C5%8D_and_Gakk%C5%8D_Bosatsu_(T%C5%8Ddai-ji)', 'Wikimedia Commons：日光、月光公海圖'],
      data: [['https://www.nippon.com/hk/japan-topics/b10926/', '身分與移座研究導讀']]
    },
    {
      match: '誕生釋迦佛與灌佛盤',
      image: ['https://commons.wikimedia.org/wiki/File:Shaka_at_birth_basin.JPG', 'Wikimedia Commons：誕生釋迦佛與灌佛盤原圖'],
      data: [
        ['https://www.tnm.jp/modules/r_free_page/index.php?id=704&lang=ja', '東京國立博物館：展覽與實物資料'],
        ['https://online.bunka.go.jp/db/heritages/detail/192443', '文化庁：作品資料']
      ]
    },
    {
      match: '菩薩半跏像',
      image: null,
      note: '暫未找到可核實、確屬東大寺此像的公開圖片；同名或近似圖容易連錯作品。',
      data: [['https://online.bunka.go.jp/db/heritages/detail/152018', '文化庁：東大寺此像的作品資料']]
    },
    {
      match: '釋迦／多寶如來坐像',
      image: ['https://kunishitei.bunka.go.jp/heritage/detail/201/00011567', '文化庁國指定文化財資料庫：作品圖3幅'],
      data: [['https://online.bunka.go.jp/heritages/detail/266902/2', '文化遺產Online：作品資料']]
    },
    {
      match: '辯才天、吉祥天',
      image: ['https://commons.wikimedia.org/wiki/File:Todaiji_Kisshoten.jpg', 'Wikimedia Commons：東大寺吉祥天公海圖'],
      note: '此連結只顯示吉祥天；暫未找到可核實的兩像同框公開圖。',
      data: [['https://online.bunka.go.jp/db/heritages/detail/181542', '文化庁：弁財天・吉祥天作品資料（該頁未必顯示圖片）']]
    },
    {
      match: '不空羂索觀音',
      image: ['https://commons.wikimedia.org/wiki/Category:Statue_of_Fuk%C5%ABkensaku_Kannon_of_Hokked%C5%8D%2C_T%C5%8Ddaiji', 'Wikimedia Commons：不空羂索觀音圖像集'],
      data: [['https://online.bunka.go.jp/db/heritages/detail/125587', '文化庁：作品資料']]
    },
    {
      match: '梵天／帝釋天及守護群像',
      image: ['https://commons.wikimedia.org/wiki/Category:Statues_of_Bonten_and_Taishakuten_in_the_Hokke-d%C5%8D%2C_T%C5%8Ddai-ji', 'Wikimedia Commons：梵天、帝釋天公海圖'],
      data: [['https://commons.wikimedia.org/wiki/Category:Statues_of_the_Four_Heavenly_Kings_in_the_Hokke-d%C5%8D%2C_T%C5%8Ddai-ji', 'Wikimedia Commons：法華堂四天王圖像']]
    }
  ];

  const cards = Array.from(document.querySelectorAll('#object-room [data-object-material]'));
  cards.forEach((card) => {
    const title = card.querySelector('h3')?.textContent.trim() || '';
    const entry = mediaByTitle.find((item) => title.includes(item.match));
    if (!entry) return;

    let source = card.querySelector('.object-source');
    if (!source) {
      source = document.createElement('p');
      source.className = 'object-source';
      card.appendChild(source);
    }

    const parts = [];
    if (entry.image) {
      parts.push(`<a class="verified-image-link" data-verified-image="true" href="${entry.image[0]}" target="_blank" rel="noopener">${entry.image[1]} ↗</a>`);
    } else {
      parts.push(`<span class="image-unavailable" data-image-unavailable="true">${entry.note}</span>`);
    }
    if (entry.image && entry.note) parts.push(`<span class="image-scope-note">${entry.note}</span>`);
    entry.data.forEach(([href, label]) => {
      parts.push(`<a class="verified-data-link" href="${href}" target="_blank" rel="noopener">${label} ↗</a>`);
    });
    source.innerHTML = parts.join(' · ');
    card.dataset.mediaAudited = 'true';
  });

  document.querySelectorAll('#object-room a').forEach((link) => {
    const href = link.getAttribute('href') || '';
    if (href.includes('online.bunka.go.jp') && /圖像|作品圖|三幅圖/.test(link.textContent)) {
      link.textContent = link.textContent.replace(/（?圖像）?|作品圖|三幅圖/g, '作品資料');
    }
    if (href.includes('/information/museum/') && /館藏圖入口/.test(link.textContent)) {
      link.textContent = link.textContent.replace('館藏圖入口', '展覽資料');
    }
  });

  const unauditedCards = cards.filter((card) => card.dataset.mediaAudited !== 'true');
  const pageImages = Array.from(document.querySelectorAll('main img'));
  const imagesWithoutOriginal = pageImages.filter((image) => {
    const link = image.closest('a.image-original-link');
    return !link || !link.href || link.href.startsWith(`${window.location.origin}${window.location.pathname.replace(/[^/]+$/, '')}assets/`);
  });

  if (cards.length !== mediaByTitle.length || unauditedCards.length || imagesWithoutOriginal.length) {
    const cardNames = unauditedCards.map((card) => card.querySelector('h3')?.textContent.trim() || '未命名').join('、');
    console.error(`Tōdai-ji media audit failed: ${cards.length}/${mediaByTitle.length} cards; unaudited cards: ${cardNames}; images without external originals: ${imagesWithoutOriginal.length}`);
  }
})();
