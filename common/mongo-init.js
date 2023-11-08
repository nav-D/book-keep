const mongoose = require('mongoose');
const config = require('./config');

const mongoURI = `mongodb://${config.MONGO_HOST}:${config.MONGO_PORT}/books-demo`;

const connect = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log('Mongo Connection Successful');
  } catch (e) {
    console.log('Faced an Error While Connecting to Mongo', e);
    process.exit(1);
  }
};

module.exports = connect;
