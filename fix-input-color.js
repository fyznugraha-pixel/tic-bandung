const fs = require('fs');
let content = fs.readFileSync('src/components/public/EventSubmissionForm.tsx', 'utf8');

// 1. Add onChange handler to form
content = content.replace(
  /const handleSubmit = async/,
  `const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    if (target.value) {
      target.setAttribute('data-filled', 'true');
    } else {
      target.removeAttribute('data-filled');
    }
  };

  const handleSubmit = async`
);

content = content.replace(
  /<form onSubmit=\{handleSubmit\}/,
  `<form onSubmit={handleSubmit} onChange={handleChange}`
);

// 2. Replace classes for all inputs and textareas
// We will replace `bg-slate-900/50` with `bg-slate-900/50 data-[filled]:bg-white data-[filled]:text-slate-900 data-[filled]:border-amber-500`
content = content.replace(
  /bg-slate-900\/50 border border-slate-700 rounded-xl text-white/g,
  `bg-slate-900/50 data-[filled]:bg-slate-100 data-[filled]:text-slate-900 border border-slate-700 data-[filled]:border-amber-500 rounded-xl text-white`
);

fs.writeFileSync('src/components/public/EventSubmissionForm.tsx', content);
console.log('Fixed input color');
