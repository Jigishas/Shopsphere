const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Products = require('./model/products');
const User = require('./model/users');
const userRouter = require('./Routers/UsersRouter');
const router = require('./Routers/productRouter');

require('dotenv').config();

// const app = express();
// const PORT = 5000;


// app.use(bodyParser.json());
// app.use(express.json());

// app.use(cors());
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  return res.status(200).send("Backend is running...");
});

app.use(bodyParser.json());
app.use(express.json());

const allowedOrigins = [
  process.env.CLIENT_URL,
  'https://shopsphere-ye71.vercel.app',
  'https://shopsphere-p12m.onrender.com',
  'http://localhost:5173'
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(new Error('CORS policy: This origin is not allowed'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.get('/', (req, res) => {
  res.send('Backend is running...');
});

app.use('/api', router);


// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {   
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};
connectDB();
// Remove any catch-all middleware that would short-circuit route handling.
app.get('/api/health', (req, res) => {
  const mongoState = mongoose.connection.readyState; // 0 = disconnected, 1 = connected
  res.status(200).json({ status: 'ok', mongoState });
});
// The cors middleware handles preflight requests automatically
app.use('/api/users', userRouter);

// Login endpoint

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password (in a real app, compare hashed passwords)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin }
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});


// Contact form endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // In a real application you'd persist this to a database or send an email.
  // For now, return a success response so the frontend receives confirmation.
  try {
    // TODO: implement saving or emailing the contact message (e.g., nodemailer)
    return res.status(200).json({ message: 'Contact message received' });
  } catch (error) {
    console.error('Error handling contact form:', error);
    return res.status(500).json({ message: 'Error processing contact form', error: error.message });
  }

});

// Use the Products model directly for fetching products to resolve the unused import warning
app.get('/api/products-direct', async (req, res) => {
   try {
    const products = await Products.find();
    res.status(200).json(products);
 } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
   }
 });





app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
