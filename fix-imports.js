const fs = require('fs');
let content = fs.readFileSync('src/components/admin/AdminManagementClient.tsx', 'utf8');

content = content.replace(
  "import { Trash2, UserPlus, Shield, User, Loader2, AlertCircle } from 'lucide-react';",
  "import { Trash2, UserPlus, Shield, User, Loader2, AlertCircle } from 'lucide-react';\nimport { formatDistanceToNow, differenceInMinutes } from 'date-fns';\nimport { id } from 'date-fns/locale';"
);

fs.writeFileSync('src/components/admin/AdminManagementClient.tsx', content);
console.log('Fixed imports');
