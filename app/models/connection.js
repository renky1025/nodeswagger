const mongoose = require('mongoose');
const logger = require('../logger');

const db = mongoose.connection;
const dbURI = 'mongodb://localhost:27017/Iganiq8o';
const mongodbOptions = {server: {auto_reconnect:true, reconnectInterval: 1000, reconnectTries: Number.MAX_VALUE }};

try{

	mongoose.connect(dbURI, mongodbOptions);

	// CONNECTION EVENTS
	// When successfully connected
	mongoose.connection.on('connected', function () {  
	  logger.info('Mongoose default connection open to ' + dbURI);
	}); 

	// If the connection throws an error
	mongoose.connection.on('error',function (err) {  
	  logger.error('Mongoose default connection error: ' + err);
	}); 

	// When the connection is disconnected
	mongoose.connection.on('disconnected', function () {  
	  logger.info('Mongoose default connection disconnected'); 
	});

	// If the Node process ends, close the Mongoose connection 
	process.on('SIGINT', function() {  
	  mongoose.connection.close(function () { 
	    logger.info('Mongoose default connection disconnected through app termination'); 
	    process.exit(0); 
	  }); 
	}); 


} catch (err){
	logger.error(("Setting up failed to connect to " + dbURI).red, err.message);
}
