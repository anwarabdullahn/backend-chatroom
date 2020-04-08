import User from '../models/User';
import jwt from 'jsonwebtoken';

export const register = (data) => {
  return new Promise(async (resolve, reject) => {
    const { email, name } = data;
    const isEmailExist = await User.isEmailExist(email);
    const newUser = new User({ email, name });
    return isEmailExist
      ? reject({ email: 'Email already exist.' })
      : newUser.save().then(result => resolve(result)).catch(err => reject(err));
  });
}

export const login = (data) => {
  return new Promise(async (resolve, reject) => {
    const { email } = data;
    const { SECRET } = process.env;
    const isEmailExist = await User.isEmailExist(email);

    !isEmailExist && reject({ email: 'Email not exist.' });

    return User.findOne({ email })
      .lean()
      .then(result => {
        const payload = { email: result.email };
        const token = jwt.sign(payload, SECRET);
        resolve({ ...result, token: 'Bearer ' + token });
      })
      .catch(err => reject(err))
  });
}

export const getUser = async (query) => {
  return new Promise((resolve, reject) => {
    return User.findOne(query)
      .then(result => resolve(result))
      .catch(err => reject(err))
  })
}
