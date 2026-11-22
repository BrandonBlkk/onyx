# Phase 4 — Portfolio Publishing & Career Extras

## Goal
Add opt-in public presentation and supplementary career tools after the core builder, AI tools, and management workflows are stable.

## Step 0 — Scope and safety review
- Inspect existing publishing, sharing, profile, language, and career-related functionality.
- Identify already implemented items and only work on gaps.
- Before any public feature, define privacy defaults, unpublish/delete behavior, access controls, abuse prevention, and data minimisation.
- Ask the owner to approve hosting/domain, storage, third-party services, and cost-bearing choices.

## Step 1 — Public resume / portfolio page
- Allow users to publish an explicitly selected resume version as a public page.
- Default to private/unpublished.
- Provide a preview and explicit publish confirmation.
- Support unpublish, delete, and update workflows.
- Do not expose contact details or sensitive fields unless the user explicitly enables them.
- Add basic metadata and accessible responsive design.
- Avoid leaking internal IDs, draft content, or other resumes.

## Step 2 — Share links and QR code
- Generate a stable share link for a published page.
- Generate a QR code pointing to that link and allow download/print.
- Consider revocable links or token rotation if privacy requires it.
- Validate link behavior when a resume is unpublished or deleted.
- Do not create a QR code that exposes private resumes.

## Step 3 — Portfolio project showcase
- Allow project entries with title, description, skills, links, and optional media.
- Validate URLs, file types, and sizes.
- Keep content editable and optional.
- Ensure the page remains useful without images or external embeds.

## Step 4 — Multi-language support
- Audit UI and resume-content language assumptions.
- Add locale infrastructure rather than scattering literal strings.
- Support appropriate date/number formats and font fallback.
- For translation of resume content, use explicit review and preserve names, employers, dates, metrics, and technical terms.
- Never auto-translate or overwrite the original language version.
- Do not claim a translation is professionally certified.

## Step 5 — Interview preparation
- Offer optional practice questions derived from a user-selected role and job description.
- Group questions by competency and provide sample answer structure (e.g., STAR) without inventing personal experiences.
- Provide feedback on clarity and completeness, not guaranteed hiring outcomes.
- If AI is used, follow Phase 2 privacy, consent, security, validation, and provider rules.

## Step 6 — Verification
- Test publish/unpublish, public/private data visibility, link revocation, QR destinations, deletion, and access-control boundaries.
- Test portfolio content validation and responsive accessibility.
- Test language switching, fallback fonts, layout, and preservation of original text.
- Test interview tool behavior with absent credentials and malformed AI responses.
- Run all available lint/build/test checks.

## Acceptance criteria
- Publishing is opt-in and privacy-preserving.
- Only user-approved content appears publicly.
- Users can unpublish/delete and invalidate sharing as documented.
- QR codes resolve only to intended published pages.
- Portfolio pages are responsive and accessible.
- Language features preserve original resume content and support review.
- Interview practice is clearly supplemental and avoids fabricating personal answers.
- Checks and limitations are reported.

## Out of scope
Paid subscriptions, complex analytics, job scraping, automated applications, and large-scale platform rewrites unless separately approved.
