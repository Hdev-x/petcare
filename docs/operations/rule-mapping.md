# WYBU → PetCare 운영규칙 대조표

## 확인한 대상과 적용 범위

- 조회일: 2026-10-02 UTC. 기존 GitHub connector 인증 사용자: `Hdev-x`.
- 개인 저장소: [Hdev-x/petcare](https://github.com/Hdev-x/petcare), API `fork: true`, visibility `public`, default branch `main`.
- parent/source: [hat8532/petcare](https://github.com/hat8532/petcare). 개인 clone의 기준 HEAD: `5bc8bc2c2f93b110cd30db6a583e299bce0fb0f1`.
- 팀 로컬 origin은 hat8532/petcare, upstream 없음, branch docs/readme-image-crop, HEAD `e784db36f57efbd72bfdc391226063aab84d9844`, clean. 기존 private work-status의 dirty 3개는 보존한다.
- 새 개인 clone만 origin Hdev-x/petcare, upstream hat8532/petcare, 작업 branch docs/personal-operating-rules로 분리했다. 로컬 remote 추가는 팀 원본 수정이나 원격 push가 아니다.
- 운영규칙 원본: 사용자 지정 WYBU 개인 작업 경로 `wybu-dev`, 읽기 기준 main@`4a172b08e177cde8c85f97d471de7e20a47ffbb3` (clean). 같은 revision의 파일/구획을 아래 상대 locator로 표시한다.
- 기존 팀·WYBU·새 clone의 `.agents/skills`는 없었다. 전역 `.codex/AGENTS.md`, 팀 로컬 AGENTS의 정본/권한 경계, WYBU AGENTS와 직접 참조 운영문서를 확인했다. 새 clone에는 기존 AGENTS/CLAUDE/template/work-status 없음.
- 실제 운영문서·schema·template·제품 비의존 PR 검사만 적용한다. 앱 리팩터링·제품/임상 제약 복제·새 권한·승인 우회·팀 기록 삭제를 하지 않는다.
- 최초 초안은 로컬 적용까지만 승인됐으며 이후 사용자가 개인 포크의 PR·Squash merge·정리를 승인했다. 전달 상태는 Git/GitHub가 소유한다. 공개범위/권한 설정·다른 프로젝트·팀 원본·기존 private 상태는 변경하지 않는다.

## 원본별 판정

`그대로`는 운영 의미 또는 독립 파일을 보존한다는 뜻이다. 링크·진입 문서 이름 변경은 구조에 맞춘다. `수정` 행에는 유지할 의미와 변경/제외 이유를 함께 쓴다.

| 원본 locator·구획 | PetCare 반영 위치 | 판정 | 이유·보존한 내용 |
|---|---|---|---|
| AGENTS.md · 목표 | AGENTS.md#목표와-범위 | 수정 | 최소 검증 가능 변경 유지; WYBU prototype 제품 목표는 PetCare에 복사하지 않음 |
| AGENTS.md · 코드 영역 구분 | docs/operations/project-structure.md | 제외 | WikiBU 경로·박스 주석 강제는 WYBU 학습/제품 관례; 앱 소스 변경 요청 아님 |
| AGENTS.md · 컨텍스트 진입 | AGENTS.md#컨텍스트-진입 · work-status/CURRENT.md | 수정 | CURRENT 선확인·필요 문서만·drift 재확인·projection·Main 수동 갱신 유지; Runtime 자동저장 설명 제외 |
| AGENTS.md · 후보 기록과 승인 | AGENTS.md#목표와-범위 · work-status/DECISIONS.md | 수정 | 제안/확정 분리·증거/최신 대상·사용자 범위 유지; Context Pack/capture_context/receipt/CLI 후보 제출·shadow/review 저장은 제품 기능이라 제외 |
| AGENTS.md · 진행 브리핑 | AGENTS.md#진행-브리핑 | 그대로 | 정식 Task 우선·STEP 일회성·시작/종료·중간 최대 2항목·Gate와 실제 근거·완료 ID 보존 |
| AGENTS.md · 작업공간 | AGENTS.md#작업공간과-위임 · docs/operations/git-workflow.md | 수정 | 독립 Writer·동일 결과 재사용·main 확인용 유지; WYBU machine 경로를 portable ~/dev 관례로 변경; 최초 초안 clone 예외 외 Fast/Stage 수동 worktree, managed 명시 요청/등록 경로/도구 정리 유지 |
| AGENTS.md · 문서 라우팅 | AGENTS.md#문서-라우팅과-갱신 | 수정 | 필요 구획만 조회·상태/구조/Git Router 유지; Jev 전용 가이드 제외 |
| AGENTS.md · Git 권한 | AGENTS.md#git-권한 | 수정 | 로컬/PR/merge 단계 구분 유지; 전달 단계는 현재 사용자 요청으로 결정, 문서가 새 권한이나 검사 우회를 부여하지 않음 |
| AGENTS.md · 검증 | AGENTS.md#검증과-종료 | 그대로 | 관련 기존 검사·수동검증/미검증 보고·형식적인 CI/test 금지 |
| work-status/README.md · 읽는 순서·작업 경로·Work model | work-status/README.md · work-status/WORK.md | 그대로 | Fast/WP와 Roadmap→Area→WP→Stage(Task N+Gate); Stage/Fast별 branch/worktree/PR, Task별 아님 |
| work-status/README.md · ID·Front Matter | work-status/README.md · work-status/CURRENT.md | 수정 | 전체 ID·미사용 번호·필수 metadata·선택 field 생략·focus:null 유지; 사용자 요청 uppercase index 허용; Runtime UUID/enum 생성 제외 |
| work-status/README.md · 관계 정본 | work-status/README.md | 그대로 | area/depends_on/applies_to/supersedes/blocks/resolved_by/checkpoint_of/focus/resumes_from/target/produced와 한쪽 정본·존재/종류/중복/cycle 검증 |
| work-status/README.md · 상태·완료·작성 책임/보안 | work-status/README.md | 수정 | 한국어 상태·로컬 Gate 완료≠merge·one-PR 대기→완료·증거 재평가·Main 단일 Writer·비민감 기록; Runtime 검증 주장은 제외 |
| work-status/current.md · singleton projection | work-status/CURRENT.md | 수정 | 실제 PetCare focus:null·다음 Work 경계·범위/차단만 기록; WYBU CTX 작업/완료 상태 복제 금지 |
| work-status/work/README.md · 배치·문체 | work-status/work/README.md | 수정 | plan.md 정본·Area 탐색·필요한 evidence/packet·결과형/전체 ID 유지; Runtime parser와 legacy README 호환 설명 제외 |
| work-status/work/README.md · Plan/Stage/Task/Gate·체크리스트·Plan 양식 | work-status/work/README.md | 그대로 | Outcome·범위·완료·전체 ID/anchor·checkbox/상태·차단 영향·통과 근거·완료 역사 보존 및 복사용 template |
| work-status/work/README.md · Evidence | work-status/work/README.md | 수정 | 대상 Task/Gate·revision·관찰 시점·방법/결과/위치/한계·다른 revision 재평가 유지; 시각 예시는 UTC ISO 형식 |
| work-status/work/README.md · Execution Packet | work-status/work/README.md | 그대로 | exact target/revision/Writer/path/허용/제외/조건/중단/검증; 복잡한 전달 시만 생성, 권한 확대 아님 |
| work-status/decisions/README.md | work-status/decisions/README.md · work-status/DECISIONS.md | 수정 | 개별 Record·상태·supersedes/applies_to·이유/영향 유지; authority:personal로 팀 결정과 경계 표시 |
| work-status/open-questions/README.md | work-status/open-questions/README.md · work-status/OPEN-QUESTIONS.md | 그대로 | 미결/해결/폐기·실제 blocks만·resolved_by 정확히 하나·해결/폐기 뒤 blocks 제거·역관계 금지 |
| work-status/checkpoints/README.md | work-status/checkpoints/README.md · work-status/HANDOFF.md | 수정 | 미완료 Work의 clean full SHA 인계만·resumes_from 결속·사실 보존·CP만을 위한 commit 금지; Runtime history/formal checkpoint 제외 |
| worklogs/README.md | work-status/HANDOFF.md#선택-worklog | 수정 | 선택 append-only·날짜/entry ID·target/produced schema 보존. 첫 실제 Work 기록 때만 worklogs/README+daily log 생성; 지금 빈 폴더/임의 log 강제하지 않음 |
| work-status/roadmap.md · 기존 Area/WP/D/Q/CP/세션 로그 | work-status/WORK.md · work-status/work/ops/README.md | 제외 | 실제 WYBU Work·제품 상태·결정 이력 복제 금지. OPS만 개인 운영 Area로 만들고 Roadmap/WP는 필요가 생길 때 생성 |
| docs/git-workflow.md · 기본 원칙·순서·Branch·Commit | docs/operations/git-workflow.md | 수정 | 짧은 개인 main 기반 결과/Stage branch·기존 변경/remote 확인·검증·관련 파일만·공유 이력 보호; portable dev 경로와 현재 사용자 승인 범위에 맞춤 |
| docs/git-workflow.md · Issue·PR·Draft/Ready | docs/operations/git-workflow.md · .github templates | 그대로 | Issue 선택·WP 정본/Issue projection·Refs/Closes·결과 우선 본문·Draft 조건·빈 commit 금지 |
| docs/git-workflow.md · PR 자동검사 | docs/operations/git-workflow.md · scripts/pr-check.mjs | 수정 | Draft/Ready 형식 구분 유지; 형식 한계와 실제 원격 실행/required rule 조회를 구분; check 0개를 성공으로 표시하지 않음 |
| docs/git-workflow.md · Jev 보조 판단 | docs/operations/project-structure.md | 제외 | PetCare에 Jev/Context Runtime이 없고 제품 추가 요청 아님 |
| docs/git-workflow.md · Merge/정리·Worktree/병렬·확장 | docs/operations/git-workflow.md | 수정 | merge 요청 때 gate/review/check/target·Squash·clean/미전송/미반영 확인 후 정리·single writer 유지; 팀 규칙/remote settings 자동 적용 금지 |
| docs/project-structure.md · 원칙·역할·Markdown·제안·생성자료 | docs/operations/project-structure.md | 수정 | 상태와 docs 분리·collection schema·조건부 폴더/제안·생성물/Secret 보호; PetCare 서비스/팀 문서/기여 이력 유지 |
| docs/project-structure.md · 현재 monorepo·추가 분리 조건 | docs/operations/project-structure.md | 수정 | Electron/apps/desktop/packages/context-runtime/src entry/git-common-dir WYBU Store는 제외; 실제 필요에서만 구조 확장 |
| docs/workflow-evolution.md · 현재 Prototype 구성 | docs/operations/workflow-evolution.md | 수정 | PetCare 실제 서비스 존재·독립 PR 운영 template/check 적용에 맞춤; WYBU private queue 지원불가 문장은 복사하지 않음 |
| docs/workflow-evolution.md · 확장 조건·팀 보호·Bug/Feature/PR template·Merge Queue | docs/operations/workflow-evolution.md | 수정 | review/CI/security/performance/Project/CODEOWNERS/queue/release 조건부 원칙 유지; 확장 양식은 필요할 때 교체, 현재 활성화/권한/비용 승인으로 해석 금지 |
| .github/pull_request_template.md · .github/ISSUE_TEMPLATE/work.md | .github/pull_request_template.md · .github/ISSUE_TEMPLATE/work.md | 그대로 | 새 clone에 기존 template 없음; 제품 의존 없는 활성 일반 template 그대로 재사용, template 재사용 자체가 Issue 생성·외부 게시 승인을 뜻하지 않음 |
| scripts/pr-check.mjs · tests/pr-check.test.mjs | scripts/pr-check.mjs · tests/pr-check.test.mjs | 그대로 | Node builtin만 사용하는 독립 운영 검사; template과 함께 이식해 기존 7개 회귀 및 CLI 검증 가능, root package 추가 없음 |
| .github/workflows/pr-check.yml | .github/workflows/pr-check.yml | 수정 | read-only contents/pinned checkout/concurrency/timeout 유지; tests/*.test.mjs를 독립 tests/pr-check.test.mjs로 좁혀 WYBU Runtime/Store/Jev 의존 제거 |
| 기존 팀 petcare/AGENTS.md · work-status · docs/기여 기록 | AGENTS.md · docs/operations/ · 기존 파일 유지 | 수정 | 팀 권한 경계·정본/개인 상태 구분을 보존; 팀 로컬과 private 상태 3개 dirty를 읽기 전용으로 보호, 새 개인 상태와 혼합/복사하지 않음 |

## 완전성과 현재·조건부 구분

원본 Router, Work model·ID·관계·상태·template·Evidence·Packet·single writer, Decision/Question/Checkpoint/선택 Worklog, Git 전체 lifecycle·검사, 구조/제안/확장 조건을 대조했다. WORK는 단일 TODO로 축소하지 않는다. 현재는 Fast Path 하나이므로 불필요한 WP·Roadmap·CP·Worklog를 만들지 않는다.

게시 전 개인 main은 protected:false, effective rules는 빈 목록임을 읽기 조회했다. 이는 원격 검사 성공이 아니다. PR마다 실제 check·review·merge 상태를 확인하며 설정을 변경하지 않는다. 개인 포크 이후 팀의 모든 변경을 조회·동기화한 것은 아니다. [검증 기록](validation.md)의 실제 근거와 한계를 따른다.

## 원본 재사용 파일

PR template·Issue template·PR 검사 script·독립 test는 WYBU 기준 revision의 파일과 SHA-256이 동일하다. worktree managed 경계·충돌/소유권·main ff-sync·remote→worktree→local 정리도 추가 재대조했다. Workflow 차이는 test 대상 glob을 독립 파일로 바꾼 1줄뿐이다. WYBU 원본의 상태·제품 source·Runtime CLI/Hook/Store·tests 전체·root manifest는 이식하지 않았다.
