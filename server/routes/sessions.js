
const express = require('express');
const router = express.Router();
const Session = require('../models/Session');

// Get all sessions
router.get('/', async (req, res) => {
  try {
    const sessions = await Session.find().populate('trainer', 'firstName lastName');
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user's sessions (either as trainer or member)
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const sessions = await Session.find({
      $or: [
        { member: userId },
        { trainer: userId }
      ]
    }).populate('trainer', 'firstName lastName');
    
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get upcoming sessions
router.get('/upcoming/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const currentDate = new Date();
    
    const sessions = await Session.find({
      $or: [
        { member: userId },
        { trainer: userId }
      ],
      date: { $gt: currentDate },
      status: { $in: ['confirmed', 'pending'] }
    }).sort({ date: 1 }).populate('trainer', 'firstName lastName');
    
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get past sessions
router.get('/past/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const currentDate = new Date();
    
    const sessions = await Session.find({
      $or: [
        { member: userId },
        { trainer: userId }
      ],
      $or: [
        { date: { $lt: currentDate } },
        { status: { $in: ['completed', 'missed', 'cancelled'] } }
      ]
    }).sort({ date: -1 }).populate('trainer', 'firstName lastName');
    
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new session
router.post('/', async (req, res) => {
  const session = new Session(req.body);
  
  try {
    const newSession = await session.save();
    res.status(201).json(newSession);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a session
router.put('/:id', async (req, res) => {
  try {
    const updatedSession = await Session.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!updatedSession) {
      return res.status(404).json({ message: 'Session not found' });
    }
    
    res.json(updatedSession);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a session
router.delete('/:id', async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    
    await session.remove();
    res.json({ message: 'Session deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
