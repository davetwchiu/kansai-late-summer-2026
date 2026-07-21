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
