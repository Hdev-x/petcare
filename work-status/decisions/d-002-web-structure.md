---
type: decision
id: "D-002"
status: "활성"
created_at: "2026-10-03"
authority: personal
applies_to:
  - "WEB-WP-001"
---

# `D-002` · 기존 동작을 유지하는 앱·Web 책임 배치

## 결정

- 사용자에게 제안한 apps/web·apps/backend·apps/ml 실행 앱과 Web app/pages/features/shared 배치를 개인 포크에 적용한다.
- 기존 activeTab·JavaScript·CSS·API/인증/진단 계약을 유지한다. 기존 diagnosis 도메인 내부 경계도 보존한다.
- App은 공유 상태·연결, pages는 화면 조립, features는 실제 기능, shared는 실제 공통 UI·HTTP·스타일만 소유한다.

## 이유

- 사용자 승인된 구조 목표이며 큰 App·Dashboard의 서로 다른 책임을 검토 가능한 단위로 분리한다.

## 영향

- 현재 실행 경로·관련 import·문서·검증을 함께 갱신한다. 팀 기여·기존 제품 기록·DB migration 이력은 보존한다.
- 구조 결정은 원격 전달·팀 변경·보안/과금 권한을 만들지 않는다.
