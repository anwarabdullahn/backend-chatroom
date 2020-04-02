import Room from "../models/Room";

export const create = (data, owner) => {
  return new Promise(async (resolve, reject) => {
    const { name } = data;
    const newRoom = new Room({
      name,
      owner: owner,
      participans: [owner],
    });
    return newRoom.save().then(result => resolve(result)).catch(err => reject(err))
  })
}

export const myRoom = (owner) => {
  return new Promise((resolve, reject) => {
    const { _id } = owner;
    return Room.find({ participans: { $in: [_id] } })
      .then(result => resolve(result)).catch(err => reject(err));
  })
}