// Test script to verify environment variables
console.log('Testing environment variables...\n');

const requiredVars = [
  'SMTP_HOST',
  'SMTP_PORT', 
  'SMTP_USER',
  'SMTP_PASS',
  'SMTP_FROM',
  'CONTACT_EMAIL'
];

let allGood = true;

requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: Set`);
  } else {
    console.log(`❌ ${varName}: Missing`);
    allGood = false;
  }
});

console.log('\n' + (allGood ? '✅ All environment variables are set!' : '❌ Some environment variables are missing!'));

if (!allGood) {
  console.log('\nPlease check your Vercel environment variables or local .env file.');
} 