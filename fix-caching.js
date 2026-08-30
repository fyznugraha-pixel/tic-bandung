const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('src/app/(public)', function(filePath) {
  if (filePath.endsWith('page.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    if (content.includes("export const dynamic = 'force-dynamic';")) {
      content = content.replace("export const dynamic = 'force-dynamic';", "");
      changed = true;
    }
    if (content.includes('export const dynamic = "force-dynamic";')) {
      content = content.replace('export const dynamic = "force-dynamic";', "");
      changed = true;
    }
    
    if (content.includes("export const revalidate = 0;")) {
      content = content.replace("export const revalidate = 0;", "export const revalidate = 3600; // Cache for 1 hour");
      changed = true;
    }
    
    if (changed) {
      fs.writeFileSync(filePath, content);
      console.log('Fixed caching in: ' + filePath);
    }
  }
});
