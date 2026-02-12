const http = require('http');

// Test data - using the same credentials from signup test
const testData = JSON.stringify({
  email: 'testapi@example.com',
  password: 'TestPass123'
});

// Request options
const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(testData),
    'Origin': 'http://localhost:5173'
  }
};

console.log('Testing login API...');
console.log('Request:', options);
console.log('Data:', testData);

const req = http.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  console.log(`Headers: ${JSON.stringify(res.headers)}`);
  
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:', data);
    try {
      const parsed = JSON.parse(data);
      console.log('Parsed Response:', JSON.stringify(parsed, null, 2));
      
      if (res.statusCode === 200) {
        console.log('\n✅ LOGIN TEST PASSED!');
        console.log('User logged in:', parsed.user ? 'Yes' : 'No');
        console.log('User name:', parsed.user?.name);
      } else {
        console.log('\n❌ LOGIN TEST FAILED');
        console.log('Error:', parsed.message);
      }
    } catch (e) {
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('Error:', error.message);
});

req.write(testData);
req.end();
