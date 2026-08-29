const fs = require('fs');
let content = fs.readFileSync('src/app/actions/event.ts', 'utf8');

// Replace createEventAction insert payload
content = content.replace(
  /const title = formData.get\("title"\) as string;/,
  `const title = formData.get("title") as string;
    const start_date = formData.get("start_date") as string;
    const end_date = formData.get("end_date") as string;
    const destination_id = formData.get("destination_id") as string || null;
    const organizer = formData.get("organizer") as string;
    const location = formData.get("location") as string;
    const pic_name = formData.get("pic_name") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const email = formData.get("email") as string;
    const instagram = formData.get("instagram") as string;
    const kol_partner = formData.get("kol_partner") as string;
    const artist_performance = formData.get("artist_performance") as string;
    const usp = formData.get("usp") as string;
    const target_visitors = formData.get("target_visitors") ? parseInt(formData.get("target_visitors") as string) : null;
    const execution_count = formData.get("execution_count") ? parseInt(formData.get("execution_count") as string) : null;
    const promotion_media = formData.get("promotion_media") as string;
    const attachment_link = formData.get("attachment_link") as string;
    const commitment_letter_link = formData.get("commitment_letter_link") as string;`
);

content = content.replace(
  /const start_date = formData.get\("start_date"\) as string;\s*const end_date = formData.get\("end_date"\) as string;\s*const destination_id = formData.get\("destination_id"\) as string \|\| null;\s*const organizer = formData.get\("organizer"\) as string;/,
  ``
);

// We need to carefully replace the insert and update payload for events.
// A node script to fully rewrite is safer.
