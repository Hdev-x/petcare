# PetCare 개인 포크 작업 규칙

이 규칙은 Hdev-x 개인 포크의 운영 절차다. 팀 원본의 기여자·제품 문서·공식 결정과 수정 권한을 대체하지 않는다.

## 목표와 범위

- 현재 요청을 만족하는 최소 검증 가능 변경부터 수행한다. 미래 구조·도구를 미리 추가하지 않는다.
- 로컬 변경 승인과 commit·push·PR·merge·배포 승인을 구분한다. 문서·역할·Checklist·Packet은 권한을 만들지 않는다.
- 팀 원본, 다른 프로젝트, 별도 private work-status의 기존 변경은 보존한다. 개인 포크 작업을 팀 승인으로 해석하지 않는다.
- 현재 작업의 허용·제외 범위는 [CURRENT](work-status/CURRENT.md)와 실제 사용자 요청을 함께 확인한다.

## 컨텍스트 진입

1. 새 세션·복귀·재개 시 [CURRENT](work-status/CURRENT.md)의 Focus 또는 active Focus 없음·다음 행동·차단 요소를 확인한다.
2. Git branch·HEAD·status·worktree·origin/upstream을 확인한다. 상태 문서와 다르면 실질 판단 전에 차이를 보고한다.
3. active Focus와 관련·충돌·의존하는 WP·Decision·Question만 읽는다. 연결 문서의 재귀적 전체 열람을 요구하지 않는다.
4. 실제 코드·Git·GitHub·실행 결과는 사실의 근거다. 팀 공식 제품·API·DB 문서는 팀 정본이고 개인 운영 문서는 개인 실행만 소유한다.
5. 요청·Focus·외부 변경 가능성·상태 보고·인계·PR·merge 판단이 바뀌면 CURRENT와 영향받는 정본을 다시 확인한다.
6. `.agents/skills`와 해당 경로의 기존 AGENTS가 있으면 필요한 규칙을 먼저 확인한다. 존재하지 않는 도구·Runtime을 전제하지 않는다.

## 진행 브리핑

- 정식 WP Task가 있으면 WP 전체 ID·Stage 문맥·대상 Task·Gate를 먼저 표시한다. 같은 실행에 STEP을 중복 사용하지 않는다.
- 정식 Task 없는 여러 단계 실행만 session-local `STEP-01`부터 표시한다. 단순 질의·한 단계 실행은 제외한다. 같은 실행의 사용자 입력 대기 뒤 재개만 ID를 유지하고 완료·취소·보류 뒤 폐기한다. 다음 요청·Task·세션으로 승계하지 않는다.
- 필수 context 확인 후 첫 task-specific 읽기·쓰기·명령 전에 해당 Task·Gate 또는 전체 Step Checklist를 공개한다. Step은 개별 명령이 아닌 검증 가능한 결과 단위다.
- 시작·종료에는 요청 범위 전체, 중간에는 직전 완료 1개와 현재 항목 1개만 보고한다. 실제 검증 근거가 있어야 완료 표시한다.
- 차단·보류·취소는 이유·영향·재개 조건을 보고한다. 계획 변경 이유를 남기고 완료 ID·의미·증거를 소급 변경하지 않는다.
- Gate는 시작·종료와 상태 변경 시 Checklist 아래 별도 한 줄로 표시하고 통과 근거 또는 차단·판단 불가 이유를 붙인다. 변화 없는 중간 보고에서는 생략한다. WP·Stage 문맥이 명확한 채팅만 T-01/G-01 축약을 쓰고 문서·metadata·전환 시 전체 ID를 쓴다.
- ID는 inline code, 상태·설명은 한국어로 쓴다. 새 근거 없는 진행을 만들어 표현하지 않으며 60초 이상 조용히 작업하지 않는다.

## 작업공간과 위임

