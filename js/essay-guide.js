(() => {
  const resetTimers = new WeakMap();

  function restoreLabel(button) {
    button.textContent = button.getAttribute("data-copy-label") || "Copy";
    button.classList.remove("is-copied");
  }

  async function handleCopy(button) {
    const promptId = button.getAttribute("data-copy-target");

    if (!promptId) {
      return;
    }

    const prompt = document.getElementById(promptId);

    if (!prompt) {
      return;
    }

    try {
      await navigator.clipboard.writeText(prompt.textContent.replace(/\s+$/, ""));
      button.textContent = button.getAttribute("data-copy-success") || "Copied!";
      button.classList.add("is-copied");

      if (resetTimers.has(button)) {
        window.clearTimeout(resetTimers.get(button));
      }

      const timerId = window.setTimeout(() => {
        restoreLabel(button);
      }, 1500);

      resetTimers.set(button, timerId);
    } catch (error) {
      restoreLabel(button);
    }
  }

  function bindPromptBlocks() {
    document.querySelectorAll("[data-copy-target]").forEach((button) => {
      button.addEventListener("click", () => handleCopy(button));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindPromptBlocks);
  } else {
    bindPromptBlocks();
  }
})();
