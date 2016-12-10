const bunyan = require('bunyan');

const logger = bunyan.createLogger({
	name: 'nodeapp-service',
	streams: [
		{
		  stream: process.stdout,
		  level: 'debug'
		},
		{
		  path: 'node_logger.log',
		  level: 'trace'
		}
	],
	serializers: {
	  req: bunyan.stdSerializers.req,
	  res: bunyan.stdSerializers.res
	}
});

module.exports = logger;