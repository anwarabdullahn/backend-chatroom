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
      this.find(query).then(result => {
        const options = {
          page: pageNumber,
          limit: 10,
          sort: { createdAt: -1 },
          collation: {
            locale: 'en'
          }
        };
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

export default Message;