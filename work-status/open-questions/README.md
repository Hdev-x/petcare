# Open Questions

이 폴더는 session을 넘어 보존해야 하는 미결 질문과 해결·폐기 이력을 Record 하나당 파일 하나로 관리합니다. 해결된 Question도 삭제하지 않고 상태와 해결 근거를 보존합니다.

## 이름과 상태

- 파일: `q-<number>-<short-name>.md`
- ID: `Q-001`
- 상태: `미결`, `해결`, `폐기`

`applies_to`는 질문이 영향을 주는 Area 또는 Work를 가리킵니다. 질문이 실제 진행을 막을 때만 `blocks`를 추가합니다.

Question을 해결할 때는 상태를 `해결`로 바꾸고 `resolved_by`에 Decision 하나를 기록합니다. `blocks`는 제거하지만 `applies_to`는 유지합니다. Decision에는 역방향 `resolves`를 저장하지 않습니다.

Question을 폐기할 때도 `blocks`는 제거하고 `resolved_by`는 두지 않습니다. 본문에 폐기 이유를 남기고 `applies_to`는 유지합니다.

## Question template

```markdown
---
type: question
id: "Q-001"
status: "미결"
created_at: "YYYY-MM-DD"
applies_to:
  - "AREA-WP-001"
---

# `Q-001` · Question title

## 질문

-

## 중요한 이유

-

## 판단에 필요한 근거

-
```

진행을 막는 질문에만 다음 field를 추가합니다.

```yaml
blocks:
  - "AREA-WP-001-S01"
```

해결할 때는 `blocks`를 제거하고 다음처럼 바꿉니다.

```yaml
status: "해결"
resolved_by: "D-001"
resolved_at: "YYYY-MM-DD"
```
