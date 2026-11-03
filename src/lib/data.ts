/**
 * All site copy lives here. Fields marked OPTIONAL render only when filled in,
 * so the site never shows placeholder text.
 */

export const profile = {
  name: "Karthika Mohanamuthu",
  short: "Karthika",
  location: "Chennai, India",
  email: "karthikamohanamuthu21@gmail.com",
  linkedin: "https://linkedin.com/in/karthika-mohanamuthu-ab5b49222",
  /** OPTIONAL: e.g. "https://github.com/…" */
  github: "",
  /** OPTIONAL: drop the PDF in /public and set to "/Karthika-Mohanamuthu-Resume.pdf" */
  resumeUrl: "",
  /** Used to compute "years of experience" so it never goes stale. */
  careerStart: "2022-03-01",
  roles: [".NET developer", "Azure engineer", "Cloud modernizer", "Security-minded builder"],
  /** `{years}` is replaced with the live years-of-experience figure. */
  lead: "Software Engineer with {years} years at Tata Consultancy Services, modernizing enterprise .NET applications and moving them to Azure for a Fortune 500 client.",
};

export const about = {
  summary:
    "I’m a .NET developer who enjoys making older enterprise systems modern, secure and cloud-ready. At TCS I work across the full lifecycle (analysis, development, testing, deployment and hypercare), take ownership of what I ship, document it well, and pick up new tools quickly.",
  lookingFor:
    ".NET / Azure developer roles focused on application modernization, cloud migration or backend development. Open to relocation.",
};

export const stats = [
  { key: "years", value: 0, decimals: 1, suffix: "", label: "Years of experience" },
  { key: "deploys", value: 30, decimals: 0, suffix: "+", label: "Deployments & go-lives" },
  { key: "defects", value: 50, decimals: 0, suffix: "+", label: "Defects resolved" },
  { key: "projects", value: 4, decimals: 0, suffix: "", label: "Completed client projects" },
] as const;

export const nav = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export const caseStudy = {
  title: "Modernizing enterprise applications for a Fortune 500 client",
  client: "Archer Daniels Midland (ADM)",
  via: "Tata Consultancy Services",
  period: "2022 – present",
  role: "Software Engineer / .NET Developer",
  context:
    "Enterprise applications running on legacy .NET Framework 3.5, hosted on-premises, needed upgrading to a supported framework, migrating to Microsoft Azure and securing with modern identity controls.",
  flow: ["On-prem · .NET 3.5", ".NET Framework 4.8", "Microsoft Azure", "Azure AD · Key Vault"],
  tracks: [
    {
      title: ".NET Framework upgrade",
      tag: "3.5 → 4.8",
      body: "Upgraded applications from .NET Framework 3.5 to 4.8, reviewing configuration, dependencies, application components and environment readiness.",
    },
    {
      title: "Azure migration",
      tag: "On-prem → Cloud",
      body: "Supported moving applications from on-premises to Microsoft Azure and resolved environment-specific post-migration issues with infrastructure teams.",
    },
    {
      title: "Application security",
      tag: "Identity",
      body: "Implemented Azure AD authentication, OAuth 2.0, role-based access control (RBAC) and Azure Key Vault for secrets.",
    },
  ],
  delivery: [
    "Built web applications and REST APIs with C#, ASP.NET MVC, SQL Server and IBM DB2.",
    "Validated releases and supported go-lives through post-release hypercare.",
    "Wrote migration checklists, technical documentation and support procedures, and ran knowledge-transfer sessions for stakeholders.",
  ],
  /** OPTIONAL: measurable results, e.g. { value: "12", label: "applications migrated to Azure" } */
  outcomes: [] as { value: string; label: string }[],
  stack: ["C#", "ASP.NET MVC", ".NET 4.8", "REST APIs", "SQL Server", "IBM DB2", "Microsoft Azure", "Azure AD", "Key Vault"],
};

export const personalProject = {
  badge: "Personal project · In progress",
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
  /** OPTIONAL */
  liveUrl: "",
  /** OPTIONAL */
  repoUrl: "",
};

export const experience = [
  {
    role: "Software Engineer / .NET Developer",
    org: "Tata Consultancy Services",
    period: "Mar 2022 – Present",
    meta: "Chennai, India · Client: Archer Daniels Midland (ADM), Fortune 500",
    points: [
      "Upgraded enterprise applications from .NET Framework 3.5 to 4.8 and supported their migration from on-premises to Azure.",
      "Developed web applications and REST APIs with C#, ASP.NET MVC, SQL Server and IBM DB2.",
      "Secured applications with Azure AD, OAuth 2.0, role-based access control and Azure Key Vault.",
      "Owned defect resolution across development, test, UAT and production, and supported releases through post-release hypercare.",
      "Prepared migration checklists, technical documentation and support procedures; ran knowledge-transfer sessions for stakeholders.",
    ],
  },
  {
    role: ".NET Training Program",
    org: "Tata Consultancy Services",
    period: "2022",
    meta: "Internal technical training and team case study",
    award: "Excellence .NET Developer award",
    points: [
      "Built and deployed an ASP.NET MVC, Entity Framework and SQL Server application in a 6-member Agile team.",
    ],
  },
];

export const skills = [
  {
    group: "Core stack",
    note: "What I use every day",
    items: ["C#", ".NET Framework", "ASP.NET MVC", "Entity Framework", "REST APIs", "SQL Server", "Microsoft Azure"],
  },
  {
    group: "Cloud, DevOps & security",
    note: "Delivered in production",
    items: ["Azure AD", "OAuth 2.0", "RBAC", "Azure Key Vault", "Azure DevOps", "CI/CD", "IIS", "IBM DB2"],
  },
  {
    group: "Also used",
    note: "Languages, tools & practices",
    items: ["JavaScript", "HTML/CSS", "Python", "Swagger", "Git", "TFS", "Agile/Scrum", "Unit & integration testing", "GitHub Copilot", "Claude Code", "ChatGPT Codex"],
  },
];

/** `year` is OPTIONAL; it is shown only when set. */
export const certifications: { name: string; issuer: string; year?: string }[] = [
  { name: "Azure AI Fundamentals (AI-900)", issuer: "Microsoft" },
  { name: "Agentic AI Associate", issuer: "Oracle" },
  { name: "Database Agentic AI", issuer: "Oracle" },
  { name: "AI Spark", issuer: "TCS" },
  { name: "AI Idea Igniter", issuer: "TCS" },
];

export const education = [
  { degree: "B.Tech, Information Technology (Lateral Entry)", school: "Anna University, Chennai" },
  { degree: "Diploma in Information Technology", school: "Directorate of Technical Education" },
];
