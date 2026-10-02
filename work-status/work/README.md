# Work 문서 작성 규칙

WP의 계획·Task·Gate·Evidence·실행 Packet 작성 방식의 정본. 공통 ID·관계·상태·완료 시점은 [작업 상태 규칙](../README.md), Agent 브리핑·사용자 승인 경계는 [AGENTS](../../AGENTS.md), Git 절차는 [Git 작업 규칙](../../docs/operations/git-workflow.md) 소유. 필요한 구획만 확인.

## 배치와 문서 역할

현재 지원 경로는 `work/<area>/<wp-id>-<short-name>/plan.md`. WP Plan은 소개가 아닌 계획·상태 정본이며 별도 소개 문서 추가 불필요. Area README는 영역 설명과 탐색 링크만 제공하며 WP 상태 복제 금지.

| 문서 | 소유 내용 | 생성 조건 |
|---|---|---|
| WP Plan | Outcome·범위·완료 조건·Stage·Task·Gate | WP Path의 기본 문서 |
| `evidence.md` | 특정 Task·Gate의 상세 검증 근거 | 여러 검증 대상·시점·한계로 Gate 본문이 길어질 때 |
| `execution-packets/<short-name>.md` | 한 실행의 담당자·대상·허용 범위·조건 | Task만으로 Writer 소유 경로·revision·승인 경계를 명확히 전달하기 어려울 때 |

짧은 증거는 Gate 본문에 유지. 빈 보조 문서·폴더, WP별 소개 README, 별도 상태 index 생성 금지. 보조 문서가 생기면 WP에서 상대 링크로 연결하고 같은 상태·증거를 두 곳에 복제하지 않음.

Task는 `plan.md` 안에서 관리. 별도 tasks.md와 두 번째 상태 정본을 만들지 않음. PetCare Runtime parser나 과거 WYBU 호환 경로는 전제하지 않음.

## 공통 문체와 형식

- 제목·요약은 한국어 명사형·결과형, 식별자와 기술 용어는 원래 표기 유지. 원인·한계 설명은 필요한 만큼 완전한 문장 허용
- 항목 하나에는 검증 가능한 결과 하나. 계획에는 수행 대상·완료 조건, 결과에는 관찰한 사실·근거·한계를 구분
- Work·Stage·Task·Gate 참조는 전체 ID와 Markdown inline code 사용. 번호 재정렬을 이유로 기존 ID 재사용·완료 의미 변경 금지
- 필수 항목은 미확인일 때 `미확인`, 증거가 없으면 `없음`으로 표시. 선택 항목은 해당하지 않으면 생략
- 원문 대화·Terminal 전체·source code·diff 원문·Secret·개인정보 대신 비민감 요약과 근거 위치 기록
- 완료된 WP는 당시 결과·한계의 역사 기록으로 보존. 새 계획에 맞추어 과거 증거를 재해석하거나 통과로 소급 변경 금지

## Plan·Stage·Task·Gate

- Plan 필수 항목: Front Matter의 `type`·`id`·`status`·`area`, Outcome, 포함·제외 범위, 검증 가능한 완료 조건, 현재 알려진 Stage와 Task·Gate
- `depends_on`은 실제 선행 WP가 있을 때만 추가. Stage·Task의 포함 관계를 이 field로 표현하지 않음
- Stage 실행 전에 Task와 Gate 기준 확정. 새 사실에 따라 Task 추가·분할·통합·재정렬·불필요한 대기 항목 제거 가능. Gate 범위와 기존 완료 증거 보존, 알 수 없는 미래 Stage의 추측 생성 금지
- Task 필수 내용: 전체 ID·상태·수행 결과. 완료 판단이 요약만으로 불명확하면 바로 아래에 `완료 확인`, 실제 선행조건이 있으면 `선행` 추가
- 차단·보류·취소 시 이유·Gate 영향·다음 행동 또는 재개 조건 기록. 해당 상태를 `통과`로 계산하지 않음. 현재 완료 검증은 Stage Task 전체의 통과를 요구하므로 예외를 문서 표기만으로 허용하지 않음
- Gate 필수 내용: 전체 ID·상태·판정 기준·확인한 증거·남은 조건. Task 완료만으로 자동 통과하지 않고 기준별 증거와 전체 diff·Secret 여부 확인
- Task 앞에는 전체 ID의 lowercase 고정 anchor 유지. 아래 Task 첫 줄·Stage/Gate 제목·상태 줄은 일관된 작성 schema로 유지. Task와 Stage·Gate 상태 줄에 Markdown checkbox 사용

### 체크리스트 의미

