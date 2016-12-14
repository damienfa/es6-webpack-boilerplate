import path from 'path';

const env = process.env.NODE_ENV || 'development';
const config = require(`../config/env/${env}`); // eslint-disable-line import/no-dynamic-require

if (!config || !config.default) 
   throw new Error('Cannot load "${env}" configuration ! Are you sure it exists ?');

export default {
   ...config.default,
   root: path.join(__dirname, '/..')
};
