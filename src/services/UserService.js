import User from '../models/User';

export const Login = (data) => {
  return new Promise(async (resolve, reject) => {
    const isEmailExist = await User.isEmailExist(data.email)
    const dataToStore = {
      email: data.email,
      name: data.name,
    }
    await isEmailExist
      ? User.findOneAndUpdate(
        { email: data.email },
        { $set: dataToStore },
        { new: true },
      ).then(result => resolve(result)).catch(err => reject(err))
      : User.create(dataToStore)
        .then(result => resolve(result)).catch(err => reject(err));
  });
}