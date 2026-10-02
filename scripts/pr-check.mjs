#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const TITLE_PATTERN = /^(feat|fix|chore|docs): \S(?:.*\S)?$/u;
const HEADINGS = ["## 요약", "## 주요 변경", "## 변경 이유", "## 검증", "## 확인"];
const CHECKS = [
  "하나의 독립적으로 병합 가능한 결과만 포함",
  "변경 diff 전체와 시크릿 포함 여부 확인",
];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function visibleMarkdown(body, hiddenMarker = "") {
  const lines = body.split("\n");
  let fence = null;
  let comment = false;
  const container = "(?:[ \\t]{0,3}>[ \\t]?)*[ \\t]{0,3}";

  return lines.map(line => {
    if (fence) {
      const closing = new RegExp(
        `^${container}${escapeRegExp(fence.marker)}{${fence.length},}[ \\t]*$`,
        "u",
      );
      if (closing.test(line)) fence = null;
      return hiddenMarker;
    }

    if (!comment) {
      const opening = new RegExp(
        `^${container}(\\x60{3,}|~{3,})[^\\n]*$`,
        "u",
      ).exec(line);
      if (opening) {
        fence = { marker: opening[1][0], length: opening[1].length };
        return hiddenMarker;
      }
    }

    let visible = "";
    let cursor = 0;
    while (cursor < line.length) {
      if (comment) {
        const end = line.indexOf("-->", cursor);
        if (end < 0) return visible + hiddenMarker;
        comment = false;
        visible += hiddenMarker;
        cursor = end + 3;
        continue;
      }

      // ponytail: code spans are line-local; use a Markdown parser if multiline spans become necessary.
      if (line[cursor] === "`") {
        let markerEnd = cursor + 1;
        while (line[markerEnd] === "`") markerEnd += 1;
        const marker = line.slice(cursor, markerEnd);
        const end = line.indexOf(marker, markerEnd);
        if (end >= 0) {
          visible += line.slice(cursor, end + marker.length);
          cursor = end + marker.length;
          continue;
        }
      }

      if (line.startsWith("<!--", cursor)) {
        comment = true;
        visible += hiddenMarker;
        cursor += 4;
        continue;
      }

      visible += line[cursor];
      cursor += 1;
    }
    return visible;
  }).join("\n");
}

function headingPositions(body, heading) {
  return [...body.matchAll(new RegExp(`^${escapeRegExp(heading)}[ \\t]*$`, "gmu"))]
    .map(match => match.index);
}

function headingPosition(body, heading) {
  return headingPositions(body, heading)[0] ?? -1;
}

function section(body, heading, nextHeading) {
  const start = headingPosition(body, heading) + heading.length;
  const end = nextHeading ? headingPosition(body, nextHeading) : body.length;
  return body.slice(start, end < 0 ? body.length : end);
}

function hasContent(value) {
  return value
    .replace(/<!--[^]*?-->/gu, "")
    .split("\n")
    .map(line => line.trim())
    .some(line => line && line !== "-");
}

function summaryResult(body) {
  const matches = [...body.matchAll(/^> \*\*결과:\*\*[ \t]*(.*)$/gmu)];
  return matches.length === 1 ? matches[0][1].trim() : null;
}

function hasBlankLineBefore(body, index) {
  return /\n[ \t]*\n[ \t]*$/u.test(body.slice(0, index));
}

function immediateNestedListItems(body) {
  const items = [];
  for (const line of body.split("\n")) {
    if (!line.trim()) continue;

    const match = /^[ \t]{2,}-[ \t]+(.+)$/u.exec(line);
    if (!match) break;
    items.push(match[1].trim());
  }
  return items;
}

function changeCategories(body) {
  const matches = [...body.matchAll(/^- \*\*(.+?)\*\*[ \t]*$/gmu)];
  return matches.map((match, index) => ({
    index: match.index,
    title: match[1].trim(),
    content: body.slice(
      match.index + match[0].length,
      matches[index + 1]?.index ?? body.length,
    ),
  }));
}

function listItemMatches(body, label) {
  return [...body.matchAll(
    new RegExp(`^- ${escapeRegExp(label)}:[ \\t]*$`, "gmu"),
  )];
}

function nestedListValues(body, label) {
  const matches = listItemMatches(body, label);
  if (matches.length !== 1) return null;

  const remainder = body.slice(matches[0].index + matches[0][0].length);
  return immediateNestedListItems(remainder);
}

export function parsePullRequestEvent(value) {
  const pullRequest = value && typeof value === "object" ? value.pull_request : null;
  if (!pullRequest || typeof pullRequest !== "object" ||
      typeof pullRequest.title !== "string" ||
      (pullRequest.body !== null && typeof pullRequest.body !== "string") ||
      typeof pullRequest.draft !== "boolean") {
    throw new Error("PR_CHECK_EVENT_INVALID");
  }

  return {
    title: pullRequest.title,
    body: (pullRequest.body ?? "").replace(/\r\n?/gu, "\n"),
    draft: pullRequest.draft,
  };
}

