
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all trainers
router.get('/trainers', async (req, res) => {
  try {
    const trainers = await User.find({ role: 'trainer' }).select('-password');
    res.json(trainers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Register a new user
router.post('/register', async (req, res) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const user = new User(req.body);
    
    // In a real app, you'd hash the password here
    // user.password = await bcrypt.hash(user.password, 10);
    
    const newUser = await user.save();
    
    // Don't return the password
    const userResponse = newUser.toObject();
    delete userResponse.password;
    
    res.status(201).json(userResponse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // In a real app, you'd verify the password with bcrypt here
    // const isMatch = await bcrypt.compare(password, user.password);
    
    // For simplicity, we're just checking direct equality
    const isMatch = password === user.password;
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // In a real app, you'd generate and return a JWT token here
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    // Don't return the password
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.json({
      user: userResponse,
      token: 'mock-token-for-development'
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  try {
    // If password is being updated, you'd hash it here
    // if (req.body.password) {
    //   req.body.password = await bcrypt.hash(req.body.password, 10);
    // }
    
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select('-password');
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    await user.remove();
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
