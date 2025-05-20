const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let feedbacks = [];

app.get('/api/feedback', (req, res) => {
  res.json(feedbacks);
});

app.post('/api/feedback', (req, res) => {
  const { name, message } = req.body;
  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message are required' });
  }
  feedbacks.push({ name, message });
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
