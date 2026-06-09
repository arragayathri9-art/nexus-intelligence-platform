# Contributing

Thank you for your interest in contributing to Nexus Intelligence System.

## How to contribute

1. Fork the repository and clone your fork.
2. Create a feature branch:
   ```bash
git checkout -b feature/your-feature-name
```
3. Install dependencies:
   ```bash
npm install
```
4. Make your changes.
5. Run lint and build locally before submitting a pull request:
   ```bash
npm run lint
npm run build
```
6. Commit your changes with a clear message.
7. Push your branch to GitHub and open a PR against `main`.

## Reporting issues

If you find a bug or have a feature request, please open an issue in the repository.
Include a clear description, steps to reproduce, and any relevant screenshots.

## Code style

- Follow the existing React + Vite project structure.
- Keep component and file names consistent with the current codebase.
- Use `npm run lint` to validate JavaScript formatting and syntax.

## Branch naming

Use descriptive branch names such as:

- `feature/add-new-page`
- `bugfix/fix-navigation`

## Pull request checklist

- [ ] Code builds successfully
- [ ] Lint passes
- [ ] Changes are tested locally
- [ ] README updates if needed
