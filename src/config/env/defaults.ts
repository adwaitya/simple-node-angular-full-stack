// default config
const config: any = {
  port: process.env.PORT || 8444,
  secret: 'supersecret',
  env: 'development',
  database: {
    client: 'mongodb',
  },
};

// Set the current environment or default to 'development'
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
config.env = process.env.NODE_ENV;

export default config;
