const fs = require('fs');
const file = 'src/components/home/HeroSlider.tsx';
let content = fs.readFileSync(file, 'utf8');

// Add import
if (!content.includes('BlurText')) {
  content = content.replace("import { Montserrat } from 'next/font/google';", "import { Montserrat } from 'next/font/google';\nimport { BlurText } from '@/components/ui/animations/BlurText';");
}

// Replace the H1
const oldH1 = `<h1 className={\`\${montserrat.className} text-6xl md:text-7xl lg:text-[100px] font-bold text-white leading-[1.05] mb-8 drop-shadow-xl animate-hero-title\`}>
              Bandung,<br/>
              kota penuh<br/>
              <span className="italic text-[#f5be45]">pesona.</span>
            </h1>`;

const newH1 = `<h1 className={\`\${montserrat.className} text-6xl md:text-7xl lg:text-[100px] font-bold text-white leading-[1.05] mb-8 drop-shadow-xl\`}>
              <BlurText text="Bandung," delay={0} className="block" />
              <BlurText text="kota penuh" delay={0.2} className="block" />
              <span className="italic text-[#f5be45] block">
                <BlurText text="pesona." delay={0.4} />
              </span>
            </h1>`;

content = content.replace(oldH1, newH1);

fs.writeFileSync(file, content);
console.log('Updated HeroSlider with BlurText');
