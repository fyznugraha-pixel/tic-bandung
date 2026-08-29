const fs = require('fs');
let content = fs.readFileSync('src/components/public/EventSubmissionForm.tsx', 'utf8');

// Replace date inputs to include style={{ colorScheme: 'dark' }}
content = content.replace(
  /<input type="date" name="start_date" required className="w-full px-4 py-3 bg-slate-900\/50 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-500 transition-colors" \/>/g,
  `<input type="date" name="start_date" required style={{ colorScheme: 'dark' }} className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-500 transition-colors" />`
);

content = content.replace(
  /<input type="date" name="end_date" required className="w-full px-4 py-3 bg-slate-900\/50 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-500 transition-colors" \/>/g,
  `<input type="date" name="end_date" required style={{ colorScheme: 'dark' }} className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white outline-none focus:border-amber-500 transition-colors" />`
);

fs.writeFileSync('src/components/public/EventSubmissionForm.tsx', content);
console.log('Fixed date icon color');
