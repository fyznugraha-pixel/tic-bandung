const fs = require('fs');
let content = fs.readFileSync('src/components/public/EventSubmissionForm.tsx', 'utf8');

// Change download button color
content = content.replace(
  /className="mt-4 inline-flex items-center gap-2 px-4 py-2\.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-xs text-slate-300 font-medium transition-colors"/,
  `className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 rounded-lg text-xs text-slate-900 font-bold transition-colors shadow-sm"`
);

// Change input type to file
content = content.replace(
  /<input type="url" name="commitment_letter_link" required placeholder="https:\/\/..." className="w-full px-4 py-3 bg-slate-900\/50 data-\[filled\]:bg-slate-100 data-\[filled\]:text-slate-900 border border-slate-700 data-\[filled\]:border-amber-500 rounded-xl text-white placeholder-slate-500 outline-none focus:border-emerald-500 transition-colors" \/>/,
  `<input type="file" name="commitment_letter_file" accept=".pdf,.doc,.docx" required className="w-full px-4 py-2.5 bg-slate-900/50 data-[filled]:bg-slate-100 data-[filled]:text-slate-900 border border-slate-700 data-[filled]:border-amber-500 rounded-xl text-white placeholder-slate-500 outline-none focus:border-amber-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-500 file:text-slate-900 hover:file:bg-amber-600 cursor-pointer" />`
);

// Update description for the file input
content = content.replace(
  /<p className="text-xs text-slate-400 mb-4">Mohon cantumkan link tautan surat kesediaan\.<\/p>/,
  `<p className="text-xs text-slate-400 mb-4">Mohon unggah file surat kesediaan (PDF/DOCX).</p>`
);

fs.writeFileSync('src/components/public/EventSubmissionForm.tsx', content);
console.log('Updated form');
