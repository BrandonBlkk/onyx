# Phase 2 — AI Resume Intelligence & Job Tailoring

## Goal
Add optional, trustworthy AI-assisted tools that improve resume content and help tailor a resume to a target job. Do not build job tracking or public portfolios in this phase.

## Step 0 — Audit and plan
- Inspect current resume schema, editor interactions, backend routes, export, configuration, and any existing AI functionality.
- Confirm what already exists. Do not recreate existing capabilities.
- Write a short design plan, including data flow, provider choice (if one is configured), privacy, cost, and test strategy.
- Ask the owner before selecting a paid provider, adding billing, or requiring credentials. Prefer provider abstraction and environment-based configuration.

## Step 1 — AI service foundation (only if needed)
- Keep AI calls on the server; never expose provider secrets in client bundles.
- Create a small provider/service abstraction with clear timeouts and error handling.
- Validate request/response shapes. Treat model output as untrusted and parse into a constrained schema.
- Add rate limiting, request-size limits, and safe error messages.
- Do not send resume data to an AI provider without clear user consent and disclosure.
- If credentials are unavailable, implement interface, validation, and mocked tests; do not pretend live AI is working.

## Step 2 — AI writing assistant
- Provide opt-in actions for improving selected text: rewrite, grammar, concise, professional tone, achievement-oriented, or summary generation.
- Preserve facts. Never invent metrics, dates, employers, certifications, achievements, or skills.
- Show original and proposed text side-by-side, with accept/reject/edit controls.
- Keep changes reversible and integrate with editor history.
- Provide user instructions to supply missing specifics instead of fabricating them.

## Step 3 — Job-description analysis
- Allow users to paste a job description and optionally enter role/company context.
- Extract a structured list of required/preferred skills, responsibilities, qualifications, and keywords.
- Clearly label extraction as suggestions, not definitive hiring criteria.
- Avoid storing the job description unless the user chooses to save it.
- Validate length and reject empty/unsupported input with useful feedback.

## Step 4 — Resume match and ATS-oriented checks
- Compare job requirements with the resume content.
- Show matched, missing, and related skills/keywords; distinguish exact matches from inferred matches.
- Give transparent scoring methodology; don't present a score as a guaranteed ATS outcome or hiring prediction.
- Check common structural/readability issues: headings, text extraction, contact information, dates, excessive columns/graphics where relevant, and section completeness.
- Explain each issue and show a concrete correction.
- Never claim to simulate a specific ATS unless there is verified integration.

## Step 5 — Tailored resume workflow
- Suggest which existing facts/sections are most relevant to the target role.
- Allow users to approve suggested edits individually.
- Produce a new resume version or copy; never overwrite the original automatically.
- Keep all claims truthful and traceable to source resume content.
- Show job-description context and the tailoring result clearly.

## Step 6 — Cover letter (if within scope/time)
- Generate a draft using the resume and job description with explicit user consent.
- Do not fabricate company knowledge or accomplishments.
- Allow editing, regenerate selected paragraphs, and export using current document pipeline.
- Provide clear disclaimers that generated content requires review.

## Step 7 — Verification
- Unit-test parsing, schema validation, scoring, matching, and safeguards against fabricated details.
- Test provider failure, timeouts, rate limits, empty responses, malformed output, and large inputs.
- Test privacy/consent behavior and ensure secrets are not exposed.
- Test accept/reject, undo, and creating tailored copies without altering the original.
- Run lint/build/tests and document whether live provider tests were possible.

## Acceptance criteria
- AI tools are optional and user-controlled.
- AI output is validated, reviewable, editable, and never applied without approval.
- Resume facts are not fabricated; uncertain/missing information is surfaced.
- ATS/match results explain their reasoning and are not presented as guarantees.
- Original resume remains intact; tailoring creates a separate version.
- Privacy, costs, provider configuration, and limitations are documented.
- All checks are run and results reported.

## Out of scope
Application tracking, public resume websites, QR sharing, multilingual translation, interview practice, and unrelated database/auth migrations.
