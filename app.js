const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth.routes');
const habitRoutes = require('./routes/habit.routes');

const app = express();
app.use(cors({
  origin: ['http://localhost:8100'], // 👈 Add frontend URL
  credentials: true                 // 👈 Allow cookies & auth headers
}));
// app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);

app.get('/', (req, res) => {
  res.send('HabitVault API is running');
});

module.exports = app;
