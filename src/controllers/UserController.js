import * as UserService from '../services/UserService';
import Response from '../../utils/response';

export const Login = async (req, res) => {
  try {
    const result = await UserService.login(req.body);
    return Response.success(res, result, 200, 'Successfully Login');
  } catch (error) {
    return Response.error(res, error, 400, 'Failed to Login');
  }
}

export const Register = async (req, res) => {
  try {
    const result = await UserService.register(req.body);
    return Response.success(res, result, 200, 'Successfully Register');
  } catch (error) {
    return Response.error(res, error, 400, 'Failed to Register');
  }
}

export const Me = async (req, res) => {
  try {
    const { email } = req.user;
    const result = await UserService.getUser({ email });
    return Response.success(res, result, 200, 'Successfully get User');
  } catch (error) {
    return Response.error(res, error, 400, 'Failed get User');
  }
}