# SDR 0001: Stack Choice

## Context
The application "DevEnv Checklist" requires a frontend to display stacks, filter tools, track progress, add custom steps, and toggle themes. It must be deployed to GitHub Pages without a backend. The UI needs to be responsive, interactive, and fast.

## Decision
We chose **Plain HTML, CSS, and Vanilla JavaScript** as the stack.

## Options considered
1. **Plain HTML, CSS, Vanilla JS**: Simplest approach, no build step, perfectly fits the requirement of a single main view with moderate state complexity.
2. **Vite + Vanilla JS**: Adds a build step, better module organization.
3. **Vite + React**: Good for complex component reuse, but overkill for a checklist app.

## Consequences
- **Pros**: Zero setup, easy to deploy, fast load times, very easy to understand for beginners.
- **Cons**: Manual DOM manipulation in `app.js` can become verbose if the app grows significantly.

## Requirements touched
- NFR-01: Opens in modern browsers without server part.
- NFR-02: Fast interactions (< 200ms).

## Rejected options and why
- **Vite/React**: Rejected because the requirements (FR-01 to FR-10) define a relatively simple state (filters, list of items, theme). The UI composition is not complex enough to warrant React. Plain JS is adequate and more aligned with the `requirements-to-github-pages` simplicity principle.
