import { default as config } from './defaults';

// Load environment-specific settings
let localConfig: any = {};
try {
    // The environment file might not exist
  localConfig = require(`../env/${config.env}`);
  localConfig = localConfig || {};
} catch (error) {
  localConfig = {};
  console.error('error', error);
}

export default (< any > Object).assign({}, config, localConfig);
