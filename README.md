# Karthika Mohanamuthu: Portfolio

Personal portfolio for Karthika Mohanamuthu, .NET Developer & Azure Engineer.

Live: https://karthika-portfolio-seven-tan.vercel.app

Built with Next.js (App Router), Tailwind CSS v4 and Motion.

## Editing content

All copy lives in [`src/lib/data.ts`](src/lib/data.ts). Some fields are optional and only appear on the site once filled in:

| Field | What it does |
| --- | --- |
| `profile.resumeUrl` | Shows "Résumé" buttons. Put the PDF in `public/` and set e.g. `"/Karthika-Mohanamuthu-Resume.pdf"`. |
| `profile.github` | Adds a GitHub link in the contact section. |
| `caseStudy.outcomes` | Adds a results row to the case study, e.g. `{ value: "12", label: "applications migrated" }`. |
| `certifications[].year` | Shows the year next to each certification's issuer. |
| `personalProject.liveUrl` / `repoUrl` | Adds "Live site" / "Source code" buttons to the Dance Academy project. |

Years of experience are calculated in the browser from `profile.careerStart`, so the number stays current automatically.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

## Deploying

```bash
vercel deploy --prod
```
