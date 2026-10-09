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
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a') : null;
    if (!a) return;
    var h = a.getAttribute('href') || '';
    if (h.indexOf('t.me/') >= 0) send('c:tg:' + p);
    else if (h.indexOf('sample-report') >= 0) send('c:sample');
  }, true);
})();
