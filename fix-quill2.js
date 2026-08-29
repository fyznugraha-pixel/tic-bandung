const fs = require('fs');
let content = fs.readFileSync('src/components/admin/cms/BeritaForm.tsx', 'utf8');

// Remove the ts-ignore if it's there
content = content.replace('{/* @ts-ignore */}\n                <ReactQuill', '<ReactQuill');

// Cast ref to any
content = content.replace('ref={quillRef}', 'ref={quillRef as any}');

fs.writeFileSync('src/components/admin/cms/BeritaForm.tsx', content);
console.log('Fixed ReactQuill ref using any');
