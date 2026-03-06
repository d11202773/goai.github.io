(function () {
  const customerNames = [
    'Nguyễn Minh',
    'Anh Tuấn',
    'Minh Đức',
    'Huy Hoàng',
    'Trần Nam',
    'Thu Trang',
    'Lan Anh',
    'Hoàng Long',
    'Thanh Tùng',
    'Nguyễn Huy'
  ];

  const productNames = [
    'ChatGPT Plus',
    'CapCut Pro',
    'Gemini Pro',
    'Kling AI',
    'Kling AI 1100 Credit',
    'Claude AI Pro',
    'Zoom Pro',
    'Office 365 + 1TB',
    'Perplexity Pro',
    'YouTube Premium'
  ];

  const timeTexts = [
    'vài giây trước',
    '1 phút trước',
    '3 phút trước',
    '5 phút trước'
  ];

  const SHOW_MIN_DELAY = 12000;
  const SHOW_MAX_DELAY = 20000;
  const VISIBLE_DURATION = 6000;

  let activePopup = null;
  let hideTimer = null;

  function randomItem(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function randomDelay() {
    return Math.floor(Math.random() * (SHOW_MAX_DELAY - SHOW_MIN_DELAY + 1)) + SHOW_MIN_DELAY;
  }

  function injectStyles() {
    if (document.getElementById('social-proof-style')) {
      return;
    }

    const style = document.createElement('style');
    style.id = 'social-proof-style';
    style.textContent = `
      .social-proof-popup {
        position: fixed;
        left: 20px;
        bottom: 20px;
        z-index: 9999;
        width: min(340px, calc(100vw - 40px));
        background: #12131A;
        border: 1px solid #F6C453;
        border-radius: 12px;
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
        padding: 12px 14px;
        color: #ffffff;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        opacity: 0;
        transform: translateY(12px);
        pointer-events: none;
        transition: opacity 0.45s ease, transform 0.45s ease;
      }

      .social-proof-popup.show {
        opacity: 1;
        transform: translateY(0);
      }

      .social-proof-title {
        font-size: 14px;
        line-height: 1.45;
        font-weight: 600;
        margin: 0;
        color: #ffffff;
      }

      .social-proof-time {
        margin-top: 6px;
        font-size: 12px;
        color: #b9b9b9;
      }
    `;

    document.head.appendChild(style);
  }

  function ensurePopup() {
    if (activePopup) {
      return activePopup;
    }

    const popup = document.createElement('div');
    popup.className = 'social-proof-popup';
    popup.innerHTML = `
      <p class="social-proof-title"></p>
      <div class="social-proof-time"></div>
    `;

    document.body.appendChild(popup);
    activePopup = popup;
    return popup;
  }

  function hidePopup() {
    if (!activePopup) {
      return;
    }
    activePopup.classList.remove('show');
  }

  function showPopup() {
    const popup = ensurePopup();
    const name = randomItem(customerNames);
    const product = randomItem(productNames);
    const time = randomItem(timeTexts);

    const titleEl = popup.querySelector('.social-proof-title');
    const timeEl = popup.querySelector('.social-proof-time');

    titleEl.textContent = `🔥 ${name} vừa mua ${product}`;
    timeEl.textContent = time;

    popup.classList.add('show');

    if (hideTimer) {
      clearTimeout(hideTimer);
    }

    hideTimer = setTimeout(hidePopup, VISIBLE_DURATION);
  }

  function scheduleNext() {
    setTimeout(function () {
      showPopup();
      scheduleNext();
    }, randomDelay());
  }

  function init() {
    injectStyles();
    ensurePopup();
    scheduleNext();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
