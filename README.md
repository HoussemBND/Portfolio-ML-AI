# Portfolio

A portfolio site for AI Quality / Model Evaluation roles. Built with Next.js, TypeScript and Tailwind CSS.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the site locally with live reload |
| `npm run build` | Builds the production site and validates every project file |
| `npm run check` | Lint, type check and build, the same checks CI runs |
| `npm run check:links` | Checks every external link in the project files |

## Fill in your details

The site shows amber `TODO` markers wherever a fact is missing. They go away as you fill these in.

| What | Where |
| --- | --- |
| Name, university, graduation date, GitHub, LinkedIn, email | [src/lib/site.ts](src/lib/site.ts) |
| CV | Put the PDF in `public/` (for example `public/cv.pdf`) and set `cvUrl: "/cv.pdf"` in `src/lib/site.ts` |
| Years of experience | Edit `summary` and set `yearsConfirmed: true` in `src/lib/site.ts` |
| Bio and work history | [src/app/about/page.tsx](src/app/about/page.tsx) |
| Skill notes marked TODO | [src/lib/skills.ts](src/lib/skills.ts) |

## Add or update a project

Each project is one file in `content/projects/`. See [content/projects/README.md](content/projects/README.md).

When a project is finished, set `status: live` in its file. The build then requires a result, a date, a link, and the "How I tested it" and "What broke and what I learned" sections. Skills that the project uses get their "Project" tag automatically.

To embed a demo in a write-up, which loads only when the visitor clicks:

```mdx
<Demo src="https://your-space.hf.space" title="Drift report demo" />
```

## Connect the contact form

The form sends email through [Resend](https://resend.com). Until it is connected, the form tells visitors to use another route.

1. Create a Resend account and an API key.
2. Copy `.env.example` to `.env.local` and fill in `RESEND_API_KEY` and `CONTACT_TO_EMAIL`.
3. Restart `npm run dev` and send yourself a test message.

Add the same values in your host's settings when you deploy. Never commit `.env.local`.

## Deploy

The PRD's plan is GitHub for the code and Vercel for hosting.

1. Put the code on GitHub:

   ```bash
   git init
   git add .
   git commit -m "Initial portfolio site"
   ```

   Create an empty repository on GitHub, then follow its "push an existing repository" instructions.

2. In Vercel, choose "Add New Project" and import the repository. The defaults work.

3. In the Vercel project settings, add these environment variables:

   | Name | Value |
   | --- | --- |
   | `NEXT_PUBLIC_SITE_URL` | The site's public address, for example `https://yourname.dev` |
   | `RESEND_API_KEY` | Your Resend key |
   | `CONTACT_TO_EMAIL` | Where contact messages go |
   | `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Optional, for Plausible analytics |

4. Every push to `main` deploys. Every pull request gets its own preview address.

GitHub also runs two workflows from `.github/workflows/`: `ci.yml` (lint, type check and build on every push and pull request) and `links.yml` (a monthly check for broken links).

## Go public

Until launch, the site tells search engines not to index it. The PRD's launch gate is a finished Drift Detector.

When you are ready:

1. Clear the TODO markers on the site (name, links, CV, work history).
2. Set the Drift Detector to `status: live` with its results.
3. Set `launched: true` in [src/lib/site.ts](src/lib/site.ts). This turns on indexing and the sitemap.
