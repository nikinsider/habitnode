const express = require('express');
const router = express.Router();
const { createHabit, getHabits, updateHabit, deleteHabit, completeHabit } = require('../controllers/habit.controller');
const authMiddleware = require('../middleware/auth');

router.post('/create', authMiddleware, createHabit);
router.get('/get', authMiddleware,getHabits);
router.post('/update', updateHabit);
router.post('/delete', deleteHabit);
router.put('/complete/:id', authMiddleware, completeHabit);

module.exports = router;
