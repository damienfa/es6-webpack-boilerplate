import config from './src/config'; // <= this is the config of your app, which depends on the env
import './src/helpers/logger'; // init a logger and make it global

process.on('uncaughtException', function(err) {
   logger.error('UnCaught exception: ', err, );
});

console.log('Hello World !');
