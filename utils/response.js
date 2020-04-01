import { isEmpty } from 'lodash';

class Response {
  /**
   * 
   * TODO: function to handle success response
   * 
   * @param {Response} res 
   * @param {Boolean} success
   * @param {Object} data
   * @param {Number} statusCode
   * @param {String} message 
   */
  static success(res, data = {}, statusCode = 200, message = undefined) {
    const result = {
      success: true,
      message,
      data,
    }
    if (isEmpty(data)) delete result.data
    if (isEmpty(message)) delete result.message

    return res.status(statusCode).json(result)
  }

  /**
   * 
   * TODO: function to handle error response
   * 
   * @param {Response} res 
   * @param {Boolean} success
   * @param {Object} error
   * @param {Number} statusCode
   * @param {String} message 
   */
  static error(res, error = {}, statusCode = 400, message = undefined) {
    const result = {
      success: false,
      message,
      error,
    }
    if (isEmpty(error)) delete result.error
    if (isEmpty(message)) delete result.message

    return res.status(statusCode).json(result)
  }
}

export default Response;