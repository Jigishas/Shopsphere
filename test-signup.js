const http = require('http');

// Test data
const testData = JSON.stringify({
  name: 'Test User API',
  email: 'testapi@example.com',
  password: 'TestPass123'
});

// Request options
const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/users/signup',


  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(testData),
    'Origin': 'http://localhost:5173'
  }
};

console.log('Testing signup API...');
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
      
      if (res.statusCode === 201) {
        console.log('\n✅ SIGNUP TEST PASSED!');
        console.log('Token received:', parsed.token ? 'Yes' : 'No');
        console.log('User created:', parsed.user ? 'Yes' : 'No');
      } else if (res.statusCode === 400 && parsed.message === 'User already exists') {
        console.log('\n⚠️  User already exists (expected if running test multiple times)');
      } else {
        console.log('\n❌ SIGNUP TEST FAILED');
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
