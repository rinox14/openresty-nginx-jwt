const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const SECRET = process.env.JWT_SECRET || 'secret_12345345236256asdf2345';

// Route login
app.get('/login', (req, res) => {
  const token = jwt.sign(
    { username: 'rinoluv', role: 'admin' },
    SECRET,
    { expiresIn: '1h' }
  );
  res.json({ token });
});

app.get('/public', (req, res) => {
  res.send('Public route -> no jwt needed');
});

app.get('/protected', (req, res) => {
  const userId = req.get('X-User-ID') || 'unknown';
  const userRole = req.get('X-User-ROLE') || 'unknown';
  res.send(`Hello user: [${userId}] -> is a [${userRole}] \n`);
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Node API running on port 3000');
});