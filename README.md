ES6 - WEBPACK - HELLO-WORLD BOILERPLATE
---

Just a simple library boilerplate to compile and create new node_modules !
It uses Babel + Webpack. 

Install it with the usual : 
`npm install`

Then, launch an : 
`npm start` 
and start to code in the `src` folder.

The webpack config (which is included) has an `onBuild` event that re-execute the compiled code with `node ./dist/index.js` (or you can replace it by launching a test library or whatever).

It also includes [ESLint](http://eslint.org "EsLint homepage") with a basic ES6 configuration.

**Requirements :**
- nodejs (v4.2.2 or >)
- npm (v3.3.6)
