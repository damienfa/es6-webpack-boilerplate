import fs from 'fs';
import winston from 'winston';
import 'winston-daily-rotate-file';
import config from '../config';

/*
const colorize = function(text) { 
   winston.config.colorize(level, text); 
};
*/

function getFormattedDate() {
   const now = new Date();
   return `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
}


const transports = [];

/** 
 * If you're not in dev-mode, log in a file (rotated daily)
 */
if (!config.debug) {
   const logFolder = `${config.root}/logs`;
   // Create a folder "logs" if not exists
   if (!fs.existsSync(logFolder)) {
      fs.mkdirSync(logFolder);
   }
   transports.push(
      new winston.transports.DailyRotateFile({
         filename: `${logFolder}/LOG-`, // Filename will be 'LOG-yyyy-MM-dd.log'
         datePattern: 'yyyy-MM-dd.log',
         colorize: false,
         level: 'info', // <= do not log before 'info' level (the debugs are not file-logged)
         timestamp: getFormattedDate,
         //formatter: customFormatter???
      })
   );
}

// Common loggers (all env)
const logger = new(winston.Logger)({
   levels: winston.config.syslog.levels,
   colors: winston.config.syslog.colors,
   level: 'debug',
   transports: [
      new(winston.transports.Console)({
         colorize: 'all',
         level: 'debug',
         timestamp: getFormattedDate,
         prettyPrint: true,
         //formatter: customFormatter???
      }),
      ...transports
   ]
});

global.logger = logger;

export default logger;
