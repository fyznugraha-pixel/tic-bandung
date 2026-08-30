const fs = require('fs');
let c = fs.readFileSync('src/components/public/EventSubmissionForm.tsx', 'utf8');

c = c.replace(
  '<div className="pt-6 mt-6 border-t border-slate-700 flex justify-end">',
  '<div className="pt-6 mt-6 border-t border-slate-700 flex justify-center md:justify-end">'
);

c = c.replace(
  'className="px-8 py-3 bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-900 font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"',
  'className="w-full md:w-auto px-8 py-3 bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-900 font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"'
);

fs.writeFileSync('src/components/public/EventSubmissionForm.tsx', c);
console.log('Centered submit button on mobile');
