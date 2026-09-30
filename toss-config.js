/* =====================================================================
   토스페이먼츠 설정 — store.html, success.html 이 함께 사용합니다.

   ■ clientKey (클라이언트 키)
     - 브라우저에 공개되어도 되는 키입니다. 'test_ck_' 로 시작하면 테스트 모드입니다.
     - 아래 값은 토스페이먼츠 개발자 문서에 공개된 테스트 키입니다.
       토스페이먼츠 개발자센터(developers.tosspayments.com) → 내 개발정보 → API 키에서
       '내 상점의 테스트 클라이언트 키'로 바꾸면 테스트 결제 내역을 내 상점 관리자에서 볼 수 있습니다.
     - 실제 운영 시에는 'live_ck_' 키로 바꿉니다. (통신판매업 신고번호 + confirmUrl 필요)

   ■ ⚠️ 시크릿 키(test_sk_ / live_sk_)는 절대 이 파일에 넣지 마세요.
     GitHub에 올리는 순간 누구나 볼 수 있고, 남이 결제 취소·조회를 할 수 있게 됩니다.

   ■ confirmUrl (결제 승인 서버 주소)
     - 토스 결제는 '인증' 후 10분 안에 서버가 시크릿 키로 '승인(confirm)'해야 최종 완료됩니다.
     - GitHub Pages에는 서버가 없으므로, 비어 있으면 테스트에서 '인증 완료'까지만 확인됩니다.
     - Cloudflare Worker 를 만든 뒤 주소 끝에 /confirm 을 붙여 넣으세요.
       예: 'https://equivision-pay.내아이디.workers.dev/confirm'

   ■ telegramBot (텔레그램 봇 사용자명, @ 없이)
     - 넣으면 결제 완료 화면에 [텔레그램에서 채널 참여하기] 버튼과 QR코드가 나타납니다.
       고객은 버튼 → 텔레그램 [시작] 만 누르면 초대 링크를 자동으로 받습니다.
       (텔레그램 사용자명을 몰라도 됩니다)
     - 예: 'EquivisionReportBot'
   ===================================================================== */
window.TOSS_CONFIG = {
  clientKey: 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq',
  confirmUrl: '',
  telegramBot: 'EquivisionReportBot'
};
