---
type: work-package
id: "WEB-WP-001"
status: "완료"
area: "WEB"
---

# `WEB-WP-001` · 실행 앱 배치와 화면 책임 분리

- Outcome: 세 실행 앱과 Web 화면·기능·공통 책임을 찾기 쉽게 배치하고 기존 동작을 유지한다.

## 범위

- 포함: apps/web·apps/backend·apps/ml 경로 이동, Web app/pages/features/shared 배치, App 화면 조립과 PetHealthDashboard 상태·지표·기록·모달 분리, 관련 import·실행문서·검증 갱신.
- 제외: 새 라우터·dependency·TypeScript·디자인·기능·API 계약 변경, backend/ml 내부 분해, DB 스키마 변경, 실제 DB/AI·과금·개인 Data 호출, 팀 upstream 변경.
- Writer: Main은 app/pages·배치/import·공통 설정·문서·work-status 소유. Dashboard Writer는 features/pets/dashboard만, 검증 Writer는 Web tests만 소유하며 같은 파일 동시 수정 금지.
- 전달: 단계별 local commit. 원격 전달은 해당 최신 사용자 승인과 실제 Runtime 허용 범위를 별도로 확인한다.
- Stage 하나는 독립적으로 검증할 최종 결과이며 아래 Task는 같은 worktree에서 이어지는 local commit 단위다. 후속 미병합 Stage를 임의 생성하지 않는다.

## 완료 조건

- 세 실행 앱 경계·dependency·상대 backend→ml 경로 유지.
- app/pages/features/shared에 실제 사용 파일을 배치하고 빈 미래 폴더·호환용 중복 정본 없음.
- activeTab 화면 전환·OAuth/인증 만료·pet 전환·진단 race/사진 결속·기존 DOM/CSS/API 계약 유지.
- 기존 Web 회귀와 관련 추가 검증·build·lint 확인, 기존 lint 문제와 새 문제 구분.
- 모의 API로 주요 영향 화면·Dashboard 상태/모달을 브라우저 검증하고 실제 DB/AI 미검증을 명시.
- 전체 diff·Secret·작업 문서 링크/ID/상태 확인과 모든 Task·Gate 통과.

<a id="web-wp-001-s01"></a>

## `WEB-WP-001-S01` · 검증된 앱 배치와 Web 책임 분리

- [x] 상태: `완료`

### Tasks

<a id="web-wp-001-t01"></a>

- [x] `WEB-WP-001-T01` (`T-01`): `통과` · 앱 경로 이동과 기존 build/lint/회귀 기준 확보
  - 완료 확인: 앱 code bytes·실행 설정 보존, 기존 검사 결과와 현재 경로 일치.

<a id="web-wp-001-t02"></a>

- [x] `WEB-WP-001-T02` (`T-02`): `통과` · app wiring·페이지 조립·기능/공통 경계 배치
  - 완료 확인: activeTab 분기와 props·인증/race guard·CSS/DOM 유지, 관련 build·회귀 통과.

<a id="web-wp-001-t03"></a>

- [x] `WEB-WP-001-T03` (`T-03`): `통과` · Dashboard 실제 책임 분리
  - 완료 확인: 펫 선택·지표·기록·모달·localStorage 상태가 동일한 사용자 흐름으로 동작.

<a id="web-wp-001-t04"></a>

- [x] `WEB-WP-001-T04` (`T-04`): `통과` · 브라우저·회귀·문서와 전체 변경 검토
  - 완료 확인: 영향 화면·모달·인증/진단 회귀·build·lint·링크 검증 근거 및 미검증 범위 기록.

<a id="web-wp-001-g01"></a>

### `WEB-WP-001-G01` · 구조와 동작 보존 Gate

- [x] 상태: `통과`
- 기준: 전체 Task 통과, 기존 UI/계약 보존, 영향받는 검증과 전체 diff·Secret 확인.
- 확인한 증거: [최종 회귀·UI·범위 검증](evidence.md#최종-회귀ui범위-검증)과 앞선 앱·App·Dashboard 보존 결과. 전체 Task·diff·Secret·문서 관계 확인 통과.
- 남은 조건: 없음. 실제 DB/AI·외부 통합은 제외 범위이며 검증 한계를 Evidence에 기록.
