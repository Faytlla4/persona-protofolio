/* =====================================================================
   MODEL — the data and state of the app. Never touches the DOM.
   Edit your content here: featured projects, skills, image overrides.
   ===================================================================== */

const Model = {

  githubUser: "Faytlla4",

  // Where the contact form delivers (via formsubmit.co relay)
  contactEmail: "fahmi@example.com",

  // App state (read/written by the Controller, displayed by the View)
  state: {
    screen: "home",        // which screen is showing
    menuIndex: 0,          // selected item on the home menu
    reposLoaded: false,
    skillsBuilt: false,
  },

  // ---- Featured projects (hand-written, shown above the GitHub feed) ----
  featured: [
    {
      title: "Portofolio Website",
      tag: "TypeScript", color: "#00e5ff",
      url: "https://github.com/Faytlla4/portofolio", cta: "View on GitHub →",
      img: "assets/projects/portofolio.png",
      desc: "Portfolio website built with React and TypeScript, showcasing web development projects with modern responsive design.",
    },
    {
      title: "Klinik & Apotek System",
      tag: "JavaScript", color: "#00e5ff",
      url: "https://github.com/Faytlla4/klinikapotek", cta: "View on GitHub →",
      img: "assets/projects/klinikapotek.png",
      desc: "Web-based clinic and pharmacy management system for managing patient records, prescriptions, and medical inventory.",
    },
    {
      title: "Order Baju Template",
      tag: "JavaScript", color: "#00bfff",
      url: "https://github.com/Faytlla4/order_baju_template", cta: "View on GitHub →",
      img: "assets/projects/order_baju.png",
      desc: "E-commerce ordering template for clothing and apparel with dynamic cart and checkout interface.",
    },
    {
      title: "World War 2 History",
      tag: "HTML/CSS", color: "#0099cc",
      url: "https://github.com/Faytlla4/world_war2", cta: "View on GitHub →",
      img: "assets/projects/ww2.png",
      desc: "Interactive educational website detailing the dark history, timeline, and major events of World War II.",
    },
    {
      title: "Happy Birthday Card",
      tag: "JavaScript", color: "#00e5ff",
      url: "https://github.com/Faytlla4/happybirthday", cta: "View on GitHub →",
      img: "assets/projects/birthday.png",
      desc: "Interactive web-based birthday greeting card with dynamic animations and personalized messages.",
    },
  ],

  // Repos already shown in "featured" get hidden from the GitHub feed
  featuredRepoNames: [
    "portofolio",
    "klinikapotek",
    "order_baju_template",
    "world_war2",
    "happybirthday",
  ],

  // Shown if the GitHub API can't be reached
  fallbackRepos: [
    {
      name: "portofolio", language: "TypeScript", stargazers_count: 0,
      html_url: "https://github.com/Faytlla4/portofolio",
      description: "Portfolio website with React and TypeScript.",
    },
    {
      name: "klinikapotek", language: "JavaScript", stargazers_count: 0,
      html_url: "https://github.com/Faytlla4/klinikapotek",
      description: "Web application for clinic and pharmacy management.",
    },
    {
      name: "order_baju_template", language: "JavaScript", stargazers_count: 0,
      html_url: "https://github.com/Faytlla4/order_baju_template",
      description: "Clothing order website template.",
    },
    {
      name: "world_war2", language: "HTML", stargazers_count: 0,
      html_url: "https://github.com/Faytlla4/world_war2",
      description: "Sebuah web yg berisi sejarah kelam WW2.",
    },
    {
      name: "happybirthday", language: "JavaScript", stargazers_count: 0,
      html_url: "https://github.com/Faytlla4/happybirthday",
      description: "Interactive web birthday card.",
    },
  ],

  // Optional thumbnail overrides: repo name → image path.
  // Anything not listed is looked up at assets/projects/<RepoName>.png
  projectImages: {
    // "DownloadGuard": "assets/projects/downloadguard.png",
  },

  langColors: {
    JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5",
    PHP: "#4F5D95", CSS: "#663399", HTML: "#e34c26",
    "Jupyter Notebook": "#DA5B0B", MATLAB: "#e16737", Java: "#b07219", C: "#555", "C++": "#f34b7d",
  },

  // ---- Skills screen ----
  skills: [
    { group: "Front-End Development", items: [
      ["JavaScript (ES6+)", 90], ["TypeScript", 82],
      ["React.js", 85], ["HTML5 & Semantic Web", 95],
      ["CSS3 / Responsive Design", 90], ["Tailwind CSS", 80],
    ]},
    { group: "Back-End & Tools", items: [
      ["Node.js / Express", 78], ["RESTful APIs", 82],
      ["PHP / PostgreSQL", 75], ["Git & GitHub Workflow", 85],
      ["VS Code / DevTools", 90], ["Postman", 80],
    ]},
    { group: "Other Skills", items: [
      ["UI/UX Prototyping", 78], ["Web Performance", 75],
      ["Problem Solving", 85], ["Team Collaboration", 88],
    ]},
  ],

  // ---- Data fetching ----
  async fetchRepos() {
    const skip = new Set(this.featuredRepoNames);
    try {
      const res = await fetch(
        `https://api.github.com/users/${this.githubUser}/repos?per_page=100&sort=updated`
      );
      if (!res.ok) throw new Error(res.status);
      const repos = (await res.json()).filter(r => !r.fork && !skip.has(r.name));
      return { repos, live: true };
    } catch {
      return { repos: this.fallbackRepos.filter(r => !skip.has(r.name)), live: false };
    }
  },
};
