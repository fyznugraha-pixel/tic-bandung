const fs = require('fs');
let content = fs.readFileSync('src/proxy.ts', 'utf8');

const target = `export async function proxy(request: NextRequest) {
  return await updateSession(request)
}`;

const replacement = `export async function proxy(request: NextRequest) {
  // Update session and check auth rules
  const response = await updateSession(request);
  
  // App-wide Security Headers
  const securityHeaders = {
    'X-Frame-Options': 'DENY',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;",
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
  };

  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}`;

content = content.replace(target, replacement);

fs.writeFileSync('src/proxy.ts', content);
console.log('Updated proxy.ts');
