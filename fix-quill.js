const fs = require('fs');
let content = fs.readFileSync('src/components/admin/cms/BeritaForm.tsx', 'utf8');

content = content.replace(
  '<ReactQuill \n                  ref={quillRef}',
  '{/* @ts-ignore */}\n                <ReactQuill \n                  ref={quillRef}'
);

fs.writeFileSync('src/components/admin/cms/BeritaForm.tsx', content);
console.log('Fixed ReactQuill error');
