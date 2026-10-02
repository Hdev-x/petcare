# 작업 상태 규칙

Repository root의 `work-status/`는 현재 Focus 또는 active Focus 없음, Work 계획, 누적 Decision·Question·Handoff Checkpoint의 정본입니다. Git과 GitHub는 파일 변경과 commit·push·PR·merge 상태를, 선택적 Worklog는 중요한 실행 이력을 소유합니다. PetCare에는 WYBU Runtime·Store가 없습니다.

미채택 아이디어·논의·변경안은 `docs/proposals/`에 보관하며 [제안 문서 규칙](../docs/operations/project-structure.md#제안-문서) 적용. 제안 자체는 Decision·실행 계획의 정본이나 실행 승인이 아님.

상태 collection의 위치는 root `work-status/`이며 `docs/` 아래로 옮기거나 중복 배치하지 않습니다. 설계·제품·운영규칙은 `docs/`, 실제 Work·Decision·Question·Checkpoint 상태는 이 폴더가 소유합니다.

## 읽는 순서

1. [CURRENT.md](CURRENT.md)에서 현재 Focus 또는 active Focus 없음과 다음 경계를 확인합니다.
2. active Focus가 있으면 연결된 WP의 `plan.md`에서 범위·Stage·Task·Gate를 확인합니다.
3. 필요한 Decision·Question·Handoff Checkpoint Record만 따라갑니다.
4. branch·diff·commit·PR·merge 상태는 문서가 아니라 Git과 GitHub에서 확인합니다.

`CURRENT.md`는 탐색용 projection이며 Task 상태의 두 번째 정본이 아닙니다. Task와 Gate 상태는 해당 WP의 `plan.md`에서만 바꿉니다. 다음 행동에는 현재 변경이 merge된 뒤에도 유효한 Project·Work 경계와 관찰 조건만 기록합니다. Commit·push·PR·merge·post-merge live smoke 같은 일회성 전달·검증은 session-local `STEP-*`와 Git·실행 evidence로 관리하며, 이를 닫기 위한 state-only PR을 만들지 않습니다.

## 작업 경로

- 읽기·조사·설명만 하는 요청: Git 작업공간과 작업 기록을 만들지 않습니다.
- 파일을 변경하는 요청: Fast Path 또는 WP Path를 선택한 뒤 branch와 worktree를 준비합니다.
- Fast Path: 하나의 명확한 결과를 한 PR로 끝내며 WP 문서를 만들지 않습니다.
- WP Path: 여러 session·Stage, 중요한 결정·질문·의존성·인계를 지속적으로 관리해야 할 때 사용합니다.

Fast Path가 진행 중 복잡해지면 현재 branch와 worktree를 첫 Stage로 승격하고, 남은 일만 Task로 등록합니다. 지나간 `STEP-*`를 소급해 Task로 만들지 않습니다.

## Work model

```text
Roadmap → Area → WP → Stage(Task N + Gate)
```

- Roadmap: 여러 WP의 순서나 의존성을 함께 봐야 할 때만 만드는 상위 계획이며 Stage·Task·Gate 상세 상태를 반복하지 않으며 WP 완료 체크는 정본에서 파생한 탐색 표시
- Area: WP를 찾기 위한 안정적인 책임 영역이며 상태를 갖지 않음
- WP: 하나의 의미 있는 Outcome과 범위·완료 조건을 보존하는 계획
- Stage: 독립적으로 검증하고 merge할 수 있는 결과 단위
- Task: Stage의 Gate 통과를 위한 유동적인 구현·문서·검증 Checklist이며 branch나 PR 단위가 아님
- Gate: Stage 결과를 PR로 제출할 수 있는지 확인하는 로컬 검증 경계

Stage·Task·Gate의 작성 형식과 계획 변경 시 보존 조건은 [Work 작성 규칙](work/README.md#planstagetaskgate)을 따릅니다.

WP 전체를 위한 장기 branch나 worktree는 만들지 않습니다. 파일을 변경하는 Stage 하나는 branch·worktree·PR 하나를 사용하고, 같은 Stage의 Task는 같은 worktree를 공유합니다. 동시에 수정하는 Writer는 worktree를 공유하지 않습니다. Fast Path도 branch·worktree·PR 하나를 사용합니다.

## ID와 Front Matter

- Area: `OPS`
- WP: `OPS-WP-001`
- Stage: `OPS-WP-001-S01`
- Task: `OPS-WP-001-T01`
- Gate: `OPS-WP-001-G01`
- Decision: `D-001`
- Question: `Q-001`
- Handoff Checkpoint: `CP-001`
- Worklog entry: `L-20260927-001`

새 ID는 template의 예시 값을 그대로 사용하지 않습니다. 해당 collection의 실제 Record를 검색해 다음 미사용 ID를 배정하고, WP 내부 Stage·Task·Gate와 날짜별 Worklog entry도 각각 해당 파일의 기존 ID를 확인합니다.

Area·WP·Decision·Question·Handoff Checkpoint Record 파일은 YAML Front Matter에 `type`과 전체 `id`를 기록합니다. 상태가 있는 Record는 `status`, 생성 시점을 보존해야 하는 Record는 `created_at`을 추가합니다. Current는 singleton이라 `id` 없이 `type`, `updated_at`, `focus`를 사용하며 active Work가 없을 때도 field를 생략하지 않고 `focus: null`로 기록합니다. 날짜별 Worklog는 `type`과 `date`를 쓰고 각 Entry의 전체 ID와 관계는 본문의 고정 metadata 형식을 따릅니다. 선택 관계가 없으면 빈 배열을 남기지 않고 field 자체를 생략합니다. Collection 규칙을 설명하는 `README.md`에는 Front Matter를 넣지 않습니다.

이 ID는 사람이 읽고 연결하기 위한 tracking ID입니다. Project identity는 실제 개인 repository 경계로 확인하며 각 Record에 반복하지 않습니다. Runtime UUID·Session ID·Event importer를 이 운영문서에서 생성하지 않습니다.

본문 제목과 다른 Record의 구조화된 참조에는 전체 ID를 사용합니다. 부모 WP가 같은 화면에 보이는 내부 목록에서는 `` `T-01` ``, `` `G-01` ``처럼 줄여 표시할 수 있지만, 기계가 읽는 metadata에는 축약형을 쓰지 않습니다. 한 WP 파일에 포함된 Stage·Task·Gate를 외부에서 연결할 때는 전체 ID가 있는 제목 또는 고정 anchor를 사용합니다.

Task·Step의 브리핑 선택·표시 방식은 [AGENTS의 진행 브리핑](../AGENTS.md#진행-브리핑) 소유. Session-local Step은 tracked Task 상태로 저장하지 않습니다. 전체 ID와 한국어 상태를 유지하고 예시 ID를 실제 Record로 복제하지 않습니다.

## 관계 정본

관계는 사실을 소유하는 Record 한쪽의 top-level field에 한 번만 기록합니다. 날짜 파일 안에 여러 Entry가 있는 Worklog만 [고정 Entry metadata 형식](HANDOFF.md#선택-worklog)을 사용합니다. 역관계는 검색이나 향후 importer가 계산합니다. 본문의 Markdown link는 사람이 이동하기 위한 navigation이며 구조화된 metadata와 충돌하면 metadata가 우선합니다.

| Field | 정본 방향 | 규칙 |
|---|---|---|
| `area` | WP → Area | WP마다 정확히 하나 |
| `depends_on` | 의존 WP → 선행 WP | 실제 비선형 선행 조건이 있을 때만 사용 |
| `applies_to` | Decision·Question → Area 또는 Work | 하나 이상의 적용 대상 |
| `supersedes` | 새 Decision → 이전 Decision | Decision을 실제로 대체할 때만 사용 |
| `blocks` | 미결 Question → 차단된 Work | 해결되면 제거 |
| `resolved_by` | 해결 Question → Decision | `status: 해결`일 때 정확히 하나 |
| `checkpoint_of` | Handoff Checkpoint → Work | Handoff Checkpoint마다 정확히 하나 |
| `focus` | Current → Work | active Focus 0..1개. 없으면 명시적 `null` |
| `resumes_from` | Current → Handoff Checkpoint | 해당 Handoff Checkpoint에서 실제 재개할 때만 사용 |
| `target` | Worklog entry → Work | 항목마다 주 대상 하나 |
| `produced` | Worklog entry → Decision·Question·Handoff Checkpoint | 해당 항목에서 만든 Record만 기록 |

`dependents`, `resolves`, `blocked_by`, `superseded_by` 같은 역방향 field는 저장하지 않습니다. Worklog의 `source_event`도 지금은 사용하지 않습니다. Git common directory의 local runtime Event는 clone마다 존재하지 않아 tracked 관계 target이 될 수 없기 때문입니다.

구조화된 관계는 다음 조건을 만족해야 합니다.

- target ID가 실제로 존재하고 허용된 Record 종류여야 합니다.
- 자기참조와 같은 field 안의 중복 target을 허용하지 않습니다.
- `depends_on`과 `supersedes`에는 직·간접 cycle이 없어야 합니다.
- `status: 해결`인 Question은 `resolved_by`가 정확히 하나이고, `status: 미결`인 Question에는 없어야 합니다.
- 해결된 Question은 `blocks`를 제거하고 `applies_to`는 유지합니다.
- `resumes_from`이 있으면 Current `focus`는 Work를 가리켜야 하며 Handoff Checkpoint의 `checkpoint_of`와 같아야 합니다.

PetCare에는 상태 Runtime validator가 없습니다. Main이 관계 target·종류·중복·자기참조·cycle·상태/checkbox·해결 관계를 수동 검증하며 PR 형식 검사 통과를 전체 관계 검증으로 해석하지 않습니다.

## 상태와 완료 시점

- WP·Stage: `대기`, `진행 중`, `일시정지`, `완료`, `취소`
- Task: `대기`, `진행 중`, `통과`, `차단`, `보류`, `취소`
- Gate: `대기`, `통과`, `차단`, `판단 불가`

Markdown에는 한국어 상태를 기록합니다. Runtime enum 변환을 전제하지 않습니다.

로컬 작업 완료와 GitHub 반영은 다음처럼 분리합니다.

1. Task `통과`: 구현과 해당 검증이 완료됨
2. Gate `통과`: 모든 Task, 로컬 검증, 전체 작업 diff와 secret 확인이 완료됨
3. Stage `완료`: Gate가 통과함
4. WP `완료`: 필수 Stage와 WP 완료 조건이 모두 충족됨
5. Ready PR check·review·Squash merge: 완료된 작업 결과를 `main`에 반영하는 GitHub 절차

한 PR에서 구현과 Task·Gate 검증을 모두 끝내는 Stage는 primary의 `대기` 상태에서 같은 diff의 `완료`로 직접 전이할 수 있습니다. 이 경우에도 모든 Task·Gate evidence를 먼저 확인하며, 상태만을 위한 선행 `진행 중` PR이나 merge 뒤 state-only PR을 만들지 않습니다.

개인 로컬 Gate 완료는 원격 반영·팀 승인·Release가 아닙니다. 사용자 승인된 단계까지만 전달합니다.

Gate 통과 후 작업 결과가 바뀌면 관련 Task와 Gate를 다시 평가합니다. PR check와 Squash merge 자체를 Gate 기준에 넣지 않으며, merge 후 상태만 고치는 별도 PR을 만들지 않습니다.

## 작성 책임과 보안

Main Agent 한 명이 `CURRENT.md`, WP, Decision 같은 공유 상태 문서를 갱신합니다. 병렬 Agent는 증거와 제안만 반환합니다.

Tracked Record와 Worklog에는 비민감 요약만 기록합니다. 원본 대화, Terminal 전체 출력, source code·diff 원문, secret, 개인정보는 저장하지 않습니다.

반복 Record의 규칙과 복사용 template은 각 collection README가 소유합니다.

- WP: [work/README.md](work/README.md)
- Decision: [decisions/README.md](decisions/README.md)
- Question: [open-questions/README.md](open-questions/README.md)
- Handoff Checkpoint: [checkpoints/README.md](checkpoints/README.md)
- Worklog: [HANDOFF의 선택 Worklog](HANDOFF.md#선택-worklog)

`roadmap.md`는 활성·예정 WP가 둘 이상이고 순서나 의존성 관리가 필요할 때만 추가합니다. PR 제출·병합 상태를 복제하는 Record나 별도 Milestone·Run·Attempt·Evidence Record collection은 실제 반복 문제를 해결할 때까지 추가하지 않습니다.

WP 내부의 선택적 `evidence.md`는 별도 Record collection이 아닌 검증 보조 문서이며 [Work 작성 규칙](work/README.md)을 따릅니다.
