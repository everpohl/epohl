(function renderPrismTeam() {
  function renderParagraphs(paragraphs) {
    return paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("");
  }

  function renderAboutPage() {
    const cardsContainer = document.getElementById("leadership-cards");
    const profilesContainer = document.getElementById("profile-sections");

    if (!cardsContainer || !profilesContainer || !window.prismTeam) {
      return;
    }

    cardsContainer.innerHTML = window.prismTeam
      .map(
        (member) => `
          <article class="card">
            <h3>${member.name}</h3>
            <p class="role">${member.role}</p>
            <p>${member.shortBio}</p>
            <div class="link-row">
              <a class="profile-link" href="#${member.slug}">Read profile</a>
              <a class="profile-link" href="team/${member.slug}.html">Open page</a>
            </div>
          </article>
        `
      )
      .join("");

    profilesContainer.innerHTML = window.prismTeam
      .map(
        (member) => `
          <article class="bio-panel" id="${member.slug}" aria-labelledby="${member.slug}-title">
            <span class="tag">${member.role}</span>
            <h3 id="${member.slug}-title">${member.name}</h3>
            ${renderParagraphs(member.profileBio)}
          </article>
        `
      )
      .join("");
  }

  function renderMemberPage() {
    const pageRoot = document.querySelector("[data-member-page]");

    if (!pageRoot || !window.getPrismTeamMember) {
      return;
    }

    const member = window.getPrismTeamMember(pageRoot.dataset.memberPage);
    const name = document.getElementById("member-name");
    const role = document.getElementById("member-role");
    const bio = document.getElementById("member-bio");

    if (!member || !name || !role || !bio) {
      return;
    }

    document.title = `${member.name} | Prism Leadership`;
    name.textContent = member.name;
    role.textContent = member.role;
    bio.innerHTML = renderParagraphs(member.profileBio);
  }

  renderAboutPage();
  renderMemberPage();
})();
