/* =====================================================================
   토스페이먼츠 설정 — store.html, success.html 이 함께 사용합니다.

   ■ clientKey : 토스 개발자센터 '내 테스트 클라이언트 키' (test_ck_...)
                 Cloudflare 의 TOSS_SECRET_KEY(test_sk_...)와 같은 세트여야 합니다.
   ■ confirmUrl: Cloudflare Worker 주소 + /confirm
   ■ telegramBot: 봇의 @사용자명 (@ 빼고)

   ⚠️ 시크릿 키(test_sk_ / live_sk_), 텔레그램 봇 토큰은 절대 이 파일에 넣지 마세요.
   ===================================================================== */
window.TOSS_CONFIG = {
  clientKey: 'test_ck_Z1aOwX7K8mzdyYOJWj9P3yQxzvNP',
  confirmUrl: 'https://equivision-pay.papamiso.workers.dev/confirm',
  telegramBot: 'EquivisionReportBot'
};
