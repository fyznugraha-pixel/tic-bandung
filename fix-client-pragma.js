const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.ts') || file.endsWith('.tsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('./src/components/admin');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Fix use client pragma
    if (content.includes('"use client"') || content.includes("'use client'")) {
        // Remove all instances
        content = content.replace(/"use client";?\r?\n/g, '');
        content = content.replace(/'use client';?\r?\n/g, '');
        // Add to top
        content = '"use client";\n' + content;
    }

    // Fix async handleDelete
    content = content.replace(/const handleDelete = \(\) => {/g, 'const handleDelete = async () => {');
    content = content.replace(/const handleDelete = \(id: string\) => {/g, 'const handleDelete = async (id: string) => {');
    content = content.replace(/const handleDelete = \(id: string, title: string\) => {/g, 'const handleDelete = async (id: string, title: string) => {');
    content = content.replace(/const handleDelete = \(email: string\) => {/g, 'const handleDelete = async (email: string) => {');
    content = content.replace(/const handleDelete = \(id: string, name: string\) => {/g, 'const handleDelete = async (id: string, name: string) => {');

    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log(`Fixed ${file}`);
    }
});
