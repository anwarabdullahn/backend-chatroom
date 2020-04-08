import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import mongoosePopulate from 'mongoose-autopopulate';

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
messageSchema.plugin(mongoosePopulate);
messageSchema.plugin(mongoosePaginate);

class Message extends model('messages', messageSchema) {

  /**
   * 
   * TODO: function to find message in pagination
   * 
   * @param {Object} query 
   * @param {Number} pageNumber
   * @returns {Promise}
   */
  static findOnPage(query, pageNumber) {
    return new Promise((resolve, reject) => {
      const options = {
        page: pageNumber,
        limit: 10,
        sort: { createdAt: -1 },
        collation: {
          locale: 'en'
        }
      };
      this.paginate(query, options)
        .then(data => {
          resolve(data)
        }).catch(err => reject(err))
    })
  }
}

export default Message;