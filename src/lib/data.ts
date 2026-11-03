export const profile = {
  name: "Karthika Mohanamuthu",
  short: "Karthika",
  location: "Chennai, India",
  email: "karthikamohanamuthu21@gmail.com",
  linkedin: "https://linkedin.com/in/karthika-mohanamuthu-ab5b49222",
  roles: [".NET developer", "Azure engineer", "Cloud modernizer", "Security-minded builder"],
  lead: "Software Engineer with 4.6 years at Tata Consultancy Services, delivering enterprise application modernization, .NET development and Azure migration for a Fortune 500 client.",
  about:
    "I build, modernize and support enterprise applications across analysis, development, testing, deployment and hypercare. My work includes upgrading legacy .NET Framework applications, supporting on-premises to Azure migration, implementing application security controls and coordinating with infrastructure and business stakeholders. I take ownership of delivery, share knowledge through stakeholder KT sessions and adapt quickly to new tools and technologies.",
};

export const stats = [
  { value: 4.6, decimals: 1, suffix: "", label: "Years of experience" },
  { value: 50, decimals: 0, suffix: "+", label: "Defects resolved" },
  { value: 30, decimals: 0, suffix: "+", label: "Deployments & go-lives" },
  { value: 4, decimals: 0, suffix: "", label: "Completed projects" },
];

export const nav = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export const featured = {
  badge: "In progress · Personal project",
  title: "Dance Academy Website",
  blurb:
    "My own dance academy website, built from scratch as a server-rendered ASP.NET MVC application backed by SQL Server.",
  flow: ["Razor Views", "MVC Controllers", "Entity Framework", "SQL Server"],
  points: [
    ["MVC architecture", "clear separation of controllers, models and views."],
    ["Razor views", "server-rendered pages with reusable layouts and partial views."],
    ["Entity Framework", "data access and migrations against a relational schema."],
    ["SQL Server", "persistent storage for the academy’s data."],
  ] as const,
  stack: ["C#", "ASP.NET MVC", "Razor", "Entity Framework", "SQL Server", "HTML/CSS/JS"],
};

export const projects = [
  {
    title: "Legacy .NET modernization",
    body: "Modernized ADM enterprise applications from .NET Framework 3.5 to 4.8, reviewing configuration, dependencies, application components and environment readiness.",
    tag: "3.5 → 4.8",
  },
  {
    title: "On-premises to Azure migration",
    body: "Supported migration of enterprise applications to Microsoft Azure and resolved environment-specific post-migration issues with infrastructure teams.",
    tag: "Cloud",
  },
  {
    title: "Application security",
    body: "Implemented Azure AD authentication, OAuth 2.0, RBAC and Azure Key Vault to secure applications.",
    tag: "Zero-trust",
  },
  {
    title: "TCS .NET training project",
    body: "Built and deployed an ASP.NET MVC and Entity Framework application with a 6-member Agile team; earned an excellence award.",
    tag: "Award",
  },
] as const;

export const delivery = [
  {
    title: "End-to-end delivery",
    body: "Contributed across 4 completed client projects and 1 internal training case study, from analysis and development through deployment and support.",
  },
  {
    title: "Release & production support",
    body: "Supported 30+ deployments and go-lives, including validation, issue resolution, stakeholder coordination and hypercare.",
  },
  {
    title: "Knowledge sharing",
    body: "Prepared technical documentation and delivered knowledge-transfer sessions to stakeholders for smooth handover and application ownership.",
  },
];

export const skills = [
  { group: "Languages", items: ["C#", "JavaScript", "SQL", "Python"] },
  { group: "Backend & frameworks", items: [".NET Framework", "ASP.NET", "MVC", "Entity Framework", "REST APIs", "Swagger"] },
  { group: "Cloud & DevOps", items: ["Microsoft Azure", "Azure DevOps", "CI/CD", "IIS"] },
  { group: "Security", items: ["Azure AD", "OAuth 2.0", "RBAC", "Key Vault"] },
  { group: "Databases", items: ["SQL Server", "IBM DB2"] },
  { group: "AI tools", items: ["Claude Code", "ChatGPT Codex", "GitHub Copilot"] },
  { group: "Frontend", items: ["HTML5", "CSS3", "JavaScript"] },
  { group: "Practices", items: ["Agile/Scrum", "Git", "TFS", "Unit & integration testing"] },
];

export const certifications = [
  "Oracle Agentic AI Associate",
  "Oracle Database Agentic AI",
  "Microsoft Azure AI Fundamentals (AI-900)",
  "TCS AI Spark",
  "TCS AI Idea Igniter",
];

export const experience = [
  {
    role: "Software Engineer / .NET Developer",
    org: "Tata Consultancy Services",
    meta: "March 2022 – Present · Chennai, India · Client: Archer Daniels Midland (ADM), Fortune 500",
    points: [
      "Upgraded enterprise apps from .NET Framework 3.5 to 4.8 and supported migration from on-premises to Azure.",
      "Developed web applications and REST APIs with C#, ASP.NET MVC, SQL Server and IBM DB2.",
      "Worked on application security using Azure AD, OAuth 2.0, role-based access control (RBAC) and Azure Key Vault.",
      "Resolved 50+ defects across development, test, UAT and production; supported 30+ deployments and go-lives, including post-release hypercare.",
      "Prepared migration checklists, technical documentation and support procedures, and ran knowledge-transfer sessions for stakeholders.",
    ],
  },
  {
    role: ".NET Training & Project",
    org: "TCS",
    meta: "TCS internal technical training and case study",
    points: [
      "Completed a team-based .NET project using ASP.NET MVC, Entity Framework and SQL Server in a 6-member Agile team; received the Excellence .NET Developer award.",
    ],
  },
];

export const education = [
  "B.Tech, Information Technology (Lateral Entry), Anna University, Chennai",
  "Diploma in Information Technology, Directorate of Technical Education",
];
