#!/bin/bash

set -e

cd "$(dirname "$0")"

git add .

if git diff --cached --quiet; then
  echo "No changes to commit."
else
  git commit -m "Update site: $(date '+%Y-%m-%d %H:%M:%S')"
  git push
fi

rsync -avz --delete ./ username@yourserver.uncc.edu:/path/to/public_html/

echo "Done: committed, pushed, and synced to production."
