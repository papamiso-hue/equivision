/* =====================================================================
   홈 화면에 설치 버튼 (휴대폰 첫 화면에 EquiVision AI 아이콘 만들기)
   모든 페이지가 함께 사용합니다. 결제·가격·약관 문구와 관계없는 화면 도구입니다.
   - 안드로이드(크롬 등): 버튼을 한 번 누르면 설치 창이 뜹니다.
   - 아이폰(사파리): 자동 설치가 안 되어 '공유 → 홈 화면에 추가' 그림 안내를 보여 줍니다.
   - 카카오톡·네이버 앱 등 안에서 열었으면 기본 브라우저로 열도록 안내합니다.
   - 이미 설치해서 앱처럼 열었으면 아무것도 보이지 않습니다.
   ===================================================================== */
(function () {
  'use strict';

  function standalone() {
    try {
      return (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true;
    } catch (e) { return false; }
  }
  var DONE_KEY = 'eq_pwa_installed';
  function markInstalled() { try { localStorage.setItem(DONE_KEY, '1'); } catch (e) { /* 저장 불가여도 괜찮음 */ } }
  function wasInstalled() { try { return localStorage.getItem(DONE_KEY) === '1'; } catch (e) { return false; } }
  if (standalone()) { markInstalled(); return; }
  if (wasInstalled()) return;

  var HIDE_KEY = 'eq_pwa_hide_until';
  var HIDE_DAYS = 3;
  function hidden() {
    try { return Number(localStorage.getItem(HIDE_KEY) || 0) > Date.now(); } catch (e) { return false; }
  }
  function hideFor() {
    try { localStorage.setItem(HIDE_KEY, String(Date.now() + HIDE_DAYS * 86400000)); } catch (e) { /* 저장 불가여도 괜찮음 */ }
  }
  // 첫 화면에 오신 분께는 항상 보이도록 '닫기 후 숨김'을 쓰지 않습니다 (2026-11-05 대표 지시)

  var ua = navigator.userAgent || '';
  var isIOS = /iPhone|iPad|iPod/i.test(ua) || (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1);
  var isAndroid = /Android/i.test(ua);
  var isMobile = isIOS || isAndroid;
  var isKakao = /KAKAOTALK/i.test(ua);
  var inApp = isKakao || /NAVER\(inapp|NAVER|Instagram|FBAN|FBAV|Line\/|DaumApps|; wv\)/i.test(ua);

  var deferred = null;
  var bar = null;

  var css = document.createElement('style');
  css.textContent =
    '.pwa-bar{position:fixed;left:max(12px,env(safe-area-inset-left));right:max(12px,env(safe-area-inset-right));bottom:calc(max(12px,env(safe-area-inset-bottom)) + 64px);z-index:950;' +
    'display:flex;align-items:center;gap:14px;background:#101a2e;color:#fff;border:3px solid #4f7cff;border-radius:22px;padding:30px 18px 30px 20px;min-height:132px;box-shadow:0 10px 28px rgba(0,0,0,.45);' +
    'font-family:inherit;max-width:560px;margin:0 auto}' +
    '.pwa-txt{flex:1;min-width:0;line-height:1.35}' +
    '.pwa-txt b{display:block;font-size:1.4rem;line-height:1.3}' +
    '.pwa-txt span{display:block;font-size:1.1rem;color:#c9d4ee;margin-top:6px}' +
    '.pwa-btn{flex:none;min-height:84px;padding:0 22px;border:0;border-radius:16px;background:#4f7cff;color:#fff;font-size:1.4rem;font-weight:800;cursor:pointer;font-family:inherit}' +
    '.pwa-btn:active{filter:brightness(.9)}' +
    '.pwa-btn:focus-visible,.pwa-x:focus-visible{outline:3px solid #fff;outline-offset:2px}' +
    '.pwa-x{flex:none;width:44px;height:44px;border:0;border-radius:50%;background:transparent;color:#c9d4ee;font-size:1.6rem;cursor:pointer;font-family:inherit}' +
    '.pwa-modal{position:fixed;inset:0;z-index:1000;background:rgba(0,0,0,.7);display:flex;align-items:flex-end;justify-content:center}' +
    '.pwa-card{background:#fff;color:#111;width:100%;max-width:520px;border-radius:22px 22px 0 0;padding:22px 20px calc(22px + env(safe-area-inset-bottom));font-family:inherit}' +
    '.pwa-card h2{font-size:1.4rem;margin:0 0 12px;color:#111}' +
    '.pwa-card ol{margin:0 0 16px;padding-left:0;list-style:none}' +
    '.pwa-card li{display:flex;gap:12px;align-items:flex-start;font-size:1.2rem;line-height:1.45;margin-bottom:12px}' +
    '.pwa-card li i{flex:none;width:34px;height:34px;border-radius:50%;background:#4f7cff;color:#fff;font-style:normal;font-weight:800;display:flex;align-items:center;justify-content:center}' +
    '.pwa-card svg{width:1.3em;height:1.3em;vertical-align:-.25em;fill:none;stroke:#1a6bff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}' +
    '.pwa-card .pwa-btn{width:100%;background:#1a2a55}' +
    '@media print{.pwa-bar,.pwa-modal{display:none}}';
  document.head.appendChild(css);

  var SHARE_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12M8 7l4-4 4 4M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/></svg>';

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function closeModal() {
    var m = document.querySelector('.pwa-modal');
    if (m) m.remove();
  }

  function modal(title, stepsHtml, extra) {
    closeModal();
    var m = el('div', 'pwa-modal');
    m.setAttribute('role', 'dialog');
    m.setAttribute('aria-modal', 'true');
    var c = el('div', 'pwa-card');
    c.appendChild(el('h2', '', title));
    var ol = el('ol', '', stepsHtml);
    c.appendChild(ol);
    if (extra) c.appendChild(extra);
    var ok = el('button', 'pwa-btn', '확인했어요');
    ok.type = 'button';
    ok.addEventListener('click', closeModal);
    c.appendChild(ok);
    m.appendChild(c);
    m.addEventListener('click', function (ev) { if (ev.target === m) closeModal(); });
    document.body.appendChild(m);
    ok.focus();
  }

  function step(n, html) { return '<li><i>' + n + '</i><div>' + html + '</div></li>'; }

  function showIOS() {
    modal('아이폰에 설치하는 방법',
      step(1, '화면 아래(또는 위)의 <b>공유 버튼</b> ' + SHARE_SVG + ' 을 누릅니다.') +
      step(2, '목록을 올려서 <b>「홈 화면에 추가」</b>를 누릅니다.') +
      step(3, '오른쪽 위 <b>「추가」</b>를 누르면 끝! 첫 화면에 아이콘이 생깁니다.'));
  }

  function showAndroidManual() {
    modal('휴대폰에 설치하는 방법',
      step(1, '크롬 화면 오른쪽 위 <b>점 세 개(⋮)</b> 메뉴를 누릅니다.') +
      step(2, '<b>「홈 화면에 추가」</b> 또는 <b>「앱 설치」</b>를 누릅니다.') +
      step(3, '<b>「설치」</b>(또는 「추가」)를 누르면 끝! 첫 화면에 아이콘이 생깁니다.'));
  }

  function showInApp() {
    var extra = null;
    if (isKakao) {
      extra = el('button', 'pwa-btn', '기본 브라우저로 열기');
      extra.type = 'button';
      extra.style.marginBottom = '10px';
      extra.addEventListener('click', function () {
        location.href = 'kakaotalk://web/openExternal?url=' + encodeURIComponent(location.href);
      });
    }
    modal('기본 브라우저에서 열어 주세요',
      step(1, '지금 화면은 앱 안의 간이 화면이라 설치가 되지 않습니다.') +
      step(2, '오른쪽 위(또는 아래) <b>메뉴(⋮ 또는 …)</b>에서 <b>「다른 브라우저로 열기」</b>를 누릅니다. ' + (isIOS ? '(아이폰은 사파리)' : '(안드로이드는 크롬)')) +
      step(3, '열린 화면에서 다시 <b>「홈 화면에 설치」</b>를 눌러 주세요.'), extra);
  }

  function onInstallClick() {
    if (inApp) { showInApp(); return; }
    if (deferred) {
      var p = deferred;
      deferred = null;
      try {
        p.prompt();
        if (p.userChoice && p.userChoice.then) {
          p.userChoice.then(function (r) { if (r && r.outcome === 'accepted') { markInstalled(); removeBar(); } });
        }
      } catch (e) { showAndroidManual(); }
      return;
    }
    if (isIOS) { showIOS(); return; }
    showAndroidManual();
  }

  function removeBar() {
    if (bar) { bar.remove(); bar = null; document.body.style.paddingBottom = ''; }
  }

  function showBar() {
    if (bar || standalone()) return;
    bar = el('div', 'pwa-bar');
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', '홈 화면에 설치');
    var t = el('div', 'pwa-txt', '<b>휴대폰 첫 화면에 아이콘 만들기</b><span>버튼을 한 번 누르면 됩니다</span>');
    var b = el('button', 'pwa-btn', '홈 화면에 설치');
    b.type = 'button';
    b.addEventListener('click', onInstallClick);
    bar.appendChild(t);
    bar.appendChild(b);
    document.body.appendChild(bar);
    document.body.style.paddingBottom = '240px';
  }

  window.addEventListener('beforeinstallprompt', function (ev) {
    ev.preventDefault();
    deferred = ev;
    showBar();
  });
  window.addEventListener('appinstalled', function () { markInstalled(); deferred = null; removeBar(); closeModal(); });

  function start() {
    // 휴대폰에서는 항상 버튼을 보여 주고, 컴퓨터에서는 설치 가능 신호(beforeinstallprompt)가 올 때만 보여 줍니다.
    if (isMobile) showBar();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      try { navigator.serviceWorker.register('/sw.js').catch(function () {}); } catch (e) { /* 등록 실패해도 사이트는 그대로 동작 */ }
    });
  }
})();