- 수정 전 status·전체 diff·worktree를 확인한다. 기존 staged·unstaged·untracked 파일을 임의 복원·삭제·덮어쓰지 않는다.
- 기본 main은 확인용이다. Fast Path 또는 WP Stage마다 작업 branch와 독립 worktree를 사용한다. 이번 최초 운영규칙 초안은 승인된 별도 clone의 기존 checkout을 보존한 초기 예외다. 이후 Fast/Stage 파일 수정은 수동 worktree를 기본으로 한다.
- 같은 결과의 기존 작업공간을 재사용하고 Task마다 branch·worktree를 만들지 않는다. 새 경로는 현재 허용된 작업공간 안에서 정한다.
- 개인 clone은 `~/dev/projects/personal/petcare-refactored`, 새 수동 worktree는 `~/dev/worktrees/petcare-refactored/<type>/<task>` 관례를 사용한다. 경로 관례는 Runtime 쓰기 권한을 만들지 않으며 실제 허용 범위를 먼저 확인한다.
- 신규 Codex managed worktree는 해당 작업에서 사용자가 명시적으로 요청한 경우만 생성한다. 기존 같은 결과의 managed worktree는 반환된 등록 경로에서 계속 사용하고 임의 이동·재생성하지 않는다. 수동 worktree는 dev 경로 관례를 따른다.
- Main이 범위·의존성·Writer 경로를 지정한다. 같은 파일 동시 수정 금지, 공유 work-status와 Worklog, 공용 Contract·root 설정·Lockfile은 Main 단일 Writer다. worktree는 파일을 분리할 뿐 충돌을 없애지 않으므로 소유 경로·의존 순서와 작은 결과 단위를 유지한다.
- 독립 조사·검토의 실질 이득이 있을 때 위임한다. 반환된 증거는 Main이 원문·명령으로 재확인한 뒤 통합한다.
- 위임은 Runtime 권한이나 사용자 범위를 넓히지 않는다. Subagent의 추가 위임은 Main의 명시적 지시가 있을 때만 한다.

## 문서 라우팅과 갱신

- 한 번의 독립 결과는 Fast Path, 여러 세션·Stage·지속적인 결정·질문·인계는 WP Path다.
- 상태 생성·갱신 전에 [상태 규칙](work-status/README.md)과 해당 collection 규칙을 읽는다.
- [WORK](work-status/WORK.md) → [Work schema](work-status/work/README.md)에서 Stage·Task·Gate·Evidence·Packet을 관리한다.
- 확정 개인 판단은 [DECISIONS](work-status/DECISIONS.md), 미확정·팀 확인은 [OPEN-QUESTIONS](work-status/OPEN-QUESTIONS.md)에 둔다.
- Focus·다음 경계·Blocker가 바뀌면 Main이 CURRENT를 갱신한다. Task·Gate 정본은 WP 하나이며 CURRENT는 projection이다.
- 변경된 Stage와 CURRENT는 같은 diff에서 맞춘다. 완료·원격 반영·Release를 혼동하지 않는다.
- 인계·선택 Worklog는 [HANDOFF](work-status/HANDOFF.md)를 따른다. dirty draft를 clean-commit Checkpoint로 표현하지 않는다.
- 폴더·제안·생성자료는 [폴더 규칙](docs/operations/project-structure.md), Git·template·CI는 [Git 규칙](docs/operations/git-workflow.md)과 [확장 기준](docs/operations/workflow-evolution.md)을 따른다.

## Git 권한

- 명시적 파일 변경 요청은 해당 결과에 필요한 가역적 로컬 branch·작업공간·수정·검증만 승인한다.
- commit·push·PR·merge는 현재 사용자 요청에 포함된 대상과 단계까지만 수행한다. 같은 승인을 다시 묻지 않는다.
- `PR까지`는 해당 commit·push·PR과 검사 통과에 필요한 변경을 포함하되 merge·검사 우회·기준 완화는 제외한다.
- `merge까지`는 해당 PR의 Gate·review·check 확인과 merge를 포함한다. clean·merge·미전송 변경 확인 후에만 정리한다.
- force push, 공유 이력 reset·rebase·amend, 타인 branch 수정은 하지 않는다.
- 배포·운영 DB·사용자 Data·Secret·Permission·비용·외부 메시지는 요청된 정확한 대상·행동과 Runtime 허용 범위 안에서만 수행한다.

## 검증과 종료

- 변경에 관련된 기존 build·test·lint를 실행한다. 문서 변경은 링크·schema·ID·상태·diff·Secret과 운영 검사를 확인한다.
- PR 검사: `node --test tests/pr-check.test.mjs`. 검사 성공은 제품 동작·임상 성능·보안·팀 승인 증거가 아니다.
- Gate·완료는 실제 근거로 판정한다. 실패·미검증·다른 revision의 증거를 현재 통과로 바꾸지 않는다.
- 종료 시 필요한 상태만 갱신하고 변경 파일·검증·한계·남은 차단을 한국어로 간결히 보고한다.
