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
  }
}, {
  versionKey: false,
  timestamps: true,
});

class User extends model('users', userSchema) {

}

export default User;
