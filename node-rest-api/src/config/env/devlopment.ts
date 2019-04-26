/**
 * development config
 * will replace database config if NODE_ENV === 'development'
 */
export const envConfig: any = {
  auth:{ secret: 'supersecret',
  },
  database: {
    MONGODB_URI: 'mongodb://localhost:27017/', // 'mongodb://mongo:27017/'
    MONGODB_DB_MAIN: 'user_db',
  },
};
