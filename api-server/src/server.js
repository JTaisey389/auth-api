'use strict';

const express = require('express');

const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const logger = require('./middleware/logger');

const v1Routes = require('./routes/v1');
const v2Routes = require('./routes/v2');

const app = express();
app.use(express.json());

app.user(logger);
app.use('/api/v1', v1Routes); // CHECK THIS 
app.use('/api/v2', v2Routes); // CHECK THIS 

app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port');}
    app.listen(port, () => console.log(`Listening on $${port}`));
  }
};