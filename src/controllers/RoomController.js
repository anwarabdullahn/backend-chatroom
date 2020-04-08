import * as RoomService from '../services/RoomService';
import Response from '../../utils/response';

export const Store = async (req, res) => {
  try {
    const result = await RoomService.create(req.body, req.user);
    return Response.success(res, result, 200, 'Successfully create Room');
  } catch (error) {
    return Response.error(res, error, 400, 'Failed create Room', error.message)
  }
}

export const MyRoom = async (req, res) => {
  try {
    const result = await RoomService.myRoom(req.user, req.params.page);
    return Response.success(res, result, 200, 'Successfully get Room');
  } catch (error) {
    return Response.error(res, error, 400, 'Failed to get Room');
  }
}

export const JoinRoom = async (req, res) => {
  try {
    const result = await RoomService.joinRoom(req.user, req.body.name);
    return Response.success(res, result, 200, 'Successfully join Room');
  } catch (error) {
    return Response.error(res, error, 400, 'Failed join Room', error.message)
  }
}
