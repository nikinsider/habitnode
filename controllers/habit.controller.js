const Habit = require('../models/Habit');

exports.createHabit = async (req, res) => {
  try {
    const { userId, goal, name, target, frequency, progress,startDate } = req.body;
  
    const today = new Date().toISOString().split('T')[0];
    const habit = new Habit({
      userId: req.user.id,
      goal,
      name,
      target,
      frequency,
      startDate: new Date(),
      progress: 0,
      history: [],
      completed: [{
        date: today,
        isCompleted: false
      }]
    });
    await habit.save();
    res.status(201).json(habit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.user.id }); // from token
    res.json(habits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body, { new: true }
    );
    res.json(habit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteHabit = async (req, res) => {
  try {
    await Habit.deleteOne({ _id: req.params.id, userId: req.user.id });
    res.json({ message: 'Habit deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.completeHabit = async (req, res) => {
  try {
    const habitId = req.params.id;
    const { isCompleted } = req.body;
    const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'

    const habit = await Habit.findOne({ id: habitId });
    if (!habit) return res.status(404).json({ message: 'Habit not found' });

    const existingEntry = habit.completed.find(c => c.date === today);
    if (existingEntry) {
      existingEntry.isCompleted = isCompleted;
    } else {
      habit.completed.push({ date: today, isCompleted });
    }

    await habit.save();
    res.json({ message: 'Habit status updated', habit });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
