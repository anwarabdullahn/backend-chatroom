import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = (data) => {
  return new Promise(async (resolve, reject) => {
    const { email, name, password } = data;
    const isEmailExist = await User.isEmailExist(email);
    const hash = bcrypt.hashSync(password, 10);
    const newUser = new User({ email, name, password: hash });
    return isEmailExist
      ? reject({ email: 'Email already exist.' })
      : newUser.save().then(result => resolve(result)).catch(err => reject(err));
  });
}

export const login = (data) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = data;
    const { SECRET } = process.env;
    const isEmailExist = await User.isEmailExist(email);
    const hashPassword = await User.getHashPassword({ email });
    const isPasswordMatch = bcrypt.compareSync(password, hashPassword);

    !isEmailExist && reject({ email: 'Email not exist.' });
    !isPasswordMatch && reject({ password: 'Wrong Password' });

    return User.findOne({ email })
      .then(data => {
        const payload = { email: data.email };
        const token = jwt.sign(payload, SECRET);
        resolve({ token: 'Bearer ' + token });
      })
      .catch(err => {
        console.log(err, 'err');
        reject(err)
      })
  });
}

export const getUser = async (query) => {
  return new Promise((resolve, reject) => {
    return User.findOne(query)
      .then(result => resolve(result))
      .catch(err => reject(err))
  })
}
