const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const HabitSchema = new mongoose.Schema({
  id: {
    type: String,
    default: () => uuidv4(),
    unique: true
  },
  userId: {
    type: String,
    required: true
  },
  goal: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  target: {
    type: Number,
    required: true
  },
  progress: {
    type: Number,
     default: 0
  },
  frequency: {
    type: String,
    enum: ['Everyday', 'Alternate', 'Weekly'],
    default: 'Everyday'
  },
  startDate: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  history: [{ date: String }],
  completed: [{
    date: String,          // YYYY-MM-DD
    isCompleted: Boolean
  }] 
});

module.exports = mongoose.model('Habit', HabitSchema);
