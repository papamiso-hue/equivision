/* =====================================================================
   서버 설정 — store.html 이 사용합니다.

   ※ 2026-10-07: 카드·간편결제·자동결제(토스)는 사용하지 않습니다.
      결제는 계좌 입금(무통장입금)으로만 받으므로 토스 키는 없어도 됩니다.

   ■ confirmUrl  : Cloudflare Worker 주소 (끝의 /confirm 은 서버 주소를 알아내는 용도로만 씁니다)
   ■ telegramBot : 봇의 @사용자명 (@ 빼고)

   ⚠️ 시크릿 키, 텔레그램 봇 토큰, 계좌번호는 절대 이 파일에 넣지 마세요.
   ===================================================================== */
window.TOSS_CONFIG = {
  confirmUrl: 'https://equivision-pay.papamiso.workers.dev/confirm',
  telegramBot: 'EquivisionReport_bot'
};