# 개인 포크 폴더와 문서 규칙

실행 앱은 `apps/web/`, `apps/backend/`, `apps/ml/`에 둔다. `supabase/`, 팀 제품 `docs/`와 README의 기여자·팀 이력은 보존한다. 이 배치는 별도 승인된 개인 포크 리팩터링이며 운영규칙 적용 자체가 앱 구조 재편 권한을 만들지는 않는다.

## 배치

| 위치 | 소유 내용 |
|---|---|
| root README.md | 기존 제품 소개와 개인 운영문서 진입 링크 |
| root AGENTS.md | 개인 작업 규칙 Router |
| docs/operations/ | 개인 Git·구조·확장·원본 대조·검증 기준 |
| root work-status/ | CURRENT projection, WP·Decision·Question·Checkpoint 정본 |
| .github/ | GitHub 표준 Issue/PR template와 PR 형식 검사 Workflow |
| scripts/·tests/ | 독립 운영 검사와 그 회귀 테스트 |

직접 정하는 폴더·문서는 lowercase kebab-case를 쓰되 `README.md`, `AGENTS.md`, 요청한 `CURRENT.md`·`DECISIONS.md`·`OPEN-QUESTIONS.md`·`WORK.md`·`HANDOFF.md`는 예외다. root Markdown은 README·AGENTS와 실제 도구가 요구하는 파일로 제한한다.

## 로컬 프로젝트 경로

- 개인 clone: `~/dev/projects/personal/petcare-refactored`.
- 향후 수동 worktree: `~/dev/worktrees/petcare-refactored/<type>/<task>`. 실제 생성은 해당 요청·Runtime 권한 안에서만 수행한다.
- GitHub 이름과 origin은 Hdev-x/petcare로 유지한다. 로컬 폴더 이름 변경을 remote rename으로 해석하지 않는다.

## 문서 역할과 생성 조건

- 작업 상태 collection은 repository root의 `work-status/`에 둔다. `docs/`는 제품·설계·운영규칙 문서를 소유하며 상태 collection을 중첩하거나 복제하지 않는다. 기존 상대 링크도 이 root 기준을 따른다.
- WP 정본은 `work-status/work/<area>/<wp-id>-<short-name>/plan.md`다. 세부 상태를 docs·CURRENT·Area index·Issue에 중복 저장하지 않는다.
- `evidence.md`와 `execution-packets/`는 [Work 규칙](../../work-status/work/README.md)의 실제 생성 조건에서만 추가한다.
- Area는 안정적인 책임 영역과 탐색 링크이며 상태를 갖지 않는다. collection README는 Record schema/template을 소유한다.
- 기존 제품 문서는 팀 출처와 사실을 보존한다. 개인 운영 판단을 팀 공식 규칙·API·DB·성능 판단으로 승격하지 않는다.
- 빈 폴더·추정 미래 Stage·WP별 소개 README·역관계 index·중복 상태판은 만들지 않는다.
- `worklogs/`는 첫 실제 비민감 기록과 함께 만들며 [HANDOFF의 선택 Worklog](../../work-status/HANDOFF.md#선택-worklog)를 따른다.
- `roadmap.md`는 WP 둘 이상을 함께 순서·의존성 관리할 때만 추가한다.
- 새로운 생성물은 실제로 생길 때 gitignore 필요성을 판단한다. 기존 환경 파일·dependency·build·local DB·cache·Secret은 추적하지 않는다.

## 제안 문서

미채택 아이디어·논의는 필요할 때 `docs/proposals/<topic>.md` 한 파일에 발전시킨다. 제목·상태/작성일/관련 문서·문제·제안/대안·영향/미결·결론/반영 링크를 둔다. 상태는 초안·검토 중·채택·일부 채택·보류·기각이다.

문서 존재나 채택 표시는 실행 승인 자체가 아니다. 채택 근거는 보존하고 확정 규칙은 운영 docs, 이유는 Decision, 실행은 WP에 반영한다. 명확한 질문의 차단 상태는 Question이 소유한다.

## 조건부 구조 확장

현재 PetCare의 세 실행 경계와 앱별 dependency를 유지한다. 독립 실행·dependency 분리·공유 code 문제로 새 구조가 필요하고 요청 범위에 포함된 때만 검토한다. WYBU Electron·npm workspaces·Context Runtime 경로, WikiBU, `<git-common-dir>/wybu/` Store는 PetCare에 도입하지 않는다.
