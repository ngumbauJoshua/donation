```text
# Donation (static-site dump) — Organizer & Preview

This repository currently contains a static-site dump (a scraped or downloaded copy of a live site). The included files and script help you rearrange the content into a conventional static-site layout so the repository ZIP is immediately useful and easy to preview.

What was added
- scripts/organize.sh — organizes files into public/{assets,css,js,vendor,other}.
- package.json — convenience scripts to run the organizer and serve the `public/` folder.
- public/index.html — placeholder index (created only if no index.html exists).
- .gitignore — ignores typical local/dev artifacts.
- LICENSE — MIT license.

Quick start (after downloading the ZIP or pulling this branch)
1. Ensure Node.js (>=12) and npm are installed.
2. From repository root:
   - npm ci
   - # Review the planned moves (dry run)
     npm run organize
   - # To apply moves without a prompt:
     npm run organize -- --yes
   - # Preview the reorganized site
     npm start
   - Open http://localhost:5000

What the organizer does
- Creates `public/` and these subfolders:
  - public/assets (images and font files)
  - public/assets/fonts
  - public/css
  - public/js
  - public/vendor/<hostname> (for host-like directories)
  - public/other (anything unclassified)
- Moves top-level assets and host-named folders into the appropriate public/ subfolders.
- If an index.html exists at repository root it is moved to public/index.html; otherwise a placeholder is created.
- The script prints a plan first and prompts for confirmation (pass --yes to skip prompts).
- The script moves files (not delete), so you can recover by examining git / backups.

Notes & cautions
- The script does not rewrite HTML or CSS links. After organizing you may need to update asset paths in HTML/CSS/JS manually.
- The script excludes common repo files and folders (e.g., .git, .github, package.json, scripts/).
- If you are unsure, commit the current repo state, then run the organizer so changes are tracked and reversible.

If you want me to:
- Prepare a branch and open the PR for you, I can provide the patch/commit contents you can apply or (if you explicitly allow) produce and push a PR. For now this message contains the full files so you can apply them locally.
```
