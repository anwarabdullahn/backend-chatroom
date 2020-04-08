import Room from "../models/Room";
import { isEmpty } from 'lodash';
import User from "../models/User";

export const create = (data, owner) => {
  return new Promise(async (resolve, reject) => {
    const { name } = data;
    const newRoom = new Room({
      name,
      owner: owner,
      participans: [owner],
    });
    const roomExist = await Room.findOne({ name });
    return roomExist ? reject({ message: 'Room Name already exist' }) : newRoom.save().then(result => resolve(result)).catch(err => reject(err))
  })
}

export const myRoom = (owner, pageNumber = 1) => {
  return new Promise((resolve, reject) => {
    const { _id } = owner;
    return Room.findOnPage({ participans: { $in: [_id] } }, pageNumber)
      .then(result => resolve(result)).catch(err => reject(err));
  })
}

export const joinRoom = (user, roomName) => {
  return new Promise(async (resolve, reject) => {
    const { _id } = user;
    const roomExist = await Room.findOne({ name: roomName });
    const result = await Room.findOne({ name: roomName, participans: { $in: [_id] } });
    if (!roomExist) {
      reject({ message: `Can't find room name` })
    } else if (result) {
      reject({ message: `You already join the room` })
    } else {
      const user = await User.findById(_id);
      const data = await Room.pushParticipan(roomExist._id, user);
      resolve(data);
    }
  })
}