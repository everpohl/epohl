const STORAGE_KEY = "siteTodoOverrides";

function slugify(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function readOverrides() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch (error) {
    console.warn("Could not read TODO overrides from localStorage.", error);
    return {};
  }
}

function writeOverrides(overrides) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  } catch (error) {
    console.warn("Could not save TODO overrides to localStorage.", error);
  }
}

export async function loadTodoData(url = new URL("../todo-data.json", import.meta.url)) {
  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Failed to load TODO data: ${response.status}`);
  }

  return response.json();
}

export function getMergedTasks(data) {
  const overrides = readOverrides();

  return (data.tasks || []).map((task) => {
    const override = overrides[task.id] || {};
    const status = override.status || task.status || "todo";
    const pageTitle = task.pageTitle || task.page || "Unknown page";
    const category = task.category || "uncategorized";
    const priority = task.priority || "normal";
    const anchor = task.anchor || (task.selector ? `?todo=${encodeURIComponent(task.id)}` : "");

    return {
      ...task,
      status,
      pageTitle,
      category,
      priority,
      anchor,
      link: `${task.page}${anchor}`
    };
  });
}

export function calculateProgress(tasks) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.status === "done").length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return { total, completed, percent };
}

function getCategoryCounts(tasks) {
  return tasks.reduce((counts, task) => {
    counts[task.category] = (counts[task.category] || 0) + 1;
    return counts;
  }, {});
}

function groupTasks(tasks, key) {
  return tasks.reduce((groups, task) => {
    const groupKey = task[key] || "Other";
    const title = key === "pageTitle" ? task.pageTitle : task.category;

    if (!groups[groupKey]) {
      groups[groupKey] = {
        key: groupKey,
        title,
        tasks: []
      };
    }

    groups[groupKey].tasks.push(task);
    return groups;
  }, {});
}

function renderTaskItem(task, options = {}) {
  const statusClass = task.status === "done" ? "is-done" : "is-todo";
  const priorityClass = task.priority ? `priority-${slugify(task.priority)}` : "";
  const toggleButton = options.showToggle
    ? `<button class="todo-toggle" type="button" data-todo-toggle="${escapeHtml(task.id)}">
        Mark as ${task.status === "done" ? "todo" : "done"}
      </button>`
    : "";

  return `
    <article class="todo-item ${statusClass} ${priorityClass}">
      <div class="todo-item-main">
        <h3>
          <a href="${escapeHtml(task.link)}">${escapeHtml(task.description)}</a>
        </h3>
        <p class="todo-meta">
          <span>${escapeHtml(task.pageTitle)}</span>
          <span>${escapeHtml(task.category)}</span>
          <span>${escapeHtml(task.status)}</span>
        </p>
      </div>
      ${toggleButton}
    </article>
  `;
}

function renderGroup(group, options = {}) {
  const progress = calculateProgress(group.tasks);

  return `
    <section class="todo-group">
      <div class="todo-group-head">
        <h3>${escapeHtml(group.title)}</h3>
        <p>${progress.completed}/${progress.total} complete</p>
      </div>
      <div class="todo-group-list">
        ${group.tasks.map((task) => renderTaskItem(task, options)).join("")}
      </div>
    </section>
  `;
}

function renderFilterOptions(select, tasks) {
  const counts = getCategoryCounts(tasks);
  const categories = Object.keys(counts).sort((left, right) => left.localeCompare(right));

  select.innerHTML = [
    `<option value="all">All categories (${tasks.length})</option>`,
    ...categories.map(
      (category) =>
        `<option value="${escapeHtml(category)}">${escapeHtml(category)} (${counts[category]})</option>`
    )
  ].join("");
}

function renderProgress(root, tasks) {
  const progress = calculateProgress(tasks);
  const progressTrack = root.querySelector("[data-todo-progress-track]");
  const progressBar = root.querySelector("[data-todo-progress-bar]");
  const progressLabel = root.querySelector("[data-todo-progress-label]");
  const progressSummary = root.querySelector("[data-todo-progress-summary]");

  if (progressBar) {
    progressBar.style.width = `${progress.percent}%`;
  }

  if (progressTrack) {
    progressTrack.setAttribute("aria-valuenow", String(progress.percent));
  }

  if (progressLabel) {
    progressLabel.textContent = `${progress.percent}% complete`;
  }

  if (progressSummary) {
    progressSummary.textContent = `${progress.completed} of ${progress.total} tasks finished`;
  }
}

function renderGeneratedMeta(root, data) {
  const metaTarget = root.querySelector("[data-todo-generated-meta]");
  if (!metaTarget) return;

  const generatedAt = data.generatedAt ? new Date(data.generatedAt) : null;
  const generatedLabel =
    generatedAt && !Number.isNaN(generatedAt.getTime())
      ? generatedAt.toLocaleString()
      : "Unknown";

  metaTarget.textContent = `Last generated: ${generatedLabel}`;
}

function renderAllTasks(root, tasks) {
  const allTasks = root.querySelector("[data-todo-all]");
  if (!allTasks) return;

  if (!tasks.length) {
    allTasks.innerHTML = `<p class="todo-empty">No tasks match the current filter.</p>`;
    return;
  }

  allTasks.innerHTML = tasks.map((task) => renderTaskItem(task, { showToggle: true })).join("");
}

function renderGroupedSections(root, tasks) {
  const byPage = root.querySelector("[data-todo-by-page]");
  const byCategory = root.querySelector("[data-todo-by-category]");
  const pageGroups = Object.values(groupTasks(tasks, "pageTitle")).sort((left, right) =>
    left.title.localeCompare(right.title)
  );
  const categoryGroups = Object.values(groupTasks(tasks, "category")).sort((left, right) =>
    left.title.localeCompare(right.title)
  );

  if (byPage) {
    byPage.innerHTML = pageGroups.map((group) => renderGroup(group)).join("");
  }

  if (byCategory) {
    byCategory.innerHTML = categoryGroups.map((group) => renderGroup(group)).join("");
  }
}

function attachToggleHandlers(root, getTasks, refresh) {
  root.addEventListener("click", (event) => {
    const button = event.target.closest("[data-todo-toggle]");
    if (!button) return;

    const taskId = button.getAttribute("data-todo-toggle");
    const overrides = readOverrides();
    const currentTask = getTasks().find((task) => task.id === taskId);
    const currentStatus = currentTask?.status || "todo";
    const nextStatus = currentStatus === "done" ? "todo" : "done";

    overrides[taskId] = { ...overrides[taskId], status: nextStatus };
    writeOverrides(overrides);
    refresh();
  });
}

export async function renderTodoDashboard(root, options = {}) {
  if (!root) {
    throw new Error("renderTodoDashboard requires a root element.");
  }

  const data = await loadTodoData(options.dataUrl || new URL("../todo-data.json", import.meta.url));
  const filterSelect = root.querySelector("[data-todo-filter]");
  let selectedCategory = "all";

  const refresh = () => {
    const mergedTasks = getMergedTasks(data);
    const visibleTasks =
      selectedCategory === "all"
        ? mergedTasks
        : mergedTasks.filter((task) => task.category === selectedCategory);

    renderProgress(root, mergedTasks);
    renderAllTasks(root, visibleTasks);
    renderGroupedSections(root, visibleTasks);
  };

  if (filterSelect) {
    renderFilterOptions(filterSelect, getMergedTasks(data));
    filterSelect.addEventListener("change", () => {
      selectedCategory = filterSelect.value;
      refresh();
    });
  }

  renderGeneratedMeta(root, data);
  attachToggleHandlers(root, () => getMergedTasks(data), refresh);
  refresh();
}

document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("[data-todo-dashboard]");

  if (!root) return;

  renderTodoDashboard(root).catch((error) => {
    console.error(error);
    const errorTarget = root.querySelector("[data-todo-error]");

    if (errorTarget) {
      errorTarget.textContent = "Could not load TODO data.";
      errorTarget.hidden = false;
    }
  });
});
