# `WEB-WP-001` · 검증 근거

## 기준과 앱·Web 경로 이동

- 대상: `WEB-WP-001-T01` / `WEB-WP-001-G01`
- 기준: main `940b409`의 원본 Web, 경로 이동 `c13401d`와 이후 import-only 배치.
- 관찰일: 2026-10-03 (Asia/Seoul).
- 방법·결과: 별도 임시 원본 Web에서 기존 브라우저 회귀 76/76·build 통과, lint 오류 0·기존 경고 29개. 이동 후 Web build 통과, 생성 JS/CSS가 원본 build와 bytes 동일.
- 앱 보존: backend와 ml의 내부 code/설정 bytes와 형제 상대 경로 유지. 기존 두 alias reexport는 실제 구현으로 직접 연결.
- 근거: 기존 `apps/web/tests/` 두 회귀 파일, 실제 build 산출물 cmp. 상세 실행 로그는 저장소 밖 machine-local scratch에만 존재하며 다른 clone에서 접근 불가.
- 한계: 이 결과는 경로·import-only 시점의 근거다. 이후 App/Dashboard 변경은 별도 재검증하며 실제 DB·AI를 실행하지 않았다.

## 후속 Gate

아직 통과 전. App/Dashboard 구현 후 기존 회귀·추가 모의 브라우저·build/lint·전체 diff를 확인한다.

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
- 한계: 전체 UI 비교의 PNG 차이는 최종 검증에서 별도로 조사 중이며 아직 전체 Gate 통과로 표시하지 않는다. 기존 루틴 reset 특이 동작 등 기능은 구조 변경으로 수정하지 않았다.
