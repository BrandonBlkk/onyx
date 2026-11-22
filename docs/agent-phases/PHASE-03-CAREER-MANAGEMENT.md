# Phase 3 — Resume Versions, Import & Job Application Management

## Goal
Help users organise resume variants, import existing documents, preserve revision history, and track applications. This phase may introduce persistent storage only after reviewing current storage and migration needs.

## Step 0 — Inspect and design
- Audit current resume persistence, data model, authentication (if any), import/export support, and UI.
- Confirm which capabilities already exist and avoid duplicate implementation.
- Propose a storage/data model and migration/backup plan before changing persistence.
- Do not assume users have accounts. Keep the experience compatible with current architecture or ask owner before introducing account requirements.

## Step 1 — Resume version management
- Allow users to name versions for roles, industries, or applications.
- Create, rename, duplicate, archive, and delete versions with confirmation for destructive actions.
- Make version data independent and avoid accidental edits affecting another version.
- Support a useful list/search/filter experience if the number of resumes grows.

## Step 2 — Version history and restore
- Record meaningful snapshots or revisions without excessive storage growth.
- Show timestamps and a concise change summary where feasible.
- Allow restoring a prior revision with confirmation.
- Ensure restore creates a recoverable state and does not silently destroy current content.
- If persistence is local-only, explain its limitations.

## Step 3 — Import existing resume
- Determine supported formats based on reliable libraries and current architecture (PDF and DOCX are preferred candidates).
- Validate file size, extension, MIME type, and signature; reject unsupported or unsafe files.
- Extract text and map likely content to resume fields with confidence indicators.
- Do not silently discard unmatched content; show an import review screen and let users correct mapping.
- Preserve privacy: process locally where feasible; if server or third-party processing is used, disclose it and request consent.
- Imported documents must not execute embedded scripts or active content.

## Step 4 — Job application tracker
- Create application records with role, company, job URL, location (optional), date applied, status, notes, and linked resume version.
- Provide statuses such as Saved, Applied, Interview, Assessment, Offer, Rejected, and Withdrawn; allow configuration only if it remains simple.
- Provide list/board views, filtering, sorting, search, and status changes.
- Track interviews, dates, and reminders only with user-controlled permissions.
- Validate URLs and dates, and avoid scraping job sites or sending applications automatically.

## Step 5 — Integration with Phase 2
- Let users associate a tailored resume and cover letter with an application.
- Allow opening a job record and seeing its linked resume version.
- Keep edits to one application’s resume from affecting other records.

## Step 6 — Verification
- Test version isolation, archive/delete confirmations, history restore, import parsing/mapping, invalid uploads, and tracker transitions.
- Test persistence, refresh, and recovery behavior.
- Test access control and privacy if accounts or remote storage are introduced.
- Add migration/rollback tests if schema changes.
- Run lint/build/tests and report real results.

## Acceptance criteria
- Users can manage separate resume variants safely.
- Previous revisions can be restored without losing current data.
- Imports are secure and user-reviewed, with unsupported content surfaced.
- Applications can be created, updated, searched, filtered, and linked to a resume version.
- No application/resume data leaks across users if authentication is implemented.
- Storage changes are backward-compatible or have a documented migration and recovery path.

## Out of scope
Public portfolio publishing, QR codes, multilingual translation, interview coaching, automatic job scraping, and automatic job applications.
