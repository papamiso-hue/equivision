/* =====================================================================
   토스페이먼츠 설정 — store.html, success.html 이 함께 사용합니다.

   ■ clientKey : 토스 개발자센터의 '내 테스트 클라이언트 키' (test_ck_...)
                 Cloudflare 에 넣은 시크릿 키(test_sk_...)와 같은 세트여야 합니다.
   ■ confirmUrl: Cloudflare Worker 주소 + /confirm
   ■ telegramBot: 봇의 @사용자명 (@ 빼고)

   ⚠️ 시크릿 키(test_sk_ / live_sk_), 텔레그램 봇 토큰은 절대 이 파일에 넣지 마세요.
      GitHub에 올리면 누구나 볼 수 있습니다.
   ===================================================================== */
window.TOSS_CONFIG = {
  clientKey: 'test_ck_여기에_내_테스트_클라이언트키',
  confirmUrl: 'https://equivision-pay.여기에_내_workers_주소.workers.dev/confirm',
  telegramBot: 'EquivisionReportBot'
};
