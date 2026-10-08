// 오늘 리포트 서비스워커: 앱 설치만 가능하게 하고, 리포트·로그인 정보는 저장(캐시)하지 않습니다.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function () { /* 네트워크 그대로 사용 */ });
