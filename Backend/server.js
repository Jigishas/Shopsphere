const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const router = require('./Routers/routers');
require('dotenv').config();


const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: '*',
  Credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']

}));
app.use(bodyParser.json());
app.use(express.json());
app.use('/', router);
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


// Signup endpoint
app.post('/api/signup', (req, res) => {
  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Create new user
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password, // In a real app, hash the password
    createdAt: new Date()
  };

  //users.push(newUser);
  const savedUser=() =>{
    try{
      newUser.save();
      console.log('User saved successfully');
    } catch (error){
      console.error('Error saving user:', error);
    }
  }


  res.status(201).json({
    message: 'User created successfully',
    user: { id: newUser.id, name: newUser.name, email: newUser.email }
  });
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Find user
  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Check password (in a real app, compare hashed passwords)
  if (user.password !== password) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  res.status(200).json({
    message: 'Login successful',
    user: { id: user.id, name: user.name, email: user.email }
  });
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
