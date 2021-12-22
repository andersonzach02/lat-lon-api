require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('../utils/logger');
const middlewares = require('./middlewares');

const home = require('./api/index');

const app = express();

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined', { stream: logger.stream.write }));
}

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
  res.send({ message: 'Hello World! 👋🌍' });
});

app.use('/api/v1', home);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
