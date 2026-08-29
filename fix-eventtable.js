const fs = require('fs');

let content = fs.readFileSync('src/components/admin/EventTable.tsx', 'utf8');

content = content.replace(/deleteEventAction\(id\)/g, 'deleteEventAction(id, title)');
content = content.replace(/status: result.status as string/g, 'status: result.newStatus as string');

fs.writeFileSync('src/components/admin/EventTable.tsx', content);

console.log('Fixed EventTable.tsx');
