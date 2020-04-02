import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const messageSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    autopopulate: true,
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: 'rooms'
  }
}, {
  versionKey: false,
  timestamps: true,
});
messageSchema.plugin(require('mongoose-autopopulate'));

class Message extends model('messages', messageSchema) {

}

export default Message;