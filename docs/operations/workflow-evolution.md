# Workflow 확장 기준

## 현재 적용과 상태

- 개인 main + 짧은 Fast/Stage branch·격리 작업공간·PR·Squash 관례.
- PR template 1개, 선택 작업 Issue template 1개, PR 형식 검사 script·독립 회귀 테스트·Workflow 1개.
- 원격 검사 실행과 보호 설정은 해당 PR·branch의 실제 상태로 판단한다. template/Workflow 파일만으로 자동 보호를 주장하지 않는다.
- 제품 테스트·CI·Ruleset·권한·공개범위는 이번 변경에서 추가하거나 바꾸지 않는다.

## 실제 필요에 따른 확장

| 확인할 조건 | 검토할 최소 변화 |
|---|---|
| 개인 포크에서 정기 협업·review 누락 반복 | 작성자 외 review 1명·미해결 대화 차단·main 보호를 해당 승인 후 검토 |
| 반복 가능한 build/test/lint와 필요한 환경이 확인됨 | 실제 서비스 명령별 최소 application CI; PR 형식 검사를 대신 사용하지 않음 |
| Auth·Data·Secret·DB·외부 입력 위험을 다루는 요청 | 해당 trust boundary의 기존 검증·native 보안 확인; 변경 권한 별도 확인 |
| bug/feature 양식 혼재가 반복 | 기존 work Issue를 두 양식으로 교체; 세 개를 병행 유지하지 않음 |
| backlog 우선순위 파악이나 reviewer 배정 문제가 반복 | 필요한 label/Project/CODEOWNERS만 검토 |
| 동시 merge 대기·stale 문제가 반복 | GitHub 지원·안정적인 required CI를 조회한 뒤 merge queue 검토 |
| 실제 배포·다중 지원 버전 운영 요청 | tag/release 자동화·release branch 필요성을 그때 판단 |
| 성능/Memory 문제가 재현됨 | 재현 benchmark/profiling부터 시작; 일반 lint 통과를 성능 증거로 쓰지 않음 |

PetCare에는 기존 실행 앱과 테스트가 있다. 앱이 없어서 CI를 미루는 것이 아니다. 서비스별 의존 환경·Secret·격리 DB·기존 실패 baseline·실제 원하는 Gate를 검증하는 별도 범위가 필요하며, 이 운영문서 요청에서 앱 실행·CI 도입을 승인한 것으로 간주하지 않는다.

## 조건부 협업 main 보호

개인 포크에서 정기 협업 필요가 확인되고 정확한 설정 변경이 승인된 경우에만 다음 기준을 검토한다. 이 목록이나 문서 작성으로 원격 설정을 적용하지 않는다.

- PR을 통해서만 main 변경 허용.
- 작성자 외 최소 review approval 1명, 미해결 review conversation 차단.
- 안정적인 실제 build/test/lint만 required status check로 지정.
- force push와 main branch 삭제 차단.
- Squash merge만 허용.

Secret은 규모와 무관하게 추적하지 않는다. credential 사용 시 native push protection을, manifest/lockfile이 있을 때 dependency 취약 알림을 검토한다. 현재 권한·비용·보안 설정을 바꾸는 실행은 정확한 해당 요청에서만 수행한다.

## 조건부 template 교체

Bug/Feature 분리가 반복 필요해질 때 기존 work 양식을 교체한다. 실제 양식 파일은 그때 만들며 세 가지를 병행 유지하지 않는다.

- Bug 필수 내용: 현상, 재현 방법, 기대 결과, 환경과 증거.
- Feature 필수 내용: 해결할 문제, 목표, 완료 조건, 제외 범위.
- PR 확장 내용: 기존 결과/변경/이유/검증/확인에 API·DB·config·배포 영향과 복구 방법, review 포인트를 추가한다. UI screenshot·Migration·rollout은 해당 변경이 반복될 때만 추가한다.

## 조건부 Merge Queue

지원되는 repository 소유 형태와 GitHub plan을 당시 조회하고, 여러 사람이 여러 PR을 같은 branch에 자주 merge하며, 안정적인 required CI가 있고, 다른 merge 때문에 check가 반복해서 stale되는 경우에만 검토한다. Queue는 개발 작업 순서나 Agent 소통 도구가 아니다.

도입 승인 시 Squash 정책을 유지하고 pull_request와 merge_group 양쪽에서 같은 검증이 실행되게 준비한다. 필요가 적거나 지원되지 않으면 maintainer가 PR을 하나씩 merge하고 다음 PR을 최신 main으로 다시 확인한다. 이번 요청에서는 queue 지원·설정을 확인하거나 변경하지 않았다.

## 변경 시 일관성

PR heading·필수 항목·작성 형식 변경은 template·검사 script·독립 테스트·Git 문서를 같은 diff에서 맞춘다. Workflow가 필요로 하지 않는 Runtime·Store·Jev 테스트 glob이나 root manifest를 복사하지 않는다. Ruleset required check·merge 방식·권한은 파일 수정만으로 설정되지 않는다.

API/DB/배포 영향과 복구·review 포인트·UI screenshot 같은 template 항목은 반복 필요가 생겼을 때만 확장한다. 그때 현재 양식을 교체하고 회귀 검증한다. Queue 도입 시에는 지원 여부를 당시 조회하고 `merge_group` 검증도 함께 준비한다. 팀 원본 설정에는 개인 규칙을 적용하지 않는다.
