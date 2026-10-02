# `WEB-WP-001` · 검증 근거

## 기준과 앱·Web 경로 이동

- 대상: `WEB-WP-001-T01` / `WEB-WP-001-G01`
- 기준: main `940b409`의 원본 Web, 경로 이동 `c13401d`와 이후 import-only 배치.
- 관찰일: 2026-10-03 (Asia/Seoul).
- 방법·결과: 별도 임시 원본 Web에서 기존 브라우저 회귀 76/76·build 통과, lint 오류 0·기존 경고 29개. 이동 후 Web build 통과, 생성 JS/CSS가 원본 build와 bytes 동일.
- 앱 보존: backend와 ml의 내부 code/설정 bytes와 형제 상대 경로 유지. 기존 두 alias reexport는 실제 구현으로 직접 연결.
- 근거: 기존 `apps/web/tests/` 두 회귀 파일, 실제 build 산출물 cmp. 상세 실행 로그는 저장소 밖 machine-local scratch에만 존재하며 다른 clone에서 접근 불가.
- 한계: 이 결과는 경로·import-only 시점의 근거다. 이후 App/Dashboard 변경은 별도 재검증하며 실제 DB·AI를 실행하지 않았다.


## App 페이지와 기존 인증·진단 회귀

- 대상: `WEB-WP-001-T02` / `WEB-WP-001-G01`.
- 대상 상태: apps/web/src/app/App.jsx와 7개 페이지 추출, 기존 2개 Web 회귀의 경로/observer boundary 갱신 시점.
- 방법·결과: 기존 전역 hooks·callback·OAuth·Navbar·Pet 모달 연결 원문 비교 동일, 화면 JSX/style는 콜백 prop 치환만. App 805→353줄. Web build 통과와 기존 인증·진단 브라우저 회귀 76/76 통과(실패·skip 0).
- 테스트 계약: 실제 authApi·HTTP guard·Login fixture는 mock Component observer로 바꾸지 않았다. 진단 API만 기존과 동일한 메모리 mock이며 race/이미지/실패저장 검증 의미 유지.
- 한계: Dashboard의 새 카드·모달 상호작용과 전체 실제 화면 검증은 다음 항목에서 별도 확인. 외부 Data/Provider/DB는 호출하지 않았다.

## Dashboard 상태와 UI 책임 분리

- 대상: `WEB-WP-001-T03` / `WEB-WP-001-G01`.
- 대상 상태: features/pets/dashboard 10개 파일, 진입 2,815→295줄, 상태 hook·카드/차트·기록·루틴/일정 modal.
- 방법·결과: 실행문/effect/handler·파생값과 공개 props, 13개 UI subtree를 확장한 JSX AST가 원본과 동일. 독립 재검토 P0/P1 0·group 누락 0. 끝 공백만 정리해 base 전체 diff check 통과.
- 모의 브라우저 회귀: 전체 화면·login/logout·Pet 전환/profile 저장·quick/bulk/chart·루틴·일정·등록/수정·subtab/mock chat 8/8 통과. 같은 fixture의 원본도 8/8 통과. 실제 계정/API/DB/AI 사용 없음.
- 한계: 기존 루틴 reset 특이 동작 등 기능은 구조 변경으로 수정하지 않았다. 전체 UI 비교의 초기 차이와 최종 결과는 아래에 구분한다.

## 최종 회귀·UI·범위 검증

- 대상: `WEB-WP-001-T04` / `WEB-WP-001-G01`.
- 검증 대상: 앱 구현 `5bfaae9`와 동일한 최종 소스, `apps/web/tests/full-app.test.mjs` SHA-256 `98cdbe2642487eafb7d9033eca0d72f223e96802094b28937b3fee2a8d673e61`, 같은 diff의 실행·상태 문서.
- 관찰일: 2026-10-03 (Asia/Seoul).
- 회귀: 실제 기존 인증·진단 76/76 통과·실패/skip 0. 기존 assertion 본문 bytes 동일. 전체 App 모의 상호작용 8/8을 원본과 현재에서 확인하고 최종 파일 8/8 재실행 통과. 차트 지표 선택은 실제 SVG curve 존재/부재로 검증.
- build/lint: 최종 `npm run build` 통과(63 modules), `npm run lint` 오류 0·기존 경고 28개·신규 경고 0개. 원본 경고 29개 중 미사용 상수 1개가 추출 과정에서 제외됐고 나머지는 유지. dependency·lockfile 변경 없음.
- UI 비교: 모의 API·고정 시간·1440×1000에서 14개 화면/상태의 DOM·element 위치·선별 computed style 동일. 최종 상세 비교 11개 화면의 HTML·text node/Range 위치·PNG 동일, 나머지 Dashboard 저장/차트/펫 수정 3개 상태도 앞선 고정 캡처에서 PNG 동일.
- 초기 관찰 보존: 첫 비교의 scroll/animation 차이를 확인한 뒤 캡처 조건을 고정했다. 그 뒤 홈 문자 1,634 pixel·Dashboard RGB 1 pixel 차이가 남았으나 앱 코드 수정 없이 상세 재촬영에서 사라졌다. 정확한 raster 원인은 특정하지 않았고 최초/후속 비교 증거를 보존했다.
- 실제 Vite 브라우저: 홈·Dashboard·빠른 기록 modal·진단 화면을 눈으로 확인하고 Navbar 이동·modal 취소 확인. page error·Vite overlay·미정의 mock 호출 없음. 검증용 서버·브라우저 종료.
- 구조·범위: App 페이지 props/JSX, Dashboard effect/handler·파생값·13 UI subtree AST 원본 일치. backend 121·ml 27·supabase 3개 파일 보존 확인(gradlew.bat checkout 줄바꿈만 동일 의미로 대조). HTTP bytes와 API/인증/진단 계약 유지. 독립 검토 P0/P1 0.
- 문서·운영: 현재 실행 경로·README·앱 책임 문서 갱신, 상대 링크/anchor·Record ID/관계·상태/checkbox 일관성 확인. 전체 변경 diff·Secret·추적 생성물 확인. `node --test tests/pr-check.test.mjs` 7/7 통과.
- 근거 위치: 재실행 가능한 3개 `apps/web/tests/*.test.mjs`와 root `tests/pr-check.test.mjs`. 상세 로그·원본 임시 복사본·스크린샷·AST 비교 JSON은 저장소 밖 machine-local scratch에 보존하며 다른 clone에서 접근 불가.
- 한계: 실제 Backend·DB·AI·OAuth provider·지도/CDN 통합과 임상 성능은 실행하지 않았다. 모의 UI 회귀는 이 외부 통합의 성공 증거가 아니다. 팀 checkout·기존 private work-status dirty 3개·WYBU·Kopang 변경 없음.
