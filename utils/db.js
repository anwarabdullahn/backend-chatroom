import mongoose from 'mongoose';

const defaultConfig = {
  autoIndex: false,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}

class Database {

  /**
   * 
   * TODO: function need to handle mongo connect with some setup
   * 
   * @param {String} databaseUrl 
   * @param {Object} configs 
   */
  static connect(databaseUrl, configs = {}) {
    mongoose.set('debug', true);
    mongoose.connect(databaseUrl, { ...defaultConfig, ...configs });
    const db = mongoose.connection;

    db.on('error', err => {
      console.error('server connection to MongoDB error:', err);
    });
    db.once('open', () => {
      console.info('server has been successfully connected to MongoDB.');
    });
    db.on('disconnected', () => {
      console.error('server has disconnected from MongoDB.');
    });
    db.on('reconnected', () => {
      console.info('server has reconnected to MongoDB.');
    });
  }
}

export default Database;
