// 오늘 리포트 서비스워커: 앱 설치와 새 리포트 알림(푸시)을 받습니다. 리포트·로그인 정보는 저장(캐시)하지 않습니다.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function () { /* 네트워크 그대로 사용 */ });

// 알림 문구는 서버가 보낸 고정 문구('새 경주 리포트가 올라왔습니다 · 부산경남 4경주')만 보여 줍니다.
self.addEventListener('push', function (e) {
  var d = {};
  try { d = e.data ? e.data.json() : {}; } catch (err) { d = {}; }
  var title = (typeof d.title === 'string' && d.title) || 'EquiVision AI';
  var body = (typeof d.body === 'string' && d.body) || '새 경주 리포트가 올라왔습니다';
  e.waitUntil(self.registration.showNotification(title, {
    body: body, tag: typeof d.key === 'string' ? d.key : 'eq-report', renotify: true,
    icon: '/icon-192.png', badge: '/icon-192.png', vibrate: [200, 100, 200], data: { url: '/reports/' }
  }));
});
self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
    for (var i = 0; i < list.length; i++) { if (list[i].url.indexOf('/reports') >= 0 && 'focus' in list[i]) return list[i].focus(); }
    return self.clients.openWindow('/reports/');
  }));
});
