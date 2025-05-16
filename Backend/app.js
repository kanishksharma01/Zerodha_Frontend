const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { User } = require('./models/userModel'); // Import the User model

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Database connection setup
mongoose.connect('mongodb+srv://KanishkZerodha:KanishkZerodha100@zerodhaclonecluster.lcgdkxs.mongodb.net/zerodha?retryWrites=true&w=majority&appName=ZerodhaCloneCluster', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("DB connected"))
  .catch((err) => console.log("DB connection error:", err));

// POST /signup route
app.post('/signup', async (req, res) => {
  const { fullName, email, phone, password } = req.body;

  // Validate input fields
  if (!fullName || !email || !phone || !password) {
    return res.status(400).json({ message: "Please fill in all fields." });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password using bcryptjs
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      fullName,
      email,
      phone,
      password: hashedPassword, // Store hashed password
    });

    // Save the new user to the database
    await newUser.save();

    return res.status(200).json({ message: "Signup successful!" });
  } catch (err) {
    console.error("Error signing up:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
