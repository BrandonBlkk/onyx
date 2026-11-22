# Phase 1 — Core Quality, Reliability & UX

## Goal
Improve the reliability, usability, accessibility, responsiveness, and document-output quality of Onyx without adding the later AI/job-search features.

## Step 0 — Reconnaissance (required)
- Inspect the current editor, resume data model/state, preview/rendering pipeline, export implementation, routes, styles, and package scripts.
- Inventory existing behavior. Mark each item below as already present, partially present, missing, or broken.
- Identify the highest-impact defects and propose a brief implementation plan before changing code.
- Do not duplicate existing functionality.

## Step 1 — Safe editing and state consistency
- Ensure the editor and preview use one coherent source of truth for resume data.
- Review component boundaries and extract reusable components only where it improves maintainability.
- Preserve existing data shape and template behavior.
- Add clear validation for required fields, dates, contact fields, and invalid ranges where appropriate.
- Ensure validation messages are actionable and accessible.

## Step 2 — Save feedback and autosave (if not already implemented)
- Implement reliable save behavior using the current storage/API approach.
- Debounce saves during typing; prevent stale requests from overwriting newer edits.
- Show clear states: unsaved, saving, saved, and save failure.
- Handle refresh/navigation safely and avoid falsely reporting saved state.
- Do not introduce a cloud database or authentication system in this phase unless already part of the project.

## Step 3 — Undo/redo and duplicate (if missing)
- Add undo and redo for user-visible editing operations with sensible history limits.
- Avoid recording every keystroke as a separate unusable history entry; group/debounce text changes.
- Add a duplicate/copy resume workflow that clearly names the copy and does not mutate the original.
- Test undo/redo boundaries, duplicate data independence, and all resume sections.

## Step 4 — Preview and PDF/document output
- Compare preview and exported document output.
- Fix clipping, overflow, font fallback, spacing, image sizing, page breaks, and content splitting.
- Support page size options such as A4 and US Letter if compatible with the current renderer.
- Ensure text in PDFs remains selectable/searchable whenever the rendering approach supports it.
- Handle empty content and long sections gracefully.
- Do not replace the export engine without evidence that current implementation cannot meet requirements.

## Step 5 — Responsive and accessible UX
- Check common desktop, tablet, and mobile widths.
- Make editor controls usable on narrow screens; avoid horizontal overflow.
- Provide keyboard access, visible focus, semantic headings, accessible labels, and contrast.
- Add loading, empty, success, and error states for asynchronous actions.
- Avoid unnecessary re-renders; optimise only after profiling or identifying a clear issue.

## Step 6 — Verification
- Add tests for validation, state updates, autosave race conditions, history, duplicate behavior, and export edge cases as applicable.
- Run existing lint/build/test commands and record their actual outcomes.
- Manually verify the main editing flow and export at different viewport widths.
- Review the diff for accidental changes, regressions, and sensitive data.

## Acceptance criteria
- Existing features continue working and are not duplicated.
- Resume edits do not unexpectedly disappear or overwrite newer edits.
- Save status is truthful and understandable.
- Undo/redo and duplicate (if implemented) work without corrupting source resume data.
- Preview/export output is readable, correctly paginated, and not clipped for tested cases.
- UI is usable on mobile and keyboard accessible for the main workflow.
- Validation and error feedback are clear.
- Lint/build/tests pass, or failures are explicitly documented with evidence.

## Out of scope
ATS scoring, AI writing, job matching/tailoring, cover letters, job tracking, public portfolios, multilingual features, and large architecture migrations. Those belong to later phases.
