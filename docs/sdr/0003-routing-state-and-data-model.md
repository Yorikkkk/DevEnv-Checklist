# SDR 0003: Routing, State, and Data Model

## Context
The application needs to handle different tech stacks (Frontend, Node.js, Python), categories (Software, CLI, Extensions), tool dependencies, and user-added custom steps, all within a Single Page Application.

## Decision
- **Routing**: No client-side routing. The application uses a single main view (`index.html`). The active stack is managed via state.
- **Data Model**:
  - `demoData`: An array of stack objects. Each stack has an `id`, `name`, `description`, and `tools` array.
  - `Tool`: An object with `id`, `name`, `description`, `category` (Софт, CLI, Розширення), and `dependencies` (array of tool IDs).
- **State Model** (saved in localStorage):
  - `devenv_theme`: "light" or "dark".
  - `devenv_progress`: Object mapping tool IDs to boolean `true`.
  - `devenv_custom_steps`: Object mapping stack IDs to an array of custom `Tool` objects.

## Consequences
- **Pros**: Everything is accessible immediately. Filtering and searching are fast since all data is in memory after initial load.
- **Cons**: All data is loaded upfront. This is perfectly fine given the small dataset.

## Requirements touched
- FR-01: List available stacks.
- FR-03, FR-04: Search and filter.
- FR-05: Custom steps.
- BR-01: Dependency locking.

## Rejected options and why
- **URL-based Routing (e.g., `/#/frontend`)**: Rejected for simplicity. The app is small enough that managing active stack in standard JS state is sufficient. We could add it later if deep-linking is requested.
