# Nexus Intelligence System

A React + Vite dashboard application for global intelligence, disaster monitoring, sports, space, cyber, and news insights.

## Requirements

- Node.js 18.x or newer
- npm 10.x or newer
- A GitHub repository for pushing the code

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Then open the local URL shown in the terminal.

## Build

```bash
npm run build
```

## Preview production bundle

```bash
npm run preview
```

## GitHub push checklist

1. Create or verify `.gitignore` exists and excludes `node_modules/`, build output, logs, and editor files.
2. Commit the repository files:
   ```bash
git add .
git commit -m "Initial commit"
```
3. Set the default branch and push to GitHub:
   ```bash
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
``` 
4. Push to GitHub:
   ```bash
git push -u origin main
```

## GitHub Actions

This repository now includes a workflow at `.github/workflows/nodejs.yml` to run lint and build on pushes and pull requests.

## Project structure

- `src/` - React components, pages, layouts, styles, services, and utilities
- `public/` - static assets
- `package.json` - dependencies and scripts
- `package-lock.json` - exact dependency versions for reproducible installs
- `.gitattributes` - line ending normalization for collaboration
- `.gitignore` - ignored files for Git
- `LICENSE` - repository license
- `CONTRIBUTING.md` - contribution guidelines

## License

This project is licensed under the MIT License. See `LICENSE` for details.

## Contributing

Please see `CONTRIBUTING.md` for contribution guidelines, branch naming, and PR checklist details.

## Notes

- Use `npm ci` in CI environments for reproducible installs.
- Keep `package-lock.json` committed to ensure consistent dependency resolution.
