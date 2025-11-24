#!/usr/bin/env bash
# Organizer script to move files from repo root into public/{assets,css,js,vendor,other}
# Usage:
#   bash scripts/organize.sh      # interactive (shows plan, prompts)
#   bash scripts/organize.sh --yes  # apply without prompt
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/.."
PUBLIC_DIR="$SCRIPT_DIR/public"

# Exclude list (don't move these)
EXCLUDE_NAMES=(
  ".git"
  ".github"
  "node_modules"
  "scripts"
  "package.json"
  "package-lock.json"
  "README.md"
  ".gitignore"
  "LICENSE"
)

# File type groups
CSS_EXT="css"
JS_EXT="js"
IMG_EXTS="png jpg jpeg gif svg webp bmp"
FONT_EXTS="woff woff2 ttf eot otf"
HTML_EXTS="html htm"

# Create target structure
mkdir -p "$PUBLIC_DIR/assets" "$PUBLIC_DIR/css" "$PUBLIC_DIR/js" "$PUBLIC_DIR/vendor" "$PUBLIC_DIR/other" "$PUBLIC_DIR/assets/fonts"

is_excluded() {
  local name="$1"
  for e in "${EXCLUDE_NAMES[@]}"; do
    if [[ "$name" == "$e" ]]; then
      return 0
    fi
  done
  return 1
}

mv_safe() {
  local src="$1"
  local dst="$2"
  if [[ ! -e "$src" ]]; then
    return
  fi
  mkdir -p "$(dirname "$dst")"
  if [[ -e "$dst" ]]; then
    echo "[skip] target exists: $dst"
    return
  fi
  echo "Moving: $src  ->  $dst"
  mv -n "$src" "$dst"
}

plan_moves() {
  echo "Scanning repository root for files/folders to organize..."
  PLANS=()
  # files
  shopt -s nullglob
  for f in "$SCRIPT_DIR"/*; do
    name="$(basename "$f")"
    if is_excluded "$name"; then
      # skip
      continue
    fi
    if [[ -f "$f" ]]; then
      ext="${name##*.}"
      ext_lc="$(echo "$ext" | tr '[:upper:]' '[:lower:]')"
      if [[ " $HTML_EXTS " =~ " $ext_lc " ]]; then
        # prefer index.html if present
        if [[ "$name" == "index.html" || "$name" == "index.htm" ]]; then
          PLANS+=("$f -> $PUBLIC_DIR/index.html")
        else
          PLANS+=("$f -> $PUBLIC_DIR/other/$name")
        fi
      elif [[ "$ext_lc" == "$CSS_EXT" ]]; then
        PLANS+=("$f -> $PUBLIC_DIR/css/$name")
      elif [[ "$ext_lc" == "$JS_EXT" ]]; then
        PLANS+=("$f -> $PUBLIC_DIR/js/$name")
      elif [[ " $IMG_EXTS " =~ " $ext_lc " ]]; then
        PLANS+=("$f -> $PUBLIC_DIR/assets/$name")
      elif [[ " $FONT_EXTS " =~ " $ext_lc " ]]; then
        PLANS+=("$f -> $PUBLIC_DIR/assets/fonts/$name")
      else
        PLANS+=("$f -> $PUBLIC_DIR/other/$name")
      fi
    elif [[ -d "$f" ]]; then
      # directories with a dot in their name look like hostnames (cdn) -> vendor
      if [[ "$name" == *.* ]]; then
        PLANS+=("$f -> $PUBLIC_DIR/vendor/$name")
      else
        PLANS+=("$f -> $PUBLIC_DIR/other/$name")
      fi
    fi
  done
  shopt -u nullglob

  # Check for index.html in root: if not present, we'll create placeholder
  if [[ ! -f "$SCRIPT_DIR/index.html" && ! -f "$SCRIPT_DIR/index.htm" ]]; then
    PLANS+=("[placeholder] create $PUBLIC_DIR/index.html (if none exist)")
  fi
}

show_plan() {
  echo "Planned actions:"
  for p in "${PLANS[@]}"; do
    echo "  - $p"
  done
}

apply_moves() {
  echo "Applying moves..."
  shopt -s nullglob
  for f in "$SCRIPT_DIR"/*; do
    name="$(basename "$f")"
    if is_excluded "$name"; then
      continue
    fi
    if [[ -f "$f" ]]; then
      ext="${name##*.}"
      ext_lc="$(echo "$ext" | tr '[:upper:]' '[:lower:]')"
      if [[ " $HTML_EXTS " =~ " $ext_lc " ]]; then
        if [[ "$name" == "index.html" || "$name" == "index.htm" ]]; then
          mv_safe "$f" "$PUBLIC_DIR/index.html"
        else
          mv_safe "$f" "$PUBLIC_DIR/other/$name"
        fi
      elif [[ "$ext_lc" == "$CSS_EXT" ]]; then
        mv_safe "$f" "$PUBLIC_DIR/css/$name"
      elif [[ "$ext_lc" == "$JS_EXT" ]]; then
        mv_safe "$f" "$PUBLIC_DIR/js/$name"
      elif [[ " $IMG_EXTS " =~ " $ext_lc " ]]; then
        mv_safe "$f" "$PUBLIC_DIR/assets/$name"
      elif [[ " $FONT_EXTS " =~ " $ext_lc " ]]; then
        mv_safe "$f" "$PUBLIC_DIR/assets/fonts/$name"
      else
        mv_safe "$f" "$PUBLIC_DIR/other/$name"
      fi
    elif [[ -d "$f" ]]; then
      if [[ "$name" == *.* ]]; then
        mv_safe "$f" "$PUBLIC_DIR/vendor/$name"
      else
        mv_safe "$f" "$PUBLIC_DIR/other/$name"
      fi
    fi
  done
  shopt -u nullglob

  # create placeholder index.html if none moved/exists
  if [[ ! -f "$PUBLIC_DIR/index.html" ]]; then
    echo "Creating placeholder public/index.html"
    cat > "$PUBLIC_DIR/index.html" <<'HTML'
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Project — Placeholder index</title>
  <style>
    body{font-family:Arial,Helvetica,sans-serif;margin:40px}
    code{background:#f1f1f1;padding:2px 6px;border-radius:4px}
  </style>
</head>
<body>
  <h1>Project organized</h1>
  <p>This is a generated placeholder index. The repository has been reorganized into the <code>public/</code> folder.</p>
  <ul>
    <li><a href="./css/">public/css/</a></li>
    <li><a href="./js/">public/js/</a></li>
    <li><a href="./assets/">public/assets/</a></li>
    <li><a href="./vendor/">public/vendor/</a></li>
    <li><a href="./other/">public/other/</a></li>
  </ul>
  <p>See the repository README for next steps (editing link paths in HTML may be required).</p>
</body>
</html>
HTML
  fi
  echo "Done."
}

# MAIN
plan_moves
show_plan

APPLY="no"
if [[ "${1:-}" == "--yes" || "${1:-}" == "-y" ]]; then
  APPLY="yes"
fi

if [[ "$APPLY" == "no" ]]; then
  read -p "Proceed with the above moves? (y/N) " yn
  case "$yn" in
    [Yy]* ) APPLY="yes" ;;
    * ) APPLY="no" ;;
  esac
fi

if [[ "$APPLY" == "yes" ]]; then
  apply_moves
else
  echo "Aborted. No changes made."
  exit 0
fi
