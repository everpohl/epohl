import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const OUTPUT_PATH = path.join(ROOT, "todo-data.json");
const HTML_FILE_PATTERN = /\.html$/i;
const EXCLUDED_DIRS = new Set([".git", "node_modules"]);
const TODO_COMMENT_PATTERN = /<!--\s*TODO(?::|\s)\s*([\s\S]*?)-->/gi;
const ANCHOR_PATTERN = /<a\b([\s\S]*?)>([\s\S]*?)<\/a>/gi;
const TITLE_PATTERN = /<title>([\s\S]*?)<\/title>/i;

function stripTags(value) {
  return String(value || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeSelectorValue(value) {
  return String(value || "").replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getAttributes(rawAttributes) {
  const attributes = {};
  const attributePattern = /([^\s=]+)(?:=("([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  let match;

  while ((match = attributePattern.exec(rawAttributes))) {
    const name = match[1].toLowerCase();
    const value = match[3] ?? match[4] ?? match[5] ?? "";
    attributes[name] = value;
  }

  return attributes;
}

function getLineNumber(content, index) {
  return content.slice(0, index).split("\n").length;
}

function extractTitle(content, fallbackPath) {
  const match = content.match(TITLE_PATTERN);
  return stripTags(match?.[1]) || fallbackPath;
}

function buildTaskId(pagePath, type, hint, lineNumber) {
  const pageSlug = slugify(pagePath.replace(HTML_FILE_PATTERN, ""));
  const hintSlug = slugify(hint).slice(0, 48) || `line-${lineNumber}`;
  return `${pageSlug}-${type}-${hintSlug}-${lineNumber}`;
}

function parseCommentCategory(description) {
  const bracketMatch = description.match(/^\[(content|design|bug|feature)\]\s*(.+)$/i);
  if (bracketMatch) {
    return {
      category: bracketMatch[1].toLowerCase(),
      description: bracketMatch[2].trim()
    };
  }

  return {
    category: "uncategorized",
    description: description.trim()
  };
}

function extractCommentTasks(filePath, content, pageTitle) {
  const tasks = [];
  let match;

  while ((match = TODO_COMMENT_PATTERN.exec(content))) {
    const rawDescription = stripTags(match[1]);
    if (!rawDescription) continue;

    const { category, description } = parseCommentCategory(rawDescription);
    const lineNumber = getLineNumber(content, match.index);

    tasks.push({
      id: buildTaskId(filePath, "comment", description, lineNumber),
      page: filePath,
      pageTitle,
      category,
      status: "todo",
      description,
      selector: `comment:${lineNumber}`,
      anchor: `?todo-line=${lineNumber}&todo-kind=comment`,
      sourceType: "comment",
      line: lineNumber
    });
  }

  return tasks;
}

function extractAnchorTasks(filePath, content, pageTitle) {
  const tasks = [];
  let match;

  while ((match = ANCHOR_PATTERN.exec(content))) {
    const rawAttributes = match[1];
    const innerHtml = match[2];
    const attributes = getAttributes(rawAttributes);
    const isExplicitTodo = attributes["data-status"] === "todo";
    const isPlaceholderTodo =
      attributes.href === "#" || /^todo:/i.test(attributes.title || "");

    if (!isExplicitTodo && !isPlaceholderTodo) {
      continue;
    }

    const description =
      attributes["data-todo"] ||
      (attributes.title || "").replace(/^todo:\s*/i, "").trim() ||
      `Review link: ${stripTags(innerHtml)}`.trim();

    const visibleText = stripTags(innerHtml) || description;
    const lineNumber = getLineNumber(content, match.index);
    const category = (attributes["data-category"] || "uncategorized").toLowerCase();
    const selector = attributes["data-todo"]
      ? `a[data-todo="${escapeSelectorValue(attributes["data-todo"])}"]`
      : `a[href="${escapeSelectorValue(attributes.href || "#")}"]`;

    tasks.push({
      id: buildTaskId(filePath, "link", attributes["data-todo"] || visibleText, lineNumber),
      page: filePath,
      pageTitle,
      category,
      status: attributes["data-status"] || "todo",
      description,
      selector,
      anchor: `?todo-line=${lineNumber}&todo-kind=link`,
      sourceType: "link",
      line: lineNumber,
      label: visibleText
    });
  }

  return tasks;
}

async function collectHtmlFiles(directory, results = []) {
  const entries = await fs.readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    if (EXCLUDED_DIRS.has(entry.name)) {
      continue;
    }

    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await collectHtmlFiles(absolutePath, results);
      continue;
    }

    if (entry.isFile() && HTML_FILE_PATTERN.test(entry.name)) {
      results.push(absolutePath);
    }
  }

  return results;
}

async function buildTodoData() {
  const htmlFiles = (await collectHtmlFiles(ROOT)).sort((left, right) => left.localeCompare(right));
  const pages = [];
  const tasks = [];

  for (const absoluteFilePath of htmlFiles) {
    const relativePath = path.relative(ROOT, absoluteFilePath).replace(/\\/g, "/");
    const content = await fs.readFile(absoluteFilePath, "utf8");
    const pageTitle = extractTitle(content, relativePath);
    const pageTasks = [
      ...extractCommentTasks(relativePath, content, pageTitle),
      ...extractAnchorTasks(relativePath, content, pageTitle)
    ].sort((left, right) => left.line - right.line);

    if (!pageTasks.length) {
      continue;
    }

    pages.push({
      path: relativePath,
      title: pageTitle,
      taskCount: pageTasks.length
    });
    tasks.push(...pageTasks);
  }

  return {
    generatedAt: new Date().toISOString(),
    generator: "scripts/generate-todo-data.mjs",
    strategy: "scan-html",
    pages,
    tasks
  };
}

const data = await buildTodoData();
await fs.writeFile(OUTPUT_PATH, `${JSON.stringify(data, null, 2)}\n`, "utf8");

console.log(`Generated ${path.relative(ROOT, OUTPUT_PATH)} with ${data.tasks.length} tasks across ${data.pages.length} page(s).`);
