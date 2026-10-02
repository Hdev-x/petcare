# Decisions

이 폴더는 합의된 작업 운영 결정과 이유를 Record 하나당 파일 하나로 누적합니다. 변경되거나 폐기된 Decision도 삭제하지 않고 상태와 대체 관계를 보존합니다. 현재 실행 절차의 정본은 Decision이 연결한 `docs/` 규칙입니다.

개인 결정에는 `authority: personal`을 기록하며 팀 승인·권한을 부여하지 않습니다. 사용자 요청과 기존 확정 근거 안에서만 기록합니다.

## 이름과 상태

- 파일: `d-<number>-<short-name>.md`
- ID: `D-001`
- 상태: `활성`, `대체됨`, `폐기`

새 Decision이 이전 Decision을 대체하면 새 파일의 `supersedes`가 이전 ID를 가리키고 이전 파일의 상태를 `대체됨`으로 바꿉니다. 이전 파일에 `superseded_by`는 저장하지 않습니다.

`applies_to`는 Decision이 적용되는 Area 또는 Work의 전체 ID를 기록합니다. Decision이 해결한 Question은 각 Question의 `resolved_by`가 정본이며 Decision 본문의 역링크는 탐색용입니다.

## Decision template

`type`, `id`, `status`, `created_at`, `applies_to`는 필수입니다. 실제로 이전 Decision을 대체할 때만 선택 field인 `supersedes`를 추가합니다.

```markdown
---
type: decision
id: "D-001"
status: "활성"
created_at: "YYYY-MM-DD"
authority: personal
applies_to:
  - "AREA-WP-001"
---

# `D-001` · Decision title

## 결정

-

## 이유

-

## 영향

-
```

대체 Decision에는 다음 field를 추가합니다.

```yaml
supersedes:
  - "D-000"
```
