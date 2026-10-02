import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { parsePullRequestEvent, validatePullRequest } from "../scripts/pr-check.mjs";

const draftBody = await readFile(
  new URL("../.github/pull_request_template.md", import.meta.url),
  "utf8",
);

const readyBody = `## 요약

> **결과:** PR 형식 검사를 추가했습니다.

## 주요 변경

- **PR 검사**
  - Draft와 Ready 검사를 구분했습니다.

- **문서**
  - canonical 작성 형식을 정리했습니다.

## 변경 이유

- Template 누락을 자동으로 확인하기 위해서입니다.

## 검증

- 실행한 명령 또는 확인 방법:
  - \`node --test tests/pr-check.test.mjs\`

- 결과:
  - 통과

## 확인

- [x] 하나의 독립적으로 병합 가능한 결과만 포함
- [x] 변경 diff 전체와 시크릿 포함 여부 확인`;

test("Draft PR은 기본 형식만 검사한다", () => {
  assert.deepEqual(validatePullRequest({
    title: "chore: PR 검사 추가",
    body: draftBody,
    draft: true,
  }), []);
});

test("Ready PR은 완성된 template을 통과시킨다", () => {
  assert.deepEqual(validatePullRequest({
    title: "chore: PR 검사 추가",
    body: readyBody,
    draft: false,
  }), []);

  assert.deepEqual(validatePullRequest({
    title: "docs: HTML 예시 추가",
    body: readyBody.replace(
      "  - Draft와 Ready 검사를 구분했습니다.",
      `  - Draft와 Ready 검사를 구분했습니다.

  \`\`\`html
  <!-- literal example
  \`\`\``,
    ),
    draft: false,
  }), []);

  assert.deepEqual(validatePullRequest({
    title: "docs: HTML 예시 추가",
    body: readyBody.replace(
      "  - Draft와 Ready 검사를 구분했습니다.",
      `  - Draft와 Ready 검사를 구분했습니다.

  \`\`\`html <!-- literal info
  example
  \`\`\``,
    ),
    draft: false,
  }), []);

  assert.deepEqual(validatePullRequest({
    title: "docs: HTML 예시 추가",
    body: readyBody.replace(
      "  - Draft와 Ready 검사를 구분했습니다.",
      "  - inline code의 `<!--` 문자열을 설명했습니다.",
    ),
    draft: false,
  }), []);
});

test("Draft부터 canonical 요약과 loose list 여백을 유지한다", () => {
  const cases = [
    {
      body: readyBody.replace(
        "> **결과:** PR 형식 검사를 추가했습니다.",
        "- PR 형식 검사를 추가했습니다.",
      ),
      error: "요약은 '> **결과:** 내용' 형식으로 작성해야 합니다.",
    },
    {
      body: readyBody.replace(
        "  - Draft와 Ready 검사를 구분했습니다.\n\n- **문서**",
        "  - Draft와 Ready 검사를 구분했습니다.\n- **문서**",
      ),
      error: "주요 변경의 상위 분류 사이에는 빈 줄을 유지해야 합니다.",
    },
    {
      body: readyBody.replace(
        "  - `node --test tests/pr-check.test.mjs`\n\n- 결과:",
        "  - `node --test tests/pr-check.test.mjs`\n- 결과:",
      ),
      error: "검증의 '결과' 앞에는 빈 줄을 유지해야 합니다.",
    },
    {
      body: readyBody.replace(
        "\n\n- **문서**",
        "\n<!-- note -->\n- **문서**",
      ),
      error: "주요 변경의 상위 분류 사이에는 빈 줄을 유지해야 합니다.",
    },
    {
      body: readyBody.replace(
        "> **결과:** PR 형식 검사를 추가했습니다.",
        "> ```markdown\n> **결과:** fake\n> ```",
      ),
      error: "요약은 '> **결과:** 내용' 형식으로 작성해야 합니다.",
    },
  ];

  for (const { body, error } of cases) {
    assert.ok(validatePullRequest({
      title: "chore: PR 검사 추가",
      body,
      draft: true,
    }).includes(error));
  }
});

