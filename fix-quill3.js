const fs = require('fs');
let content = fs.readFileSync('src/components/admin/cms/BeritaForm.tsx', 'utf8');

// 1. Add const ReactQuillAny = ReactQuill as any; below the dynamic import
content = content.replace(
  'const ReactQuill = dynamic(() => import(\'react-quill-new\'), { ssr: false });',
  'const ReactQuill = dynamic(() => import(\'react-quill-new\'), { ssr: false });\nconst ReactQuillAny = ReactQuill as any;'
);

// 2. Change <ReactQuill to <ReactQuillAny
content = content.replace('<ReactQuill \n                  ref={quillRef as any}', '<ReactQuillAny \n                  ref={quillRef}');
content = content.replace('</ReactQuill>', '</ReactQuillAny>');

fs.writeFileSync('src/components/admin/cms/BeritaForm.tsx', content);
console.log('Fixed ReactQuill ref using ReactQuillAny');
