import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  conversation: [{
    type: Schema.Types.ObjectId,
    ref: 'messages'
  }],
}, {
  versionKey: false,
  timestamps: true,
});

class Room extends model('rooms', roomSchema) {

}

export default Room;