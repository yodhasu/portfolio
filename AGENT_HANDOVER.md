# Agent Handover

## Current State

This folder contains a completed local React + Vite portfolio implementation for Alethea Agung Yodha Pratama.

Workspace path:

```text
C:\Users\mybook\Documents\Codex\2026-06-28\do-you-still-remember-our-cv
```

Local dev URL:

```text
http://127.0.0.1:5173
```

## User Intent

The user wants a professional personal portfolio that presents them as an all-rounder: capable in enterprise web delivery, AI/ML research, backend/API work, creative tooling, and digital drawing teaching.

Important positioning choices:

- Visual direction: Personal Studio.
- Contact policy: show email, GitHub, LinkedIn, and CV download; do not show phone number publicly.
- Featured project order: ReINE and Pasraman LMS first, followed by kost-simple-laravel, enlive, and DreamConnectNew.
- ReINE should eventually get a dedicated, visually strong, public-friendly explainer page.

## Implemented

- `src/App.tsx`: main app, lightweight internal routing, portfolio sections, `/reine` shell page, mobile nav.
- `src/content.ts`: structured content data for profile, nav, projects, experience, skills, credentials, and contact actions.
- `src/styles.css`: full visual system, layout, responsive behavior, and simple motion.
- `src/App.test.tsx`: tests for public contact, project ordering, main page sections, `/reine` route, and mobile menu.
- `public/ATS_Friendly_Technical_Resume-5.pdf`: downloadable CV copied from the user-provided resume.

## Verification Already Run

Commands that passed:

```powershell
npm.cmd test
npm.cmd run build
npm.cmd audit
```

Current result:

- 5 tests passed.
- Production build passed.
- 0 npm audit vulnerabilities.

Visual QA was done with Playwright fallback because Browser/IAB tools were unavailable. Desktop, mobile, `/reine`, and mobile menu open states were checked. No console errors or horizontal overflow were reported.

## ReINE Follow-up

The `/reine` page is intentionally only a factual shell for now. Do not expand it into a full explainer until the user provides the latest ReINE paper draft.

When the draft is provided:

1. Analyze the paper first.
2. Extract accurate public claims, results, limitations, and terminology.
3. Rewrite for non-ML readers with plain-English sections.
4. Add animated/visual explanations of:
   - frozen host model
   - residual MicroAdapters
   - adapter insertion points
   - behavior/evaluation flow
   - comparison against heavier fine-tuning or LoRA, only if supported by the draft
5. Keep the page static unless the user explicitly asks for backend functionality.

## Development Notes

- Use `npm.cmd` on this Windows machine because PowerShell may block the `npm.ps1` shim.
- Keep profile/contact data in `src/content.ts` rather than hardcoding repeated copy.
- Keep phone number off the public site unless the user explicitly changes the contact policy.
- The app uses simple route detection for `/` and `/reine`, not React Router.
- The project is currently not initialized as a Git repository unless the user does that later.

## Useful Commands

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd test
npm.cmd run build
npm.cmd audit
```
