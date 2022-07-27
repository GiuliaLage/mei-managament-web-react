import { apiRequest } from '../base.provider';
import Cookies from 'js-cookie';
import { AuthRequest } from './auth.interfaces';
import { authErrors } from './auth.contants';

const login = async (data: AuthRequest): Promise<void> => {
  const response = await apiRequest(
    {
      method: 'post',
      url: 'auth/login',
      data,
      userFeedback: true,
    },
    authErrors,
  );

  Cookies.set('access_token', response.data.access_token);
};

export { login };
