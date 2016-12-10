const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');
const logger = require('./logger');
require('./models/connection');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.all('/*', (req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
const routers = require('./bearRouter');
const movies = require('./movieRouter'); 

// ROUTES FOR OUR API
// =============================================================================
// swagger definition
var swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: 'Demonstrating how to describe a RESTful API with Swagger',
  },
  host: 'localhost:5150',
  basePath: '/api/v1.0',
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: [path.join(__dirname, 'bearRouter.js'), path.join(__dirname, 'movieRouter.js')],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

app.use(express.static(path.join(__dirname, 'public')));



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api/v1.0/', routers);
app.use('/api/v1.0/', movies);

app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status( err.code || 500 )
    .json({
      status: 'error',
      message: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  .json({
    status: 'error',
    message: err.message
  });
});


module.exports = app;