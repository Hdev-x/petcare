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
