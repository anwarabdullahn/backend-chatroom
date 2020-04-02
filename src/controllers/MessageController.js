
import * as MessageService from '../services/MessageService';
import Response from '../../utils/response';

export const StoreConversation = async (req, res) => {
  try {
    const { roomId } = req.params;
    const result = await MessageService.store(req.body, req.user, roomId);
    return Response.success(res, result, 200, 'Successfully store message to Room');
  } catch (error) {
    return Response.error(res, error, 400, 'Failed to store conversation')
  }
}

export const GetConversation = async (req, res) => {
  try {
    const { roomId, page } = req.params;
    const result = await MessageService.get(roomId, page);
    return Response.success(res, result, 200, 'Successfully get conversation');
  } catch (error) {
    return Response.error(res, error, 400, 'Failed to get conversation')
  }
}