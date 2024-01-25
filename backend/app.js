require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const clientRoutes = require('./src/routes/client.route');

app.use(cors());
app.use(express.json());
app.use('/api/v1/', clientRoutes);

app.get('/', function(req, res) {
  res.send('Bem-Vindo ao Express!');
});

module.exports = app;