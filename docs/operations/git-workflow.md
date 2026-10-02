# 개인 포크 Git 작업 규칙

대상은 [Hdev-x/petcare](https://github.com/Hdev-x/petcare)이며 [팀 원본](https://github.com/hat8532/petcare)의 Git 규칙·권한·설정을 변경하지 않는다. 다음 절차는 [AGENTS](../../AGENTS.md)의 사용자 승인 범위까지만 실행한다.

## 기본 원칙과 Branch

- 개인 포크 기본 branch는 main, 작업 branch는 `<feat|fix|chore|docs>/<최대-세-단어>`다. 영역·WP별 장기 branch를 만들지 않는다.
- 수정 전 `git status --short`, `git diff`, `git worktree list`, `git remote -v`를 확인한다.
- origin은 Hdev-x/petcare, upstream은 hat8532/petcare다. remote 이름만 믿지 않고 URL·owner·대상 branch를 재확인한다.
- 개인 clone은 `~/dev/projects/personal/petcare-refactored`, 새 수동 worktree는 `~/dev/worktrees/petcare-refactored/<type>/<task>`에 둔다. 로컬 이름이 달라도 GitHub 저장소 이름은 petcare다.
- 기본 main은 확인·최신화 전용. Fast Path 또는 파일 변경 Stage마다 branch·격리 worktree 하나를 사용한다. 처음 작성한 운영규칙 초안의 독립 clone checkout은 초기 보존 예외이며, 이후 파일 변경은 Fast/Stage별 수동 worktree를 기본으로 한다.
- 같은 Stage의 Task는 같은 공간을 사용한다. 다른 Writer는 별도 공간·경로를 사용하며 같은 파일을 동시에 수정하지 않는다. 선행 결과에 의존하는 Stage는 앞선 PR이 개인 main에 merge된 뒤 최신 origin/main에서 시작한다. merge가 이번 요청 밖이면 해당 의존 실행을 진행하지 않는다.
- fetch 후 최신 origin/main을 기준으로 시작한다. upstream을 가져오거나 병합하는 일은 개인 변경과 팀 변경의 영향을 판단한 해당 요청에서 수행한다.

```bash
# 개인 clone에서 remote와 기존 변경을 확인한 뒤 실행하는 예시
# 현재 Runtime의 쓰기 허용 여부를 확인한 뒤 사용할 개인 worktree 기본 경로
WORKTREE_PARENT="$HOME/dev/worktrees/petcare-refactored"
# 실제 값·branch 이름·기존 worktree를 확인하고 같은 결과의 공간은 재사용한다.
git fetch origin
mkdir -p "$WORKTREE_PARENT/docs"
git worktree add --no-track -b docs/example "$WORKTREE_PARENT/docs/example" origin/main
```

## 승인된 단계의 작업 순서

1. 연속 작업인지 독립 결과인지 확인하고 Fast/WP를 선택한다. 읽기만 하는 요청에는 branch·기록을 만들지 않는다.
2. 개인 작업공간에서 해당 결과·Stage만 변경한다.
3. 관련 검증·전체 diff·Secret·상태 일관성을 확인한다.
4. commit 요청이 있으면 status·전체 diff·staged diff 확인 후 관련 파일만 commit한다.
5. push·PR 요청이 있으면 origin owner·head·base 확인 후 첫 push에 upstream tracking을 설정하고 Draft/Ready PR을 만든다.
6. merge 요청이 있으면 Ready·검증·review·자동검사·전체 diff를 확인하고 개인 포크에 Squash merge한다.
7. merge·clean·미전송/미반영 변경 없음 확인 뒤 허용된 branch/worktree만 정리한다.

이 lifecycle은 매 작업의 현재 사용자 요청에 포함된 단계까지만 실행한다. 문서가 commit·push·merge 승인이나 공개범위·Ruleset·팀 원본 수정 권한을 부여하지 않는다.

## Commit

- 복구·검토 가능한 단위로 관련 파일만 포함한다. Secret·개인 환경·생성물·다른 사람의 변경을 포함하지 않는다.
- 공유 history rebase·amend·force push 금지. 미전송·미반영 변경을 삭제하지 않는다.
- Squash merge 제목은 GitHub 기본 `<PR 제목> (#번호)`를 사용한다. PR 제목에 번호를 미리 넣지 않는다.

## Issue

모든 작업에 Issue를 강제하지 않는다. Fast backlog는 Issue, WP 계획·상태는 WP 정본이다. WP Issue는 탐색·논의 projection이다.

[작업 template](../../.github/ISSUE_TEMPLATE/work.md)은 backlog·범위 논의·재현 정리·여러 PR 묶음에만 사용한다. WP 링크를 두되 Task 상태를 복제하지 않는다. 관련 Issue는 `Refs #번호`, 마지막 구현 PR만 `Closes #번호`로 연결한다.

## Pull Request

[활성 PR template](../../.github/pull_request_template.md)을 사용한다. 제목은 `feat|fix|chore|docs: 짧은 결과`다.

- 요약은 `> **결과:** 내용`, WP면 같은 blockquote에 전체 Stage ID와 Gate를 연결한다.
- 주요 변경은 독자가 이해할 결과를 굵은 분류·중첩 목록으로 작성하고 상위 분류 사이 빈 줄을 둔다.
- 변경 이유는 기존 문제·제약에서 필요성으로 이어지는 실제 목록으로 작성한다.
- 검증 방법과 결과는 각각 중첩 목록으로 분리한다. 확인 Checkbox는 실제 충족한 경우만 체크한다.
- 단순 Fast/한 세션 Stage는 구현·최소 검증 후 Ready가 기본이다. 여러 세션·인계·충돌/의존 조기 공유·실제 CI 이득이 있을 때 Draft를 쓴다.
- Draft·백업만을 위한 빈 commit 금지. 본문은 template을 유지하고 완료 뒤 Ready로 전환한다.

## PR 자동검사

[Workflow](../../.github/workflows/pr-check.yml)는 [검사 script](../../scripts/pr-check.mjs)와 [독립 테스트](../../tests/pr-check.test.mjs)만 실행한다. root package나 WYBU Runtime·Store·Jev 테스트를 요구하지 않는다.

- Draft: 제목·heading 존재/순서·요약 card·목록 여백 검사, 진행 중 값 허용.
- Ready: 채워진 결과·굵은 분류와 중첩 내용·이유 목록·검증 방법/결과·필수 확인 완료 검사.
- 로컬: `node --test tests/pr-check.test.mjs`, PR event JSON 검사: `node scripts/pr-check.mjs <event-json-path>`.
- 형식 검사는 사실·제품 동작·Secret·승인·범위 적합성을 판정하지 않는다. 실패를 수정하고 기준을 우회·삭제·완화하지 않는다.
- 원격 Actions 실행·required check·Ruleset 상태는 PR 제출/merge 시 실제 GitHub 조회로 확인한다. 워크플로 파일의 존재나 등록 check 0개를 원격 검사 성공·merge 보호로 해석하지 않는다.

## Merge와 정리

명시적 해당 merge 요청에서만 개인 포크 base main·의도한 head·Ready·전체 diff·Secret과 검증 결과를 확인한다. 해결되지 않은 review 의견이 없어야 하며 변경 관련 기존 build·test와 PR 형식 검사가 존재하면 required 지정 여부와 무관하게 통과해야 한다. 추가 required check도 실패·대기·불명확하면 merge하지 않는다. 미실행 검증을 통과로 간주하지 않는다. Squash 방식은 개인 운영 관례이며 원격 설정을 바꾸지 않는다.

완료 branch는 재사용하지 않는다. clean·merge·미전송 변경 없음 확인 후 Git 도구로 worktree를 제거한다. Squash로 `branch -D`가 필요해도 실제 PR merge와 미반영 변경 없음 증거가 먼저다. 디렉터리를 먼저 삭제하지 않는다. 충돌은 최신 main 반영 뒤 재검증하며 공유 history를 다시 쓰지 않는다.

## Worktree·충돌 방지와 종료 lifecycle

- 한 Fast Path 또는 파일 변경 Stage에 branch·worktree·PR 하나, 같은 Stage Task는 같은 공간, Writer마다 별도 공간과 소유 경로를 사용한다. WP 전체 장기 branch와 Task별 branch를 만들지 않는다.
- 신규 Codex managed worktree는 해당 작업의 명시 요청이 있을 때만 생성한다. 이미 연결된 같은 결과의 managed worktree는 등록 경로에서 재사용하고 임의 이동·재생성하지 않는다. 정리는 Codex app의 관리 도구를 사용한다.
- 수동 worktree 경로는 `~/dev/worktrees/petcare-refactored/<type>/<task>`다. 같은 결과의 기존 공간을 우선 재사용한다.
- 선행 Stage의 결과가 필요하면 선행 PR이 개인 main에 merge된 뒤 최신 origin/main에서 시작한다. 공용 Contract·root 설정·Lockfile·work-status·Worklog는 Main 단일 Writer다.
- 필요한 최신 main 반영은 fetch 후 merge로 수행하고 충돌 해결 뒤 영향받은 검증을 다시 실행한다. 공유 history rebase·amend·force push 금지. worktree 자체가 코드 충돌을 방지하지는 않는다.

승인된 Squash merge 뒤 아래 순서로 정리한다. 하나라도 미확인 또는 미반영 변경이 있으면 정리를 중단한다.

1. 실제 PR merged·Squash SHA·의도한 head를 확인한다. 작업공간의 clean·미전송/미반영 변경 없음을 확인한다.
2. 기본 clone을 main으로 전환하고 origin fetch 후 `git merge --ff-only origin/main`으로 동기화한다. local main=origin/main과 clean을 확인한다. main이 diverged면 reset하지 않고 원인을 확인한다.
3. 개인 origin의 이번 remote branch가 남아 있으면 삭제한다. 팀 upstream에는 삭제·push하지 않는다.
4. 이번 수동 worktree는 `git worktree remove <path>`로, managed worktree는 app 관리 도구로 정리한다. 기본 clone은 제거하지 않는다.
5. 마지막으로 이번 local branch를 삭제한다. Squash 때문에 `branch -D`가 필요하면 실제 merged PR·최종 head·변경 반영·미전송 없음 근거를 먼저 확인한다.
6. `git status`, `git branch`, `git worktree list`로 이번 결과 외 작업이 보존됐는지 확인한다. Squash된 branch는 후속 작업에 재사용하지 않는다.

## 규칙 확장

[확장 기준](workflow-evolution.md)의 실제 필요가 생긴 경우만 CI·CODEOWNERS·Ruleset·Project·merge queue·release 구조를 검토한다. 검토나 문서 기록은 실행 승인·설정 변경이 아니다.
