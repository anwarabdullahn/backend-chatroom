import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const messageSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
}, {
  versionKey: false,
  timestamps: true,
});

class Message extends model('messages', messageSchema) {

}

export default Message;