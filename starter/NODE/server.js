const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

// start app
const app = express();
app.use(cors());
app.use(express.json());

// iniciando DB
mongoose.connect(
  'mongodb://localhost:27017/nodeapi',
  {useUnifiedTopology: true}
)

requireDir('./src/models');

// Rotas
app.use('/api', require("./src/routes"))

app.listen(3003);