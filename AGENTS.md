# Onyx Agent Instructions

## Project
Onyx is a resume-building / visual resume generator. Repository is split into:
- `client/`: React, JavaScript/JSX, Vite, Tailwind CSS.
- `server/`: Node.js and Express API.

## Mandatory workflow
1. Before editing, inspect the current repository structure, relevant source files, package scripts, dependencies, and git status.
2. Read the applicable phase instructions under `docs/agent-phases/` before implementation.
3. Treat the current code as the source of truth. Do not assume a feature is absent based on this roadmap; verify first.
4. Do not reimplement, remove, or regress existing functionality. If a proposed feature already exists, improve it only if the phase explicitly calls for improvements and there is a demonstrable issue.
5. Plan the work in small steps. Implement one coherent task at a time and keep changes scoped to the phase.
6. Follow the existing code conventions and architecture unless there is a clear reason to change them. Avoid introducing dependencies without explaining why they are needed.
7. Never commit secrets, API keys, tokens, credentials, private user data, or real resume content.
8. Use environment variables for secrets and document new variables in an example env file without real values.
9. Validate inputs on both client and server when applicable. Treat uploaded files and imported content as untrusted.
10. Provide accessible labels, keyboard support, clear feedback, loading/empty/error states, and responsive layouts for new UI.
11. Preserve resume data and document output fidelity. Avoid destructive migrations; provide safe migration/backward-compatibility paths if storage changes.
12. Do not invent external API responses. If an integration is not configured, provide a safe, clearly communicated fallback.
13. Keep code readable, modular, and testable. Add/update tests for behavior, edge cases, and regression risks.
14. Run the relevant lint, test, build, and/or manual checks available in the repo. Do not claim checks passed unless they were run successfully.
15. If blocked by missing credentials, services, or unclear requirements, stop at the boundary, explain the blocker, and implement safe work that does not require it.

## Completion report
At the end of each task, report:
- What was inspected and changed.
- Features/files added or modified.
- Any dependencies or environment variables added and why.
- Tests/checks run and their results.
- Known limitations, follow-up tasks, and any decisions requiring the owner's approval.

## Phase execution
Execute phases in order unless the owner explicitly requests otherwise. Each phase file defines its scope and acceptance criteria. Do not automatically begin the next phase after completing one; report results and wait for direction.
