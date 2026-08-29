const fs = require('fs');
let content = fs.readFileSync('src/app/actions/log.ts', 'utf8');

if (!content.includes('import { revalidatePath }')) {
  content = content.replace(
    'import { checkIsSuperAdmin } from "./admin";',
    'import { checkIsSuperAdmin } from "./admin";\nimport { revalidatePath } from "next/cache";'
  );
  fs.writeFileSync('src/app/actions/log.ts', content);
  console.log('Fixed log.ts imports');
}
