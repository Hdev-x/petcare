# Handoff Checkpoints

이 폴더의 tracked `CP-*`는 미완료 작업을 특정 clean commit에서 다른 session·사람에게 인계하기 위한 Handoff Checkpoint입니다. 생성 후 사실 기록을 바꾸지 않으며 대상 Work, full commit SHA, 검증 결과, 다음 행동이 모두 확인되고 미반영 변경이 없는 경우에만 만듭니다. Current에서 실제 재개할 때만 `resumes_from`으로 가리킵니다.

Current는 Main이 갱신하는 projection이며 CP와 역할이 다릅니다. PetCare에는 Runtime Message history·Source cursor·Formal Runtime Checkpoint가 없으며 이식하지 않습니다.

## 작성 시점

- 미완료 Stage를 다른 session·사람에게 인계하거나 의도적으로 중단하며, 특정 clean commit에서 재개해야 할 때 생성합니다.
- 완료된 Stage, 일반 commit, 같은 흐름으로 계속하는 작업에는 생성하지 않습니다.
- 미반영 변경이 있으면 Handoff Checkpoint를 만들지 않습니다. Checkpoint만 만들기 위해 commit하지 않고, `CURRENT.md`와 해당 WP에 Focus·다음 행동·차단 요소를 맞춥니다.
- 재개할 때 commit과 검증 결과를 다시 확인한 뒤에만 Current의 `resumes_from`으로 연결합니다.

## 이름

- 파일: `cp-<number>-<short-name>.md`
- ID: `CP-001`

## Handoff Checkpoint template

```markdown
---
type: checkpoint
id: "CP-001"
created_at: "YYYY-MM-DDTHH:mm:ssZ"
checkpoint_of: "AREA-WP-001-S01"
commit: "<full-commit-sha>"
---

# `CP-001` · Handoff checkpoint title

## 확인한 상태

- Worktree:
- 검증:
- 미반영 변경: 없음

## 다음 행동

1.
```

Secret, 원본 대화, Terminal 전체 출력은 저장하지 않습니다.
