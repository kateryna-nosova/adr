# Feature Flags POC

A small Git-based feature flag configuration POC.

## Structure

- `test1/`, `test2/`, `test3/` — ERP-specific bank configuration
- `matrix/` — read-only matrix UI for GitHub Pages
- `scripts/generate-matrix.js` — generates matrix data from the JSON source files
- `.github/workflows/deploy-pages.yml` — builds and deploys the matrix to GitHub Pages

## Run locally

```bash
node scripts/generate-matrix.js
python3 -m http.server 8000 -d matrix
```

Then open `http://localhost:8000`.

## GitHub Pages

Push the repository to GitHub, then enable Pages with **GitHub Actions** as the source.

Every push to `main` regenerates the matrix and deploys `matrix/` to GitHub Pages.

The JSON files are the source of truth. `matrix/flags.json` is generated output and should not be edited manually.
