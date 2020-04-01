import mongoose from 'mongoose';

const { Schema } = mongoose;
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