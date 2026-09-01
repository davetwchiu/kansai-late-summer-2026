(() => {
  // Core compatibility: main > .section, main > .deep-day | 回頁首 ↑ | serviceWorker | UPDATE_CONTENT | 更新內容
  const coreScript = document.createElement('script');
  coreScript.src = 'assets/site-core.js?v=20260901-1';
  coreScript.async = false;
  document.head.appendChild(coreScript);

  const setupMapDateRibbon = () => {
    const mapGrid = document.querySelector('.map-grid');
    if (!mapGrid || document.querySelector('.map-date-ribbon')) return;

    const style = document.createElement('style');
    style.textContent = `
      .map-date-ribbon{display:none}
      @media(max-width:760px){
        .map-date-ribbon{display:flex}
      }
      @media print{.map-date-ribbon{display:none!important}}
    `;
    document.head.appendChild(style);

    const nav = document.createElement('nav');
    nav.className = 'quick-nav map-date-ribbon';
    nav.setAttribute('aria-label', '日期捷徑');
    nav.innerHTML = [
      ['#d0826', '26/8'],
      ['#d0827', '27/8'],
      ['#d0828', '28/8'],
      ['#d0829', '29/8'],
      ['#d0830', '30/8'],
      ['#d0831', '31/8'],
      ['#d0901', '1/9'],
      ['#d0902', '2/9'],
    ].map(([href, label]) => `<a href="${href}">${label}</a>`).join('');

    mapGrid.parentNode.insertBefore(nav, mapGrid);
  };

  const setupMobileBackButton = () => {
    if (document.querySelector('.mobile-back-button')) return;

    const style = document.createElement('style');
    style.textContent = `
      .mobile-back-button{display:none}
      @media(max-width:760px){
        .mobile-back-button{
          appearance:none;
          display:grid;
          place-items:center;
          position:fixed;
          left:16px;
          bottom:calc(68px + env(safe-area-inset-bottom, 0px));
          z-index:55;
          width:48px;
          height:48px;
          padding:0;
          border:1px solid rgba(255,255,255,.42);
          border-radius:50%;
          background:rgba(24,55,70,.94);
          color:#fff;
          box-shadow:0 10px 28px rgba(24,55,70,.28);
          backdrop-filter:blur(10px);
          -webkit-backdrop-filter:blur(10px);
          font:700 1.45rem/1 var(--sans, -apple-system, BlinkMacSystemFont, sans-serif);
          cursor:pointer;
          -webkit-tap-highlight-color:transparent;
        }
        .mobile-back-button:active{transform:translateY(1px);background:rgba(163,69,49,.96)}
        .mobile-back-button:focus-visible{outline:3px solid rgba(231,200,140,.88);outline-offset:3px}
        .mobile-tools{bottom:calc(12px + env(safe-area-inset-bottom, 0px))}
        .footer{padding-bottom:calc(82px + env(safe-area-inset-bottom, 0px))}
      }
      @media print{.mobile-back-button{display:none!important}}
    `;
    document.head.appendChild(style);

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'mobile-back-button';
    button.setAttribute('aria-label', '返回上一頁');
    button.setAttribute('title', '返回上一頁');
    button.textContent = '←';
    button.addEventListener('click', () => {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.assign('index.html');
      }
    });
    document.body.appendChild(button);
  };

  const setupPageEnhancements = () => {
    setupMapDateRibbon();
    setupMobileBackButton();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupPageEnhancements, { once: true });
  } else {
    setupPageEnhancements();
  }
})();
