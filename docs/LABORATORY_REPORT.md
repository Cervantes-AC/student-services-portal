# Laboratory 1 Report

## Environment record

- Git: `2.49.0.windows.1`
- Node.js: `v22.20.0`
- npm: `11.6.3`
- TypeScript: `6.0.3`

## Generic API responses

`ApiResponse<T>` preserves the type of its `data` field. Thus, `ApiResponse<Student>` exposes one student and `ApiResponse<Student[]>` exposes an array, with both checked by TypeScript. In contrast, `data: any` turns off useful type checking and can allow incorrect values to travel through the program unnoticed.

## Runtime validation

`isStudent` accepts `unknown` data and validates an object, finite numeric `id`, non-empty `name`, email string, and permitted status before narrowing it to `Student`. The project demonstrates a valid student, an invalid student whose `id` is a string, and an invalid student missing `name`. An interface is erased when TypeScript is compiled, so it cannot inspect data arriving from an API at runtime; external data needs validation before the program trusts it.

## Git ignore rationale

- `node_modules/`: installed packages can be restored from `package-lock.json` and are too large to commit.
- `dist/`: generated build output should be recreated from source.
- `.env`: commonly holds secrets and environment-specific configuration.
- `*.log`: transient diagnostic output is not source code.
- `.DS_Store` and `coverage/`: operating-system metadata and generated coverage output do not belong in source control.

## GitHub Issue record

**Title:** Add student-status formatter

**Description:** The application should return a user-friendly label for a student's status.

**Acceptance criteria:**

- `active` returns `Active Student`.
- `inactive` returns `Inactive Student`.
- Invalid or unexpected values are handled safely.

Create this issue in the GitHub repository, then link the pull request to it with `Closes #<issue-number>`.

## AI-assisted development record

**AI tool:** OpenAI Codex

**Prompt used:** “Suggest a TypeScript implementation for converting a student's active/inactive status into a readable label. Explain the implementation and include possible edge cases. Do not use the `any` type.”

**AI recommendation:** Define `type StudentStatus = 'active' | 'inactive'` and use a `switch` to return `Active Student` or `Inactive Student`. For data that may not yet be validated, accept `unknown` and return a safe fallback for values other than the two known strings.

**What I understood:** A union type prevents a typed caller from passing an unsupported status. A `switch` makes each known case visible, while the `default` path protects the user interface if a value comes from untrusted data. The function is small enough to test directly without a library.

**Recommendation accepted:** The union and `switch` approach were accepted.

**Recommendation modified:** The final `getStudentStatusLabel` accepts `unknown`, rather than only `StudentStatus`, so it meets the requirement to handle unexpected runtime values safely.

**Recommendation rejected:** No use of `any` was accepted.

**Reason:** `any` would bypass TypeScript's safety checks and would make it easier to treat malformed external data as valid.

## AI verification record

**Claim/code verified:** `unknown` requires narrowing before it can be used as a specific type, and a user-defined type predicate can narrow a value after runtime checks.

**Source:** [TypeScript Handbook: Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) and [TypeScript Handbook: Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html).

**Result:** The documentation supports using `unknown` at the boundary and using `value is Student` as the return type of `isStudent`. The implementation avoids `any`, performs property checks at runtime, and is covered by the project's tests.

## Pull request description template

```markdown
## Summary

Add a user-friendly formatter for student status.

## What changed

- Added `getStudentStatusLabel` with active, inactive, and safe fallback behavior.
- Added automated checks for known and unexpected statuses.

## Testing performed

- `npm run verify`

## AI usage

Codex suggested the union/switch structure. The implementation was reviewed, modified to accept `unknown`, tested, and verified against the TypeScript Handbook.

## Known limitations

The project uses a small hand-written test helper; a larger application should adopt a full test runner.

## Related issue

Closes #<issue-number>
```

## Reflection

### 1. What was the most important difference between your previous programming workflow and the Git/GitHub workflow used in this laboratory?

Previously, changes could remain only on one computer and be difficult to explain later. Git records intentional snapshots with meaningful messages, while GitHub gives the team a shared place to discuss and review them. This workflow makes the reason for a change as visible as the code itself.

### 2. Why was the feature branch useful?

The feature branch isolated the status formatter from the stable `main` branch. I could test and revise the feature without mixing it with unrelated work. It also created a clear unit of review for the pull request.

### 3. Did the AI provide any suggestion that required modification? Explain.

The original typed formatter could accept only `StudentStatus`, which is appropriate for already validated values. I modified its parameter to `unknown` so it can safely handle an unexpected value supplied at runtime. The default result now communicates an unknown status instead of assuming that every value is valid.

### 4. How did TypeScript help detect or prevent a possible problem?

The `StudentStatus` union limits typed status values to `active` and `inactive`. The generic API response retains whether its payload is one student or an array of students. These checks make accidental misuse visible during development instead of after deployment.

### 5. Why was runtime validation still necessary?

Type annotations are removed from JavaScript when the project runs. An API or form can still provide a string for an id or omit a required property. The `isStudent` guard checks the real value before the application treats it as a student.

### 6. What information should never be placed in the repository?

Passwords, API keys, access tokens, and private configuration must never be committed. Personal data and production database exports also require careful handling and usually do not belong in source control. The `.env` rule helps prevent a common accidental secret disclosure.

### 7. Which step of Ask → Understand → Review → Modify → Test → Verify → Commit was the most important to you?

Testing was the most important step because it gave evidence that the formatter handles both expected and unexpected values. It also checked the runtime validator's positive and negative cases. Testing makes an AI suggestion accountable to observable behavior rather than trusting its wording.

### 8. How could this workflow improve a group software-development project?

Issues make tasks and acceptance criteria visible before coding begins. Branches and pull requests let teammates review a focused change without interrupting other development. Shared linting, formatting, tests, and documented AI use create consistent standards across the project.
