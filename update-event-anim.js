const fs = require('fs');
const file = 'src/app/(public)/event/page.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('ScrollReveal')) {
  content = content.replace(
    "import { Montserrat } from 'next/font/google';",
    "import { Montserrat } from 'next/font/google';\nimport { ScrollReveal } from '@/components/ui/animations/ScrollReveal';"
  );
}

// Wrap Timeline Section
content = content.replace(
  '<!-- Timeline Section -->\n            <section',
  '<ScrollReveal>\n            {/* Timeline Section */}\n            <section'
).replace(
  '{/* Timeline Section */}\n            <section',
  '<ScrollReveal>\n            {/* Timeline Section */}\n            <section'
).replace(
  '</section>\n          </div>\n\n          {/* Right Column: Submission Form',
  '</section>\n            </ScrollReveal>\n          </div>\n\n          {/* Right Column: Submission Form'
);

// Wrap Submission Form
content = content.replace(
  '<div className="w-full lg:w-1/3 mt-12 lg:mt-0">\n            <div className="sticky top-32">',
  '<div className="w-full lg:w-1/3 mt-12 lg:mt-0">\n            <ScrollReveal delay={0.2} className="sticky top-32">'
).replace(
  '</EventSubmissionForm>\n              </div>\n            </div>\n          </div>',
  '</EventSubmissionForm>\n              </div>\n            </ScrollReveal>\n          </div>'
);

fs.writeFileSync(file, content);
console.log('Updated event/page.tsx');
