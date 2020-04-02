import Message from "../models/Message";
import Room from "../models/Room";

export const store = (data, sender, roomId) => {
  return new Promise(async (resolve, reject) => {
    const senderId = sender._id;
    console.log(senderId, 'senderId')
    const isRoomExist = await Room.isRoomIdExist(roomId);
    const isAuthorizedRoom = await Room.isParticipans(roomId, senderId)
    const newMessage = new Message({
      text: data.text,
      sender: senderId,
      room: roomId,
    });

    if (!isRoomExist) {
      reject({ room: 'Can`t find the room' });
    } else if (!isAuthorizedRoom) {
      reject({ room: 'You are not join this Room' });
    } else {
      const conversation = await newMessage.save();
      await Room.pushConversation(roomId, conversation);
      resolve(conversation);
    }
  });
}
