# 운영규칙 적용 검증

아래 최초 적용·배치·위치 이동은 PR 게시 이전의 역사 검증이다. 당시 로컬-only 범위를 현행 Git 권한으로 승계하지 않는다. 공개 기록의 경로는 portable 예시로 일반화했고 exact machine-local 원자료는 저장소 밖에서 보존한다.

## 대상과 관찰

- 관찰일: 2026-10-02 UTC.
- 대상: Hdev-x/petcare@`5bc8bc2c2f93b110cd30db6a583e299bce0fb0f1` 기반 `docs/personal-operating-rules` 로컬 초안.
- 허용 경로: AGENTS·docs/operations·work-status·.github 운영 template/Workflow·독립 scripts/pr-check.mjs와 tests/pr-check.test.mjs·README 운영 링크.
- 변경 파일 24개: 기존 README는 원래 bytes 전체를 보존한 채 개인 운영 링크만 append했고, 나머지 23개는 새 운영파일이다. 앱 source·manifest·lockfile·제품 docs는 수정하지 않았다.

## 검증 결과

| 검증 | 확인한 근거·결과 |
|---|---|
| GitHub identity·포크 | 기존 connector login Hdev-x, API fork:true, parent/source hat8532/petcare, public, default main |
| PR 검사 회귀 | `node --test tests/pr-check.test.mjs` 7/7 통과; Draft/Ready·placeholder·숨겨진/중복 heading·목록 형식·입력 validation |
| 실제 CLI | active template Draft exit 0, 미완성 Ready exit 1, 채워진 Ready event exit 0; 임시 fixture는 저장소 밖에서 생성/정리 |
| 문서 링크·anchor | Markdown 21개, 상대 링크 65개와 명시/heading anchor 확인, 누락 0; 수정 이후 최종 재확인 |
| 실제 ID·관계·상태 | CURRENT focus:null, resumes_from 없음; OPS Area 상태 없음; D-001 활성·personal→OPS 실제 target 존재; 미생성 WP/Q/CP/Worklog를 실제 Record로 계산하지 않음 |
| 원본 의미 완전성 | 원본 핵심 구획 36행 대조; Fast/WP·전체 Work 계층·schema/template·한쪽 관계·증거·갱신·단일 Writer·Git/검증/확장 경계 포함 |
| 독립 검토 후 보완 | STEP 수명/Gate 표시·선행 Stage merge 순서·기존 검사/미해결 review merge 조건·조건부 main 보호 복원; Ruleset 상태 미확인 문구 정정 |
| PR 파일 재사용 | template 2개·script·test가 원본과 SHA-256 동일; Workflow는 test glob을 독립 파일로 좁힌 1줄 차이 |
| 기존 팀 보존 | 팀 추적 파일 225개 SHA-256·branch/HEAD·status/diff 동일, clean 유지 |
| 기존 private 상태 보존 | work-status 추적 파일 61개 SHA-256·branch/HEAD·status/diff 동일; 기존 dirty 3개 bytes/diff 유지 |
| WYBU 읽기 전용 | 추적 파일 118개 SHA-256·branch/HEAD·status/diff 동일, clean 유지 |
| 변경 범위·전달 상태 | 24개 모두 허용 운영 경로; staged 파일 0; HEAD 유지; commit·push·PR·merge 없음; whitespace 검사 오류 없음 |

전체 ID·순환/중복·Question 해결·checkpoint-focus 결속 규칙은 schema에 보존했다. 이번 실제 관계는 D-001→OPS 하나와 focus:null뿐이며 가상의 template Record를 검증 완료로 주장하지 않는다. 향후 실제 WP/Question/Checkpoint 생성·변경 시 해당 관계·checkbox를 다시 검증한다.

## 검증 재현

- PR 검사: repository root에서 `node --test tests/pr-check.test.mjs`.
- 실제 event 형식: `node scripts/pr-check.mjs <event-json-path>`; JSON은 pull_request.title/body/draft를 사용한다.
- 변경범위: `git status --short`, `git diff --name-only`, `git ls-files --others --exclude-standard`, `git diff --cached`, `git diff --check`.
- 새 문서도 전체 파일과 상대 링크/anchor·Front Matter/실제 target·상태/checkbox를 직접 확인한다. git diff만으로 untracked 파일 검토를 생략하지 않는다.
- 전후 보존은 해당 source의 branch·full SHA·status와 추적 파일 SHA-256/diff digest를 비교한다. Secret·원문 Terminal·private 상태 원문은 운영 기록에 복제하지 않는다.

## 한계와 남은 범위

로컬 운영규칙 적용 차단 없음. commit·push·PR·merge·원격 Actions·Ruleset/공개범위/권한 변경은 요청 범위 밖이며 수행하지 않았다. 제품 build/test/E2E·DB/AI/외부 Provider 실행도 수행하지 않았고 과거 팀 검증 결과를 현재 통과로 승격하지 않는다.

