# PetCare Web

React·JavaScript·Vite 사용자 앱이다. repository root에서 `apps/web`로 이동해 실행한다.

## 실행과 검사

```bash
npm ci
npm run dev
npm run build
npm run lint
node --test tests/*.test.mjs
```

브라우저 회귀는 실제 App/Component와 모의 API를 사용한다. Playwright가 별도 Runtime에 있으면 `PLAYWRIGHT_MODULE`에 module file URL, `CHROME_EXECUTABLE`에 설치된 Chrome 실행 파일을 지정한다. 테스트를 위해 실제 Backend·DB·AI·계정을 실행하지 않는다.

## 파일 책임

- `src/app/`: activeTab·인증·선택 Pet 같은 앱 연결과 공유 상태, Navbar.
- `src/pages/`: 홈·진단·타임라인 등 화면 조립. 화면 전환 방식은 기존 activeTab을 유지한다.
- `src/features/`: 실제 인증·계정·Pet·진단·타임라인·병원·뉴스·커뮤니티·채팅 UI와 API.
- `src/shared/`: 공통 HTTP/session, Footer, 원래 CSS와 assets.
- `src/main.jsx`: React 진입점.

`VITE_API_BASE_URL`과 기존 API/인증 계약은 유지한다. Backend와 AI 실행은 [제품 README](../../README.md#실행-방법)를 따른다. 구조 목표·검증 근거는 [작업 계획](../../work-status/work/web/web-wp-001-frontend-structure/plan.md)에서 확인한다.
