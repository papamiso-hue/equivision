/* =====================================================================
   텔레그램 문의 버튼 (화면 오른쪽 아래에 떠 있는 버튼)
   index.html, store.html 이 함께 사용합니다.

   ■ CONTACT_TELEGRAM_URL : 문의를 받는 회사 봇 주소 (봇이 운영자에게 전달하고 답변을 되돌려 줍니다).
                            운영자 개인 텔레그램 주소·전화번호는 여기에 쓰지 않습니다.
                            비워 두면 버튼이 나타나지 않습니다.
   ===================================================================== */
(function () {
  var CONTACT_TELEGRAM_URL = 'https://t.me/EquivisionReport_bot?start=contact';
  var CONTACT_LABEL = '텔레그램 문의';

  if (!/^https:\/\/t\.me\/[A-Za-z0-9_+]{4,}(\?start=[A-Za-z0-9_]+)?$/.test(CONTACT_TELEGRAM_URL)) return;

  var css = document.createElement('style');
  css.textContent =
    '.tg-float{position:fixed;right:max(16px,env(safe-area-inset-right));bottom:max(16px,env(safe-area-inset-bottom));z-index:900;' +
    'display:inline-flex;align-items:center;gap:8px;background:#229ed9;color:#fff;text-decoration:none;font-weight:700;font-size:0.95rem;' +
    'padding:0.8rem 1.1rem;border-radius:999px;box-shadow:0 8px 20px rgba(0,0,0,.35);transition:background .2s,transform .2s}' +
    '.tg-float:hover{background:#1b87b9;transform:translateY(-2px)}' +
    '.tg-float:focus-visible{outline:3px solid #fff;outline-offset:3px}' +
    '.tg-float svg{width:22px;height:22px;fill:currentColor;flex:none}' +
    '@media (max-width:480px){.tg-float{padding:0.65rem 0.95rem;font-size:0.88rem;gap:6px}.tg-float svg{width:20px;height:20px}}' +
    '@media print{.tg-float{display:none}}';
  document.head.appendChild(css);

  var a = document.createElement('a');
  a.className = 'tg-float';
  a.href = CONTACT_TELEGRAM_URL;
  a.target = '_blank';
  a.rel = 'noopener';
  a.setAttribute('aria-label', CONTACT_LABEL + ' (새 창)');
  a.innerHTML =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.78 15.4l-.4 5.6c.57 0 .82-.25 1.12-.54l2.7-2.58 5.6 4.1c1.03.57 1.76.27 2.04-.95L24 3.4c.33-1.52-.55-2.12-1.55-1.75L1.1 9.8c-1.46.57-1.44 1.38-.25 1.75l5.5 1.72L19.1 6.2c.6-.38 1.15-.17.7.21z"/></svg>' +
    '<span>' + CONTACT_LABEL + '</span>';
  document.body.appendChild(a);
})();