- Task·Gate는 `통과`, Stage는 `완료`일 때만 `[x]`. 나머지는 `[ ]`와 명시 상태 유지. 구현만 끝났거나 차단·보류·취소된 항목은 체크 금지
- Checkbox는 상태의 시각적 표시이며 별도 상태 정본이 아님. 상태와 checkbox를 같은 수정에서 일치시키며 불일치는 Main이 오류로 판정하고 완료 근거로 사용하지 않음
- Task 전체 체크만으로 Gate 자동 통과 금지. Gate 기준·Evidence 확인 후 Gate, Stage 완료 조건 확인 후 Stage 체크
- Roadmap은 결과 단위 체크리스트로 표시. 연결 WP 완료를 확인한 경우에만 체크하고 같은 변경에서 동기화. Task·Stage별 상세 체크리스트는 복제하지 않음
- 미래 조건부 방향은 미완료 체크가 착수·비용·실행 승인으로 해석되지 않도록 조건 명시. 범위·원칙·Evidence의 관찰 사실은 완료할 작업이 아니므로 일반 목록 유지

### Plan 양식

```markdown
---
type: work-package
id: "AREA-WP-001"
status: "대기"
area: "AREA"
---

# `AREA-WP-001` · 결과 이름

- Outcome: 완성할 결과와 사용자에게 생기는 변화

## 범위

- 포함: 이번에 수행할 대상
- 제외: 이번에 수행하지 않을 대상

## 완료 조건

- 결과를 확인할 수 있는 조건
- 모든 필수 Stage Gate 통과 및 전체 diff·Secret 확인

<a id="area-wp-001-s01"></a>

## `AREA-WP-001-S01` · 검증 가능한 결과

- [ ] 상태: `대기`

### Tasks

<a id="area-wp-001-t01"></a>

- [ ] `AREA-WP-001-T01` (`T-01`): `대기` · 수행할 결과
  - 완료 확인: 결과를 판정할 방법

<a id="area-wp-001-g01"></a>

### `AREA-WP-001-G01` · Stage gate

- [ ] 상태: `대기`
- 기준: 통과에 필요한 관찰 조건
- 확인한 증거: 없음
- 남은 조건: `AREA-WP-001-T01` 구현·검증
```

## Evidence

검증 결과마다 대상 Task·Gate, 검증한 대상의 revision 또는 식별 근거, 관찰 시점, 방법·결과·근거 위치·한계 기록. 다른 revision의 증거를 현재 결과로 재사용하려면 영향 재확인. 실패·미검증 항목도 보존하며 실패를 성공 요약으로 덮어쓰지 않음.

별도 파일로 분리한 경우 Gate에는 판정과 정확한 Evidence 항목 링크만 유지. machine-local 근거는 다른 clone에서 접근 불가함을 표시하고 재검증에 필요한 비민감 요약 보존. Evidence는 승인이나 Task·Gate 상태의 별도 정본이 아님.

```markdown
# `AREA-WP-001` · 검증 근거

## 검증 항목 이름

- 대상: `AREA-WP-001-T01` / `AREA-WP-001-G01`
- 검증 대상: commit SHA 또는 파일·입력의 식별 근거
- 관찰 시점: YYYY-MM-DDTHH:mm:ssZ
- 방법: 실행한 검증과 조건
- 결과: 통과·실패·판단 불가와 관찰 사실
- 근거 위치: test·보고서·receipt 등의 경로 또는 링크
- 한계: 미검증 범위와 접근·재현 제한, 없으면 없음
```

## Execution Packet

한 실행의 대상·범위·담당자를 구체화하는 문서. 별도 WP·Task나 승인 증명서가 아니며 생성·완료가 Task·Gate 통과 또는 권한 확대를 의미하지 않음. 일반 단일 Writer 수정에는 생성 불필요.

실행 직전에 기준 revision·소유 경로·승인 근거와 현재 상태 대조. 달라졌거나 허용 여부가 불명확하면 해당 실행 중단 후 재확인. Packet에는 실행 결과를 누적하지 않고 종료 시 Evidence로 연결. 재실행 때 과거 승인을 자동 승계하지 않음.

```markdown
# 실행 이름

- 대상: `AREA-WP-001-T01`
- 목적: 이번 실행으로 확인하거나 만들 결과
- 담당자: 실행자와 파일 Writer
- 기준: repository·worktree·revision 또는 외부 대상의 정확한 식별 근거
- 허용 범위: 읽기·쓰기 경로와 허용 행동
- 제외 범위: 금지 행동과 소유하지 않은 경로
- 실행 조건: 선행 검증과 필요한 사용자 승인 근거
- 중단 조건: revision 변화·검증 실패·권한 불일치 등
- 검증·반환물: 확인 방법과 Evidence 위치
```

외부 상태를 변경하는 실행에는 영향·복구 방법 추가. 비용이 발생하면 승인된 상한 추가. 해당 조건이 없으면 항목 생략. Secret이나 실행에 불필요한 원문을 Packet에 복제하지 않음.
