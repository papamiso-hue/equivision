/* 방문·클릭 횟수만 세는 아주 작은 스크립트 (개인 정보·쿠키 없음) */
(function () {
  var API = 'https://equivision-pay.papamiso.workers.dev/hit';
  var p = (location.pathname.split('/').pop() || 'index.html').replace(/\.html$/, '') || 'index';
  if (['index', 'store', 'reports', 'success'].indexOf(p) < 0) return;
  function send(k) {
    try {
      var b = JSON.stringify({ k: k });
      if (navigator.sendBeacon) navigator.sendBeacon(API, new Blob([b], { type: 'text/plain' }));
      else fetch(API, { method: 'POST', body: b, keepalive: true, mode: 'no-cors', headers: { 'Content-Type': 'text/plain' } });
    } catch (e) { /* 집계가 안 돼도 사이트는 그대로 */ }
  }
  var today = new Date().toISOString().slice(0, 10), mark = 'eq_v_' + p, seen = false;
  try { seen = localStorage.getItem(mark) === today; if (!seen) localStorage.setItem(mark, today); } catch (e) { /* 저장이 막힌 브라우저는 매번 셈 */ }
  if (!seen) { send('v:' + p); if (p === 'store' && /[?&]ref=/.test(location.search)) send('v:store:ref'); }
  // 눌러 본 곳 (텔레그램 버튼 횟수는 더 이상 세지 않음)
  var BTN = { btnFree: 'c:free', btnPay: 'c:bank', btnSend: 'c:login' };   // 무료 신청 / 입금 신청 / 리포트 화면 인증번호 받기
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;
    var b = t.closest('button');
    if (b && b.id && BTN[b.id] && !b.disabled) { send(BTN[b.id]); return; }
    var a = t.closest('a');
    if (!a) return;
    var h = a.getAttribute('href') || '';
    if (h.indexOf('sample-report') >= 0) send('c:sample');
    else if (p === 'index' && /^(\.\/|\/)?store\.html/.test(h)) send('c:go:store');
  }, true);
})();