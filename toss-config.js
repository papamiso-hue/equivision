/* =====================================================================
   토스페이먼츠 설정 — store.html, success.html 이 함께 사용합니다.

   ■ clientKey : 지금은 토스 문서에 공개된 테스트 키입니다. (돈이 빠져나가지 않음)
                 나중에 토스 개발자센터의 '내 테스트 클라이언트 키'로 바꾸면
                 내 상점 관리자 화면에서 테스트 결제 내역을 볼 수 있습니다.
   ■ confirmUrl: Cloudflare Worker 를 만든 뒤에 채웁니다. 그 전까지는 비워 두세요.
                 예: 'https://equivision-pay.실제주소.workers.dev/confirm'
   ■ telegramBot: 봇의 @사용자명 (@ 빼고)

   ⚠️ 시크릿 키(test_sk_ / live_sk_), 텔레그램 봇 토큰은 절대 이 파일에 넣지 마세요.
   ===================================================================== */
window.TOSS_CONFIG = {
  clientKey: 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq',
  confirmUrl: '',
  telegramBot: 'EquivisionReportBot'
};
