const fs = require('fs');
let content = fs.readFileSync('src/app/actions/eventSubmission.ts', 'utf8');

// The action has this logic:
// const proposalFile = formData.get("proposal_file") as File | null;
// const commitmentFile = formData.get("commitment_file") as File | null;
// let attachment_link = null;
// let commitment_letter_link = null;
// ... file upload logic ...

content = content.replace(
  /const proposalFile = formData\.get\("proposal_file"\) as File \| null;[\s\S]*?commitment_letter_link = publicUrlData\.publicUrl;\s*\}\s*\}/,
  `const attachment_link = formData.get("attachment_link") as string;
    const commitment_letter_link = formData.get("commitment_letter_link") as string;`
);

fs.writeFileSync('src/app/actions/eventSubmission.ts', content);
console.log('Fixed eventSubmission.ts');
