const express = require('express');
const app = express();
const config = require('./common/config');
const logger = require('morgan');
const routerBook = require('./router');

// Create mongo connection using mongoose
require('./common/mongo-init')();

// Set Middlewares and Routers
app.use(express.json());
app.use(logger(config.LOG_ENV));

app.get('/', (req, res) => {
  res.status(200).send({ message: 'HomePage' });
});
app.use('/api/books/', routerBook);

module.exports = app;
