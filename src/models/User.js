import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  versionKey: false,
  timestamps: true,
});

class User extends model('users', userSchema) {
  static isEmailExist(email) {
    return new Promise((resolve) => {
      this.findOne({ email }).then(data =>
        data ? resolve(true) : resolve(false)
      );
    })
  }

  static getHashPassword(query) {
    return new Promise((resolve, reject) => {
      this.findOne(query)
        .then(data => data ? resolve(data.password) : reject(null))
        .catch(err => reject(err));
    });
  }
}

export default User;
