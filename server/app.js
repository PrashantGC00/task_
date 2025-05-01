require('dotenv').config();

const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

require('./db');

const EmployeeRouter = require('./Routes/EmployeeRouter');

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use('/api', EmployeeRouter);

app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});