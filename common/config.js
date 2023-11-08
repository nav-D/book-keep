module.exports = {
  API_PORT : parseInt(process.env.API_PORT) || 3000,
  MONGO_HOST: process.env.MONGO_HOST || 'localhost',
  MONGO_PORT: process.env.MONGO_PORT || 27017,
  MONGO_DB : process.env.MONGO_DB || 'books-demo',
  LOG_ENV : process.env.LOG_ENV || 'dev',
}