const fs = require('fs');
let content = fs.readFileSync('src/components/public/EventSubmissionForm.tsx', 'utf8');

// Replace proposal file input
content = content.replace(
  /<p className="text-xs text-slate-400 mb-4">Maks 10MB \(PDF\/Image\)<\/p>\s*<div className="relative">\s*<input type="file" name="proposal_file" required accept="\.pdf,image\/\*" className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-500\/10 file:text-amber-500 hover:file:bg-amber-500\/20 cursor-pointer" \/>\s*<\/div>/,
  `<p className="text-xs text-slate-400 mb-4">Mohon cantumkan link Google Drive/Dropbox.</p>
            <div className="relative">
              <input type="url" name="attachment_link" required placeholder="https://..." className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 outline-none focus:border-amber-500 transition-colors" />
            </div>`
);

// Replace commitment file input
content = content.replace(
  /<p className="text-xs text-slate-400 mb-4">Maks 10MB \(PDF\/Image\)<\/p>\s*<div className="relative">\s*<input type="file" name="commitment_file" required accept="\.pdf,image\/\*" className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-500\/10 file:text-emerald-500 hover:file:bg-emerald-500\/20 cursor-pointer" \/>\s*<\/div>/,
  `<p className="text-xs text-slate-400 mb-4">Mohon cantumkan link tautan surat kesediaan.</p>
            <div className="relative">
              <input type="url" name="commitment_letter_link" required placeholder="https://..." className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 outline-none focus:border-emerald-500 transition-colors" />
            </div>`
);

fs.writeFileSync('src/components/public/EventSubmissionForm.tsx', content);
console.log('Fixed EventSubmissionForm.tsx');
