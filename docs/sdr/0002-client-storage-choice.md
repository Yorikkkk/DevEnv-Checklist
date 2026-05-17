# SDR 0002: Client Storage Choice

## Context
The application needs to store the user's checklist progress, their custom added steps, and their theme preference across page reloads.

## Decision
We chose **localStorage**.

## Options considered
1. **In-memory**: Does not persist across reloads.
2. **sessionStorage**: Only persists for the current tab session.
3. **localStorage**: Persists across sessions for the same browser/origin.
4. **IndexedDB**: More robust for large datasets or offline-first sync.
5. **External Backend**: Out of scope per constraints.

## Consequences
- **Pros**: Very easy to implement (JSON.stringify/parse), perfectly fits the "single-user, simple queries, modest records count" criteria.
- **Cons**: Data is tied to the specific browser and device. Clearing browser data will reset progress (which is acceptable for this scope).

## Requirements touched
- BR-02: State changes must be automatically saved in `localStorage`.
- FR-07: Reset flow must clear the data.

## Rejected options and why
- **IndexedDB**: Rejected because the dataset is small (a few dozen tools) and queries are simple array filters. `localStorage` is sufficient and explicitly required by the business rules.
