const fs = require('fs');
const path = require('path');
const root = __dirname;
const uploads = path.join(root, 'uploads');
const previews = path.join(root, 'previews');
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);

for (const folder of [uploads, previews]) fs.mkdirSync(folder, { recursive: true });
const previewNames = new Set(fs.readdirSync(previews).filter(name => fs.statSync(path.join(previews, name)).isFile()));
const files = fs.readdirSync(uploads)
  .filter(name => fs.statSync(path.join(uploads, name)).isFile())
  .map(name => {
    const stats = fs.statSync(path.join(uploads, name));
    const base = path.basename(name, path.extname(name));
    const matchedPreview = ['.webp', '.png', '.jpg', '.jpeg'].map(ext => `${base}${ext}`).find(candidate => previewNames.has(candidate));
    const originalIsImage = imageExtensions.has(path.extname(name).toLowerCase());
    return { name, size: stats.size, updated: stats.mtimeMs, preview: matchedPreview ? { folder: 'previews', name: matchedPreview } : (originalIsImage ? { folder: 'uploads', name } : null) };
  })
  .sort((a,b) => b.updated - a.updated);
fs.writeFileSync(path.join(root, 'files.json'), JSON.stringify({ files }, null, 2) + '\n');
console.log(`Created files.json for ${files.length} file(s).`);
