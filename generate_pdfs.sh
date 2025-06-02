#!/usr/bin/env bash
set -e
echo "🖨️  Generating PDF suite..."
mkdir -p pdfs
for md in docs/*.md; do
  out="pdfs/$(basename "${md%.md}").pdf"
  npx pandoc-bin "$md" -o "$out" \
     --from markdown --template eisvogel --pdf-engine=xelatex
  echo "  • $(basename "$out")"
done
echo "✅ PDF generation complete"