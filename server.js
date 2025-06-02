const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Node.js Starter App!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
