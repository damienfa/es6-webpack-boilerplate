class App {
   constructor() {
      logger.log('info', 'Hello World !'); 
   }
}
function factory() {
   return new App();
}
export default factory;