
const EventEmitter = require('events');
const fs = require('fs');

class Logger extends EventEmitter {}

const logger = new Logger();

// Listen to 'log' events
logger.on('log', ({ message, timestamp }) => {
  console.log(`[${timestamp}] ${message}`);
  
  // Bonus: Write log to a file
  const logMessage = `[${timestamp}] ${message}\n`;
  fs.appendFile('events.log', logMessage, err => {
    if (err) console.error('Error writing log to file', err);
  });
});

module.exports = logger;
