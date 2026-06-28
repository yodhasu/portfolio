# Alethea Agung Yodha Pratama Portfolio

Personal portfolio website for Alethea Agung Yodha Pratama, built as a React + Vite static site.

## What It Includes

- Main portfolio page with hero, profile summary, featured projects, experience, creative teaching, skills, credentials, and contact.
- Dedicated `/reine` shell page for the future ReINE public explainer.
- Downloadable CV at `public/ATS_Friendly_Technical_Resume-5.pdf`.
- Mobile navigation menu.
- Tests for key content and routing behavior.

## Tech Stack

- React 19
- Vite
- TypeScript
- Vitest
- Testing Library
- Playwright, used for local visual QA
- lucide-react icons

## Run Locally

```powershell
npm.cmd install
npm.cmd run dev
```

Open:

```text
http://127.0.0.1:5173
```

ReINE shell page:

```text
http://127.0.0.1:5173/reine
```

## Verification

```powershell
npm.cmd test
npm.cmd run build
npm.cmd audit
```

Last verified:

- `npm.cmd test`: 5 tests passed.
- `npm.cmd run build`: production build passed.
- `npm.cmd audit`: 0 vulnerabilities.

## Project Structure

```text
src/
  App.tsx        Main portfolio and ReINE route components
  content.ts     Profile, projects, experience, skills, and contact data
  styles.css     Full site styling and responsive behavior
  main.tsx       React entrypoint
  test/          Vitest setup
public/
  ATS_Friendly_Technical_Resume-5.pdf
```

## Next Planned Work

After the latest ReINE paper draft is provided, replace the current `/reine` shell with a public-friendly explainer page that includes plain-English explanation, visuals, animation, results context, and limitations.
