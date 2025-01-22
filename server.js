const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Nodemailer transport setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // Your email
    pass: 'your-email-password',   // Your email password (or use app password if 2FA enabled)
  },
});

// API route to handle signup
app.post('/api/signup', (req, res) => {
  const { name, email, password } = req.body;

  // Send email after signup
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'your-email@gmail.com',  // Send the result to your email
    subject: 'New Signup for Quiz App',
    text: `A new user has signed up!\n\nName: ${name}\nEmail: ${email}\nPassword: ${password}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      return res.status(500).json({ success: false, message: 'Error sending email' });
    }
    console.log('Email sent:', info.response);
    return res.status(200).json({ success: true, message: 'Sign-up successful and email sent' });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
