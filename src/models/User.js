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
}, {
  versionKey: false,
  timestamps: true,
});

class User extends model('users', userSchema) {
  static isEmailExist(email) {
    return this.findOne({ email }).then(data =>
      data ? Promise.resolve(true) : Promise.resolve(false)
    );
  }
}

export default User;
