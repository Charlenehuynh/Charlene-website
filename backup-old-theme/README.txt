BACKUP — cream & terracotta theme (the version before the periwinkle redesign)
Saved: 13 August 2026

WHAT'S IN HERE
  style.css    the old css/style.css, exactly as it was before the redesign
  index.html   the old index.html, exactly as it was before the redesign

These are copies only. Nothing in here is loaded by the site — the live site
uses css/style.css and index.html in the main folder.

TO GO BACK TO THE OLD LOOK
  1. Copy style.css from this folder over css/style.css
  2. Copy index.html from this folder over index.html
  3. In work/erp-odoo.html, work/ai-reporting.html and work/prototyping.html,
     delete the three <link> lines that point to fonts.googleapis.com /
     fonts.gstatic.com, just above the stylesheet link.

The three files in work/ were NOT otherwise changed by the redesign — the only
edit to them was adding those font links, so they don't need a backup copy.

The last git commit (f8cd50c "Initial site") also holds a version of these
files, but it is older: it does not include the edits that were already sitting
uncommitted in the folder before the redesign started. The copies in this
folder are the true "just before the redesign" state.
