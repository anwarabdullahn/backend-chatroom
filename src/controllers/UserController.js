import * as UserService from '../services/UserService';
import Response from '../../utils/response';

export const Login = async (req, res) => {
  try {
    const result = await UserService.Login(req.body);
    return Response.success(res, result, 200, 'Successfully Login');
  } catch (err) {
    return Response.error(res, err, 400, 'Failed to Login');
  }
}