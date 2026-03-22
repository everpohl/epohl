window.prismTeam = [
  {
    slug: "kylie-greenelsh",
    name: "Kylie Greenelsh",
    role: "President",
    shortBio:
      "Placeholder bio: Kylie can use this space later to introduce herself, share what she hopes to bring to Prism, and describe what leadership means to her.",
    profileBio: [
      "Placeholder bio: Kylie’s full profile can live here later. This is a good place for a longer introduction, a few sentences about her leadership style, and a note about what she wants Prism members to feel when they show up.",
      "This page gives her room for a longer personal profile without making the main About page feel too crowded."
    ]
  },
  {
    slug: "everett-pohl",
    name: "Everett Pohl",
    role: "Outreach Coordinator",
    shortBio:
      "Placeholder bio: Everett can later add a short introduction, outreach goals, and the kinds of connections or projects he wants to help Prism build.",
    profileBio: [
      "Placeholder bio: Everett’s profile can later talk about outreach priorities, how he wants students to connect with Prism, and what kinds of partnerships or visibility efforts matter most to him.",
      "It is also a good space for future contact links, projects, or ways people can help with outreach efforts."
    ]
  },
  {
    slug: "athena",
    name: "Athena",
    role: "Treasurer",
    shortBio:
      "Placeholder bio: Athena can later use this section to share a little about herself and how she supports Prism behind the scenes through planning and organization.",
    profileBio: [
      "Placeholder bio: Athena can later use this section to share a bit about herself, how she helps keep Prism organized, and what kinds of events or goals she is excited to support this year.",
      "This page is ready for a fuller profile once you have her last name and final bio text."
    ]
  },
  {
    slug: "asia",
    name: "Asia",
    role: "Secretary",
    shortBio:
      "Placeholder bio: Asia can later describe her role, what she enjoys about Prism, and what she wants new members to know before getting involved.",
    profileBio: [
      "Placeholder bio: Asia’s longer profile can later introduce her role on the team, describe what she values about Prism, and offer a welcoming note to students who may be thinking about attending for the first time.",
      "Like the other profile pages, this one is intentionally simple so it is easy to update once the final bio is ready."
    ]
  }
];

window.getPrismTeamMember = function getPrismTeamMember(slug) {
  return window.prismTeam.find((member) => member.slug === slug) || null;
};
