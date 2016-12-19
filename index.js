import config from './src/config'; // <= this is the config of your app, which depends on the env
import logger from './src/helpers/logger'; // init a logger and make it global
import app from './src/app';

process.on('uncaughtException', function(err) {
   logger.error('UnCaught exception: ', err);
});

app(); 