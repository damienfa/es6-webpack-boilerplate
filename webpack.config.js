const path = require('path');
const merge = require('webpack-merge');
const _ = require('lodash'); // <== yet requiered by 'webpack-merge'
const TARGET = process.env.npm_lifecycle_event; // build, start etc...
const args = JSON.parse(process.env.npm_config_argv);
const webpack = require('webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');

process.env.BABEL_ENV = TARGET;

const DEBUG = !_.includes(args.original, '--production');
const VERBOSE = _.includes(args.original, '--verbose');

const PATHS = {
   src: path.join(__dirname, 'src'),
   dist: path.join(__dirname, 'dist')
};

const plugins = [];

if (!DEBUG) {

   plugins.push(new webpack.optimize.DedupePlugin());

   plugins.push(
      new webpack.optimize.UglifyJsPlugin({
         compress: {
            screw_ie8: true,
            sequences: true,
            dead_code: true,
            conditionals: true,
            booleans: true,
            unused: true,
            if_return: true,
            join_vars: true,
            drop_console: true,
            warnings: VERBOSE
         },
         mangle: false, // maybe ?
         output: {
            comments: false
         }
      })
   );

}

const common = {
   //context: PATHS.src,
   entry: {
      'app': './src/index.js'
   },
   //target: 'node',
   resolve: {
      extensions: ['', '.js'],
   },
   output: {
      path: PATHS.dist,
      filename: 'index.js',
      //publicPath: '/',
   },
   module: {

      loaders: [{
         test: /\.jsx?$/,
         loaders: ['babel'],
         include: PATHS.src,
         exclude: /node_modules/
      }, {
         test: /\.json$/,
         loader: 'json-loader',
      }, {
         test: /\.txt$/,
         loader: 'raw-loader',
      }]
   },
   plugins: plugins
};


if (TARGET === 'start' || !TARGET) {
   
   plugins.push(new WebpackShellPlugin({
      onBuildExit: [
         'echo \n \n \033[0;36m--- EXECUTION ---\033[0m \n \n',
         'node ./dist/index.js'
      ]
   })); 

   module.exports = merge(common, {
      devtool: 'eval-source-map',
   });

} else if (TARGET === 'build') {
   module.exports = merge(common, {});
}

