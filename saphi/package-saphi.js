// Usage: npm install --save-dev archiver && node saphi/package-saphi.js
// Crée alture-saphi.zip contenant le contenu de ./dist + saphi/manifest.json + saphi/icons/*
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const OUT = path.join(ROOT, 'alture-saphi.zip');
const MANIFEST = path.join(__dirname, 'manifest.json');
const ICONS_DIR = path.join(__dirname, 'icons');

if (!fs.existsSync(DIST)) {
  console.error('Erreur: dossier ./dist introuvable. Exécutez d\'abord votre build web dans ./dist');
  process.exit(1);
}

const output = fs.createWriteStream(OUT);
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log(`Package créé: ${OUT} (${archive.pointer()} octets)`);
});
archive.on('warning', err => {
  if (err.code === 'ENOENT') console.warn(err.message); else throw err;
});
archive.on('error', err => { throw err; });

archive.pipe(output);

// ajouter tout le contenu de dist à la racine du zip
archive.directory(DIST, false);

// ajouter manifest et icons sous un dossier saphi/ dans le zip
if (fs.existsSync(MANIFEST)) {
  archive.file(MANIFEST, { name: 'saphi/manifest.json' });
}
if (fs.existsSync(ICONS_DIR)) {
  archive.directory(ICONS_DIR, 'saphi/icons');
}

archive.finalize();
