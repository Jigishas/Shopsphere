const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const Product = require('./model/products');
const User = require('./model/users');
//const router = require('./Routers/routers');
require('dotenv').config();


const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: [
   'Content-Type',
   'Authorization',
   'X-Requested-With',
   'Accept',
   'Origin',
   'Access-Control-Request-Method',
   'Access-Control-Request-Headers'
  ],
  preflightContinue: false,
  optionsSuccessStatus: 204
}
));

// The cors middleware handles preflight requests automatically

app.use(bodyParser.json());
app.use(express.json());

//app.use('/', router);
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
    process.exit(1); // Exit process with failure
  }
};
connectDB();


// The cors middleware handles preflight requests automatically

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password // In a real app, hash the password
    });

    const savedUser = await newUser.save();

    res.status(201).json({
      message: 'User created successfully',
      user: { id: savedUser._id, name: savedUser.name, email: savedUser.email }
    });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

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
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// Get all users (for testing purposes)
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Contact form endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }


  // Simulate email sending delay
  setTimeout(() => {
    // For now, we'll always succeed for testing
    // In production, uncomment the nodemailer code below
    res.status(200).json({ message: 'Message sent successfully' });

    
    // Create transporter (uncomment for production)
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com', // Replace with your email
        pass: 'your-app-password' // Replace with your app password
      }
    });

    // Email options
    const mailOptions = {
      from: email,
      to: 'Jigishaflamings336@gmail.com',
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Failed to send message' });
      }
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Message sent successfully' });
    });
    
  }, 1000); // 1 second delay to simulate email sending
});

// Product CRUD routes

// GET all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// GET single product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
});

// POST create new product
app.post('/api/products', async (req, res) => {
  try {
    const { id, name, category, price, originalPrice, image, badge, isDeal } = req.body;
    const newProduct = new Product({
      id,
      name,
      category,
      price,
      originalPrice,
      image,
      badge,
      isDeal
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
});

// PUT update product
app.put('/api/products/:id', async (req, res) => {
  try {
    const { id, name, category, price, originalPrice, image, badge, isDeal } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { id, name, category, price, originalPrice, image, badge, isDeal },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
});

// DELETE product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
