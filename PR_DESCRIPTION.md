Title: Adaptation Saphi (TV) — UI, manifest et packaging

This PR contains:
- a TV-optimized UI skeleton under /dist (index, styles, tv-focus.js)
- saphi/manifest.json (basic Saphi manifest)
- saphi/package-saphi.js and package.json: packaging script to generate alture-saphi.zip
- placeholder icons under saphi/icons/

Notes:
- Replace /dist with your webapp build output.
- Icons can be replaced by final assets.
- Manifest is generic; platform may require extra fields.

Checklist before merge:
- [ ] Replace ./dist with the final app build (npm run build:web)
- [ ] Add final icons into saphi/icons
- [ ] Run npm install --save-dev archiver && npm run package:saphi to generate alture-saphi.zip
- [ ] Test the zip on a Saphi device or via Philips developer portal
