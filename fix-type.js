const fs = require('fs');
let content = fs.readFileSync('src/components/admin/AdminManagementClient.tsx', 'utf8');

const target = `type AdminUser = {
  id: string;
  user_id: string;
  email: string;
  role: string;
  created_at: string;
};`;

const replacement = `type AdminUser = {
  id: string;
  user_id: string;
  email: string;
  role: string;
  created_at: string;
  last_seen?: string;
};`;

content = content.replace(target, replacement);

// I should also check if the import at the top is exactly as I added it
// Let's fix the imports if they got duplicated
const importTarget1 = `import { UserPlus, Shield, User, Trash2, AlertCircle, Loader2 } from "lucide-react";
import { formatDistanceToNow, differenceInMinutes } from "date-fns";
import { id } from "date-fns/locale";`;

const importReplacement1 = `import { UserPlus, Shield, User, Trash2, AlertCircle, Loader2 } from "lucide-react";
import { formatDistanceToNow, differenceInMinutes } from "date-fns";
import { id } from "date-fns/locale";`;

fs.writeFileSync('src/components/admin/AdminManagementClient.tsx', content);
console.log('Fixed AdminUser type');
