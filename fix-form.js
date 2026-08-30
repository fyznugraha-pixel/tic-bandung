const fs = require('fs');
let content = fs.readFileSync('src/components/public/EventSubmissionForm.tsx', 'utf8');

content = content.replace(/className="bg-slate-800\/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-700 shadow-2xl space-y-10 relative overflow-hidden"/g, 'className="space-y-10 relative"');

content = content.replace(/<div className="pt-6 mt-6 border-t border-slate-700">/g, '<div className="pt-6 mt-6 border-t border-slate-700 flex justify-end">');

content = content.replace(/className="w-full sm:w-auto px-10 py-4 bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-900 font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"/g, 'className="px-8 py-3 bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-900 font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"');

fs.writeFileSync('src/components/public/EventSubmissionForm.tsx', content);
console.log('Fixed event form frame and button');
