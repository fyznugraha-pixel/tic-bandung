const fs = require('fs');
let content = fs.readFileSync('src/app/(public)/destinasi/[slug]/page.tsx', 'utf8');

// 1. Change max-w-[1200px] to max-w-[1600px]
content = content.replace(
  /<div className="max-w-\[1200px\] mx-auto px-4 md:px-8 py-12">/,
  `<div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 py-12">`
);

// 2. Add founded_year to Informasi Penting
const addressSection = `{/* Alamat Lanjutan */}`;
const foundedYearSection = `
                {/* Tahun Berdiri */}
                {dest.founded_year && (
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#4f4635] uppercase tracking-wider mb-1">Tahun Berdiri</p>
                      <p className="font-medium text-lg text-[#1b1c1a]">
                        {dest.founded_year}
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Alamat Lanjutan */}`;

content = content.replace(addressSection, foundedYearSection);

fs.writeFileSync('src/app/(public)/destinasi/[slug]/page.tsx', content);
console.log('Fixed slug layout and added founded_year');