PR 형식 검사는 실제 결과의 진실성·Secret·제품 안전·팀 권한을 증명하지 않는다. 원격 보호/CI 설정은 미확인이다. tracked CP를 만들지 않았고 로컬 초안을 원격 반영 완료로 표현하지 않는다.

## 후속 root 배치·참조 점검 (2026-10-02)

- 최신 사용자 범위: 문서 배치/참조와 로컬 검증만. 기존 24개 미커밋 운영파일은 이번 실행 시작 시 이미 존재한 초안으로 구분했다.
- 실제 위치: repository root의 `work-status/`. 중첩 상태 폴더와 활성 예전 배치 참조는 없어서 파일 이동·새 파일 생성 없이 유지했다.
- 이번 수정: `docs/operations/project-structure.md`, `work-status/README.md`의 root 역할 명확화, `work-status/CURRENT.md`의 최신 요청 범위, 이 검증 기록의 append.
- 유지: AGENTS/제품 README의 실제 root 링크, Work/Decision/Question/Handoff 기록 경로, PR/Issue 양식, PR 검사 script/test/Workflow.
- 검증: Markdown 21개·상대 링크/anchor 65개 오류 0, 활성 old 경로 검색 0, CURRENT focus:null와 Work 정본 일관, 추가/삭제/이동 0, 스냅샷 대비 위 4개 파일만 변경. 나머지 기존 파일은 bytes 동일.
- 형식 검사: 양식·checker가 변경되지 않아 재실행하지 않았다. 위 7/7 결과는 앞선 운영규칙 적용 때의 근거이며 이번 실행의 새 결과로 계산하지 않는다. 앱 build·전체 history/archive 검사는 실행하지 않았다.
- Git: branch/HEAD 유지, staged 0, 기존 dirty 상태 유지. commit·push·PR·merge·팀/WYBU/코팡 수정 없음.

## 개인 clone 위치 이동 (2026-10-02)

- 사용자 승인에 따라 일반 clone 전체를 `~/dev/projects/personal/petcare-refactored`로 이동했다. 자체 .git이며 추가 linked worktree·core.worktree override 없음 확인 후 같은 filesystem에서 directory rename으로 이동했다. 대상이 미존재일 때만 진행했고 덮어쓰지 않았다.
- 이전 `task-3/petcare-personal (이동 전 local 작업 위치)`은 이동 전의 역사적 locator다. 앞선 기록·대조·검증 내용과 task 폴더의 machine-local evidence JSON은 원래 위치에 보존한다. 현재 작업 경로로 사용하지 않는다.
- 향후 수동 worktree 기본 경로는 `~/dev/worktrees/petcare-refactored/<type>/<task>`이며 이번에 새 worktree를 생성하지 않았다. 경로 관례는 권한 부여가 아니다.
- branch docs/personal-operating-rules·HEAD 5bc8bc2c2f93b110cd30db6a583e299bce0fb0f1·origin Hdev-x/petcare·upstream hat8532/petcare·staged 0·기존 dirty 상태와 Git config/HEAD/index bytes를 보존했다.
- 현재 경로/요청 범위 문구만 AGENTS·git-workflow·project-structure·CURRENT에 갱신하고 이 기록을 append했다. 기존 파일 248개가 모두 이동했고 위 5개 의도된 운영문서 외 나머지 243개는 bytes 동일, 추가/삭제 파일 0이다. root work-status 배치와 링크/anchor 65개를 유지했다.
- 원격 rename·commit·push·PR·merge·앱 source 변경 없음. 양식/checker가 같아 focused test·앱 build·전체 history/archive 검사를 반복하지 않았다.

## 공개 PR 제출 전 재검증 (2026-10-02)

- 현재 사용자 요청은 개인 포크 Hdev-x/petcare의 Draft PR→Ready 검증→Squash merge→main 동기화→이번 branch/worktree 정리까지 포함한다. 팀 upstream·보안/권한 설정·공개범위·remote 이름은 변경하지 않는다.
- 기존 24개 운영 변경을 결과 하나로 유지하고 개인 절대경로를 portable dev 예시로 정리했다. 상세 PR/Issue 양식·checker·focused test는 원본과 동일하며 기준을 축약하거나 완화하지 않았다.
- worktree Fast/Stage 단위·단일 Writer·선행 Stage 순서·managed 명시 요청/경로 재사용/도구 정리·main ff-sync·remote→worktree→local 종료 순서를 대조했다.
- 제출 전 로컬 focused test 7/7, 문서 21개·상대 링크/anchor 65개 오류 0, 실제 상태/관계·전체 운영 diff·민감정보 검토와 독립 재검토 P0/P1=0을 확인했다. 원격 check·review·Squash·최종 main 상태는 실제 PR/Git 기록에서 확인하며 미실행을 성공으로 표시하지 않는다.
- 제품 build/E2E·DB/AI 호출·전체 history/archive 재검사는 수행하지 않는다. 기존 팀/별도 개인 상태/WYBU는 읽기 전용으로 보존한다.
