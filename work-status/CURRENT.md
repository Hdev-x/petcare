---
type: current
updated_at: "2026-10-03"
focus: "WEB-WP-001"
---

# PetCare 개인 현재 상태

## Focus

[WEB-WP-001 · 실행 앱 배치와 화면 책임 분리](work/web/web-wp-001-frontend-structure/plan.md). Task·Gate 상태의 정본은 WP다.

## 다음 행동

기준 검증과 앱·기능 경로 배치가 완료됐다. App 페이지와 기존 회귀 확인이 완료됐다. Dashboard 상호작용도 통과했다. 전체 모의 화면 비교와 마지막 diff·문서·브라우저 검증을 마무리한다.

## 차단과 범위

- 구현 차단 없음. 앱 경로와 Web 내부 구조만 변경하며 기존 화면·activeTab·API/인증·진단 계약을 유지한다.
- backend/ml 내부 기능·DB 스키마·실제 AI/DB·과금·개인 Data·팀 upstream·원격 설정은 범위 밖이다.
- commit·원격 전달은 현재 실제 사용자 요청의 대상·단계와 Runtime 허용 범위로 판단한다.
- 과거 운영규칙 적용의 로컬-only 제한은 이번 별도 구현 요청에 승계하지 않는다.

## 필요한 읽기

- [WORK](WORK.md) · [결정](DECISIONS.md) · [Git 규칙](../docs/operations/git-workflow.md)

Branch·HEAD·status·PR·merge는 실제 Git/GitHub에서 확인한다.
