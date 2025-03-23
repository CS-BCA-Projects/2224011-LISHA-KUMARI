// routes/adminRoutes.js
import express from 'express';
import Report from '../models/Report.js';
import User from '../models/User.js';
import { isAdmin } from './middlewares/authMiddleware.js';

const router = express.Router();

// Get all reported items
router.get('/reports', async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reports' });
  }
});

// Get all users (only accessible by admin)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Delete user by ID (admin only)
router.delete('/user/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

//admin
router.get('/users', isAdmin, async (req, res) => {
    // Your code to fetch users
  });
  
  router.delete('/user/:id', isAdmin, async (req, res) => {
    // Your code to delete user
  });

export default router;