export function validatePullRequest({ title, body, draft }) {
  const errors = [];
  const visibleBody = visibleMarkdown(body);
  const styleBody = visibleMarkdown(body, "\u0000");

  if (!TITLE_PATTERN.test(title)) {
    errors.push("제목은 'feat|fix|chore|docs: 짧은 설명' 형식이어야 합니다.");
  }

  const matches = HEADINGS.map(heading => headingPositions(visibleBody, heading));
  const positions = matches.map(items => items[0] ?? -1);
  HEADINGS.forEach((heading, index) => {
    if (positions[index] < 0) errors.push(`필수 항목이 없습니다: ${heading}`);
    if (matches[index].length > 1) errors.push(`필수 항목은 한 번만 작성해야 합니다: ${heading}`);
  });

  const structureValid = matches.every(items => items.length === 1);
  if (structureValid &&
      positions.some((position, index) => index > 0 && position <= positions[index - 1])) {
    errors.push("PR 항목 순서가 template과 다릅니다.");
  }

  let summary = "";
  let changesBody = "";
  let verification = "";
  if (structureValid) {
    summary = section(visibleBody, HEADINGS[0], HEADINGS[1]);
    changesBody = section(visibleBody, HEADINGS[1], HEADINGS[2]);
    verification = section(visibleBody, HEADINGS[3], HEADINGS[4]);
    const styleSummary = section(styleBody, HEADINGS[0], HEADINGS[1]);
    const styleChanges = section(styleBody, HEADINGS[1], HEADINGS[2]);
    const styleVerification = section(styleBody, HEADINGS[3], HEADINGS[4]);

    if (summaryResult(styleSummary) === null) {
      errors.push("요약은 '> **결과:** 내용' 형식으로 작성해야 합니다.");
    }

    const changes = changeCategories(styleChanges);
    if (changes.slice(1).some(change => !hasBlankLineBefore(styleChanges, change.index))) {
      errors.push("주요 변경의 상위 분류 사이에는 빈 줄을 유지해야 합니다.");
    }

    const resultMatches = listItemMatches(styleVerification, "결과");
    if (resultMatches.length === 1 &&
        !hasBlankLineBefore(styleVerification, resultMatches[0].index)) {
      errors.push("검증의 '결과' 앞에는 빈 줄을 유지해야 합니다.");
    }
  }

  if (draft || !structureValid || errors.length > 0) return errors;

  if (!hasContent(summaryResult(summary) ?? "")) {
    errors.push("요약을 작성해야 합니다.");
  }

  const changes = changeCategories(changesBody);
  if (changes.length === 0 || changes.some(change => {
    const items = immediateNestedListItems(change.content);
    return !change.title || items.length === 0 || items.some(item => !hasContent(item));
  })) {
    errors.push("주요 변경은 '- **분류**'와 중첩 내용을 한 개 이상 작성해야 합니다.");
  }

  const reasons = [...section(visibleBody, HEADINGS[2], HEADINGS[3])
    .matchAll(/^-(?:[ \t]+(.*))?$/gmu)]
    .map(match => match[1]?.trim() ?? "");
  if (reasons.length === 0 || reasons.some(reason => !hasContent(reason))) {
    errors.push("변경 이유는 내용을 채운 '- 항목' 목록으로 작성해야 합니다.");
  }

  for (const label of ["실행한 명령 또는 확인 방법", "결과"]) {
    const values = nestedListValues(verification, label);
    if (!values || values.length === 0 || values.some(value => !hasContent(value))) {
      errors.push(`검증의 '${label}' 아래에 중첩 목록을 작성해야 합니다.`);
    }
  }

  const confirmation = section(visibleBody, HEADINGS[4]);
  for (const label of CHECKS) {
    if (!new RegExp(`^- \\[x\\] ${escapeRegExp(label)}\\s*$`, "imu").test(confirmation)) {
      errors.push(`확인 항목을 완료해야 합니다: ${label}`);
    }
  }

  return errors;
}

async function main() {
  const eventPath = process.argv[2] ?? process.env.GITHUB_EVENT_PATH;
  if (!eventPath) throw new Error("PR_CHECK_EVENT_PATH_REQUIRED");

  const event = JSON.parse(await readFile(eventPath, "utf8"));
  const pullRequest = parsePullRequestEvent(event);
  const errors = validatePullRequest(pullRequest);

  if (errors.length > 0) {
    for (const error of errors) console.error(`PR_CHECK_FAILED: ${error}`);
    process.exitCode = 1;
    return;
  }

  console.log(pullRequest.draft
    ? "Draft PR 기본 형식을 확인했습니다."
    : "Ready PR 형식을 확인했습니다.");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(error => {
    console.error(error instanceof Error ? error.message : "PR_CHECK_FAILED");
    process.exitCode = 1;
  });
}
