---
type: decision
id: "D-001"
status: "활성"
created_at: "2026-10-02"
authority: personal
applies_to:
  - "OPS"
---

# `D-001` · 개인 포크 운영규칙 적용

## 결정

사용자 요청에 따라 확인된 Hdev-x/petcare 개인 포크의 별도 clone에 WYBU 공통 운영규칙을 PetCare 상태에 맞게 적용한다. 팀 원본과 기존 private work-status를 보존한다.

## 이유

CURRENT·Work·Decision·Question·Handoff의 역할과 작업·Git·검증·갱신·범위관리 절차를 개인 프로젝트에서도 일관되게 사용할 필요가 있다.

## 영향

[운영 대조표](../../docs/operations/rule-mapping.md)에 그대로/수정/제외 이유를 남기고 [AGENTS](../../AGENTS.md)와 연결된 schema를 사용한다. 제품 제약·Runtime·Hook·기존 WYBU 상태는 복제하지 않는다. 이 결정은 commit·push·PR·merge·권한·팀 변경 승인이나 영구 제품 방침이 아니다.
