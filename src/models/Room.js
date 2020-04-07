import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import mongoosePopulate from 'mongoose-autopopulate';

const { Schema, model } = mongoose;
const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    autopopulate: true,
  },
  conversation: [{
    type: Schema.Types.ObjectId,
    ref: 'messages',
    autopopulate: true,
  }],
  participans: [{
    type: Schema.Types.ObjectId,
    ref: 'users',
  }],
}, {
  versionKey: false,
  timestamps: true,
});
roomSchema.plugin(mongoosePopulate);
roomSchema.plugin(mongoosePaginate);

class Room extends model('rooms', roomSchema) {

  /**
   * 
   * TODO: function to check is room exist
   * 
   * @param {Number} roomId
   * @returns {Promise<Boolean>}
   */
  static isRoomIdExist(roomId) {
    return this.findById(roomId).then(data =>
      data ? Promise.resolve(true) : Promise.resolve(false)
    )
  }

  /**
   * 
   * TODO: function to check is user join the conversation room
   * 
   * @param {Number} roomId
   * @param {Number} participanId
   * @returns {Promise<Boolean>}
   */
  static isParticipans(roomId, participanId) {
    return this.findOne({ _id: roomId, participans: { $in: [participanId] } })
      .then(data =>
        data ? Promise.resolve(true) : Promise.resolve(false)
      ).catch(() => Promise.resolve(false));
  }

  /**
   * 
   * TODO: function to add the conversation to room
   * 
   * @param {Number} roomId
   * @param {Object} conversation
   * @returns {Promise<Room>}
   */
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

  /**
   * 
   * TODO: function to paginate room
   * 
   * @param {Object} query
   * @param {Number} pageNumber
   * @returns {Promise<Room>}
   */
  static findOnPage(query, pageNumber) {
    return new Promise((resolve, reject) => {
      this.find(query).then(result => {
        const options = {
          page: pageNumber,
          limit: 10,
          sort: { createdAt: -1 },
          collation: {
            locale: 'en'
          },
        }
        const lastPage = Math.floor(result.length / 10) + 1;
        if (pageNumber > lastPage || pageNumber < 0) options.page = 1;
        this.paginate({}, options)
          .then(data => {
            resolve(data)
          }).catch(err => reject(err))
      }).catch(err => reject(err))
    })
  }
}

export default Room;
