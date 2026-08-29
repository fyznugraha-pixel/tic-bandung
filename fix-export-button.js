const fs = require('fs');
let content = fs.readFileSync('src/components/admin/EventSubmissionTable.tsx', 'utf8');

content = content.replace(
  /return \(\s*<div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">/,
  `return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button 
          onClick={exportToExcel}
          className="px-4 py-2 bg-[#217346] hover:bg-[#1e6b41] text-white font-bold rounded-lg text-sm flex items-center gap-2 shadow-sm transition-colors"
        >
          <Download className="w-4 h-4" /> Export Excel
        </button>
      </div>
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">`
);

content = content.replace(
  /<\/div>\s*<\/div>\s*<\/table>\s*<\/div>\s*<\/div>\s*\);\s*\}/,
  `          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}`
);

fs.writeFileSync('src/components/admin/EventSubmissionTable.tsx', content);
console.log('Fixed export button JSX');
