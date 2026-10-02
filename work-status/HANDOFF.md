# 인계와 선택 기록

## 현재 인계 상태

현재 생성된 CP 없음. 운영규칙은 독립 Fast Path 결과이며 Git 전달 상태는 실제 Git/GitHub에서 확인한다. dirty draft를 clean-commit Checkpoint로 표현하지 않는다.

전달받은 사람은 [CURRENT](CURRENT.md)와 Git branch·HEAD·status·remote·diff를 확인하고 [대조표](../docs/operations/rule-mapping.md)·[검증 기록](../docs/operations/validation.md)을 읽는다. 전달·기록이 commit·push·merge 승인이나 팀 수정 권한을 만들지 않는다.

## Handoff Checkpoint

[Checkpoint schema](checkpoints/README.md)를 따른다. 미완료 Stage를 다른 세션/사람에게 인계하거나 의도적으로 중단하며 대상 Work·full SHA·검증·미반영 변경 없음이 확인된 경우만 생성한다.

dirty 상태면 CP를 만들거나 CP만을 위해 commit하지 않고 CURRENT와 WP에 Focus·다음 경계·Blocker를 맞춘다. 실제 재개할 때 CP의 `checkpoint_of`와 CURRENT `focus`를 맞추고 `resumes_from`을 추가한다. 일반 완료·매 turn·자동저장 용도로 만들지 않는다.

## 선택 Worklog

Worklog는 Git/PR만으로 남지 않는 중요한 실행·실패·검증·인계를 날짜별 append-only로 보존한다. 상태 정본이 아니다. 현재는 대상 WP와 첫 실제 기록이 없어 worklogs 폴더를 만들지 않는다.

필요가 생기면 root `worklogs/README.md`에 아래 schema를 옮기고 첫 `YYYY-MM-DD.md`와 함께 만든다. 기존 entry는 고치지 않고 정정 entry를 덧붙인다. Main 단일 Writer이며 append 전후 exact 파일·기존 bytes prefix·추가 suffix·status를 확인한다.

```markdown
---
type: worklog
date: "YYYY-MM-DD"
---

# YYYY-MM-DD Worklog

<a id="l-yyyymmdd-001"></a>

## `L-YYYYMMDD-001` · 실행 결과

- `occurred_at`: `YYYY-MM-DDTHH:mm:ssZ`
- `target`: `AREA-WP-001-S01`
- `produced`: `D-001`, `Q-001`

### 요약

- 비민감 실행 요약

### 증거와 결과

- 대상 revision·방법·결과·근거 위치·한계

### 다음 행동

- 남은 실제 Work 경계
```

Entry ID는 날짜별 미사용 번호를 검색하고 lowercase anchor를 쓴다. target은 실제 Work 하나, produced는 해당 entry에서 만든 Record만 기록하며 없으면 줄을 생략한다. 다음 행동이 없으면 구획도 생략한다. 별도 날짜/relation index는 만들지 않는다. 원문 대화·Terminal 전체·source/diff 원문·Secret·개인정보는 저장하지 않는다.

Runtime Message history·Source cursor·Formal Runtime Checkpoint·Hook 자동 쓰기는 PetCare에 없으며 이식하지 않았다. 선택 Worklog·CURRENT·tracked CP를 그 기능의 대체 승인 체계로 사용하지 않는다.
