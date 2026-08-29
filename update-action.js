const fs = require('fs');
let content = fs.readFileSync('src/app/actions/eventSubmission.ts', 'utf8');

// Replace commitment_letter_link extraction with file upload logic
const oldLogicRegex = /const commitment_letter_link = formData\.get\("commitment_letter_link"\) as string;/;
const newLogic = `
    let commitment_letter_link = "";
    const commitmentLetterFile = formData.get("commitment_letter_file") as File;
    
    if (commitmentLetterFile && commitmentLetterFile.size > 0) {
      const fileExt = commitmentLetterFile.name.split('.').pop();
      const fileName = \`surat_kesediaan_\${Date.now()}.\${fileExt}\`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('event_submissions')
        .upload(fileName, commitmentLetterFile);
        
      if (uploadError) {
        console.error("Storage upload error:", uploadError);
        return { error: "Gagal mengunggah file surat kesediaan." };
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from('event_submissions')
        .getPublicUrl(fileName);
        
      commitment_letter_link = publicUrl;
    } else {
      // Fallback in case old form is still cached
      const fallbackLink = formData.get("commitment_letter_link") as string;
      if (fallbackLink) {
        commitment_letter_link = fallbackLink;
      }
    }
`;

content = content.replace(oldLogicRegex, newLogic);
fs.writeFileSync('src/app/actions/eventSubmission.ts', content);
console.log('Updated action');
