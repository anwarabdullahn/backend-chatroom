import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  conversation: [{
    type: Schema.Types.ObjectId,
    ref: 'messages',
  }],
  participans: [{
    type: Schema.Types.ObjectId,
    ref: 'users',
  }],
}, {
  versionKey: false,
  timestamps: true,
});
roomSchema.plugin(require('mongoose-autopopulate'));

class Room extends model('rooms', roomSchema) {
  static isRoomIdExist(roomId) {
    return this.findById(roomId).then(data =>
      data ? Promise.resolve(true) : Promise.resolve(false)
    )
  }

  static isParticipans(roomId, participanId) {
    return this.findOne({ _id: roomId, participans: { $in: [participanId] } })
      .then(data =>
        data ? Promise.resolve(true) : Promise.resolve(false)
      ).catch(() => Promise.resolve(false));
  }

  static pushConversation(roomId, conversation) {
    return new Promise((resolve, reject) => {
      return this.findOneAndUpdate(
        { _id: roomId },
        { $push: { conversation } },
        { $new: true },
      ).then(result => resolve(result))
        .catch(err => reject(err))
    })
  }
}

export default Room;
