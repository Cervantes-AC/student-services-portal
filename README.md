# University Student Services Portal

A TypeScript starter project for the University Student Services Portal. It demonstrates typed student data, generic API responses, runtime validation for untrusted data, and a safe student-status formatter.

## Requirements

- Node.js 22 or later
- npm 11 or later
- Git

## Installation

```bash
git clone <your-repository-url>
cd student-services-portal
npm install
```

## Run the project

```bash
npm run dev
```

## Quality checks

```bash
npm run typecheck
npm run lint
npm run format
npm test
npm run verify
```

`format` changes files; use `format:check` when a non-mutating format check is needed.

## Development workflow

1. Create a GitHub Issue describing the work and acceptance criteria.
2. Create a focused branch, such as `feature/student-status`.
3. Implement, understand, test, lint, format, and verify the change locally.
4. Make a meaningful commit, push the branch, and open a pull request linked to the issue.
5. Address review feedback before merging the approved pull request into `main`.

## AI usage policy

AI tools may assist development, but generated suggestions are not committed blindly. Each suggestion must be understood, reviewed, adjusted where appropriate, tested, and verified against official documentation before it is committed. The AI record and verification notes for this laboratory are in [docs/LABORATORY_REPORT.md](docs/LABORATORY_REPORT.md).
