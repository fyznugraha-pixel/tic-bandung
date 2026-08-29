const fs = require('fs');

const updateFile = (path, replacements) => {
  if (!fs.existsSync(path)) return;
  let content = fs.readFileSync(path, 'utf8');
  replacements.forEach(rep => {
    content = content.replace(rep.regex, rep.newText);
  });
  fs.writeFileSync(path, content);
};

// 1. CategoryListingUI.tsx
updateFile('src/components/public/CategoryListingUI.tsx', [
  {
    regex: /<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">/,
    newText: '<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">'
  }
]);

// 2. Kategori Page
updateFile('src/app/(public)/kategori/page.tsx', [
  {
    regex: /<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-\[250px\]">/g,
    newText: '<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 auto-rows-[250px]">'
  }
]);

// 3. Home Page (News section)
updateFile('src/app/(public)/page.tsx', [
  {
    regex: /className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"/,
    newText: 'className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8"'
  }
]);

// 4. EkonomiKreatifUI.tsx
updateFile('src/components/public/EkonomiKreatifUI.tsx', [
  {
    regex: /<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">/,
    newText: '<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">'
  }
]);

// 5. TripPlannerUI.tsx
updateFile('src/components/public/TripPlannerUI.tsx', [
  {
    regex: /className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"/g,
    newText: 'className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6"'
  }
]);

console.log('Mobile grids updated');