test("Ready PR의 placeholder와 미완료 확인을 거부한다", () => {
  const errors = validatePullRequest({
    title: "chore: PR 검사 추가",
    body: draftBody,
    draft: false,
  });

  assert.equal(errors.length, 7);
  assert.ok(errors.includes("요약을 작성해야 합니다."));
  assert.ok(errors.some(error => error.startsWith("주요 변경은")));
  assert.ok(errors.some(error => error.startsWith("확인 항목을 완료해야 합니다:")));
  for (const body of [
    `<!--\n${readyBody}\n-->`,
    `\`\`\`markdown\n${readyBody}\n\`\`\`\``,
    readyBody
      .replace("  - `node --test tests/pr-check.test.mjs`", "  -")
      .replace("  - 통과", "  -"),
    readyBody.replace(
      "- 실행한 명령 또는 확인 방법:\n  - `node --test tests/pr-check.test.mjs`",
      "- 실행한 명령 또는 확인 방법: `node --test tests/pr-check.test.mjs`",
    ),
    readyBody.replace(
      "  - `node --test tests/pr-check.test.mjs`",
      "- 관련 없는 최상위 항목\n  - `node --test tests/pr-check.test.mjs`",
    ),
  ]) {
    assert.notDeepEqual(validatePullRequest({
      title: "chore: PR 검사 추가",
      body,
      draft: false,
    }), []);
  }

  const duplicateHeadingBody = `## 요약
## 요약
## 주요 변경
## 주요 변경
## 변경 이유
## 변경 이유
## 검증
- 실행한 명령 또는 확인 방법:
  - 확인
- 결과:
  - 통과
## 확인
- [x] 하나의 독립적으로 병합 가능한 결과만 포함
- [x] 변경 diff 전체와 시크릿 포함 여부 확인`;
  assert.ok(validatePullRequest({
    title: "chore: PR 검사 추가",
    body: duplicateHeadingBody,
    draft: false,
  }).some(error => error.startsWith("필수 항목은 한 번만")));
});

test("Ready PR의 주요 변경은 분류와 중첩 내용을 요구한다", () => {
  for (const body of [
    readyBody
      .replace("- **PR 검사**", "- PR 검사")
      .replace("- **문서**", "- 문서"),
    readyBody.replace("  - Draft와 Ready 검사를 구분했습니다.", "  -"),
    readyBody.replace(
      "  - Draft와 Ready 검사를 구분했습니다.",
      "  - Draft와 Ready 검사를 구분했습니다.\n\n- **작업 상태**\n  -",
    ),
    readyBody.replace(
      "  - Draft와 Ready 검사를 구분했습니다.",
      "- 관련 없는 최상위 항목\n  - Draft와 Ready 검사를 구분했습니다.",
    ),
  ]) {
    assert.ok(validatePullRequest({
      title: "chore: PR 검사 추가",
      body,
      draft: false,
    }).some(error => error.startsWith("주요 변경은")));
  }
});

test("Ready 변경 이유는 실제 최상위 목록과 내용이 필요하고 Draft는 자유 작성을 유지한다", () => {
  const original = "- Template 누락을 자동으로 확인하기 위해서입니다.";
  const error = "변경 이유는 내용을 채운 '- 항목' 목록으로 작성해야 합니다.";
  for (const reason of [
    "Template 누락을 자동으로 확인할 필요",
    "  - 중첩 목록만 작성",
    "<!--\n- 숨은 이유\n-->",
    "```markdown\n- 예시 코드 안의 이유\n```",
    "-",
    "- ",
    "- <!-- 내용은 comment에만 존재 -->",
    "- 누락 방지 필요\n\n-",
  ]) {
    const body = readyBody.replace(original, reason);
    assert.ok(validatePullRequest({ title: "chore: 이유 목록 검사", body, draft: false }).includes(error));
    assert.deepEqual(validatePullRequest({ title: "chore: 이유 목록 검사", body, draft: true }), []);
  }
  for (const reason of [
    "- 누락 방지 필요",
    "- **누락 방지 필요**\n  - 문단만 작성해도 통과하던 검사 보강",
    "- 첫 이유\n\n- 두 번째 이유",
    "- 여러 줄의 이유\n  같은 항목의 근거 설명",
  ]) {
    assert.deepEqual(validatePullRequest({ title: "chore: 이유 목록 검사",
      body: readyBody.replace(original, reason), draft: false }), []);
  }
});

test("제목과 event 입력 형식을 검사한다", () => {
  assert.ok(validatePullRequest({
    title: "PR 검사 추가",
    body: readyBody,
    draft: false,
  }).some(error => error.startsWith("제목은")));

  assert.deepEqual(parsePullRequestEvent({
    pull_request: { title: "docs: 설명 추가", body: readyBody, draft: false },
  }), { title: "docs: 설명 추가", body: readyBody, draft: false });
  assert.throws(() => parsePullRequestEvent({}), /PR_CHECK_EVENT_INVALID/);
});
