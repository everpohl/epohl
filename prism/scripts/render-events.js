(function renderPrismEvents() {
  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  const eventsContainer = document.getElementById("featured-events");
  const allEventsUrl =
    (window.prismSiteLinks && window.prismSiteLinks.eventsUrl) ||
    "https://ninerengage.charlotte.edu/organization/prismunccharlotte/events";

  if (!eventsContainer || !Array.isArray(window.prismFeaturedEvents)) {
    return;
  }

  eventsContainer.innerHTML = window.prismFeaturedEvents
    .map(
      (event) => `
        <article class="card event-card">
          <h3>${escapeHtml(event.title)}</h3>
          <p class="event-meta">${escapeHtml(event.meta)}</p>
          <p>${escapeHtml(event.description)}</p>
          <p>
            <a
              class="profile-link"
              href="${escapeHtml(allEventsUrl)}"
              target="_blank"
              rel="noreferrer"
            >
              ${escapeHtml(event.linkLabel || "See full event details")}
            </a>
          </p>
        </article>
      `
    )
    .join("");
})();
