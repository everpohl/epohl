(function setPrismLinks() {
  const prismEventsUrl = "https://ninerengage.charlotte.edu/organization/prismunccharlotte/events";
  window.prismSiteLinks = {
    eventsUrl: prismEventsUrl
  };

  document.querySelectorAll("[data-prism-events-link]").forEach((link) => {
    link.href = prismEventsUrl;
  });
})();
