import axios from 'axios';
import Cookies from 'js-cookie';
import { openNotification } from '../utils/notification';
import { baseErrors } from './base.constants';
import {
  ResquestConfigsInterface,
  RequestMessageListInterface,
} from './base.interfaces';

import {API_BASE_URL} from '../api/base.constants';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const apiRequest = async (
  configs: ResquestConfigsInterface,
  messageList?: RequestMessageListInterface[],
) => {
  const requestOptions: ResquestConfigsInterface = {
    url: `${API_BASE_URL}/${configs.url}`,
    method: configs.method,
  };

  if (configs.data) requestOptions.data = configs.data;

  const headers = getHeaders();

  const response = await axios({
    ...requestOptions,
    headers: {
      ...headers,
    },
    responseType: 'json',
  })
    .then((response) => response)
    .catch((error) => {
      if (configs.userFeedback)
        handleRouterReponse(error.response.data, 'error', messageList);

      if (
        error.response.data.statusCode === 401 &&
        error.response.data.message === 'Unauthorized' &&
        configs.url != 'auth/login'
      ) {
        openNotification('warning', {
          title: 'Sessão expirada!',
          description: 'Por favor faça o login novamente.',
        });
        window.location.href = `${window.location.protocol}//${window.location.host}/login`;
      }

      throw new Error(error);
    });

  return response;
};

const getHeaders = () => {
  const access_token = Cookies.get('access_token');
  const headers = {
    Authorization: `Bearer ${access_token}`,
    'Content-Type': 'application/json; charset=utf-8',
    'access-control-allow-origin': '*',
  };

  return headers;
};

const handleRouterReponse = (
  routerResponse: any,
  type: NotificationType,
  messageList?: RequestMessageListInterface[],
) => {
  if (type === 'error') {
    let item = messageList?.find(
      (element) => element.code === routerResponse.statusCode,
    );

    if (!item) {
      item = baseErrors.find(
        (element) => element.code === routerResponse.statusCode,
      );
      if (!item) return false;
    }

    const message = item.messages.find(
      (element) => element.error === routerResponse.message,
    );
    if (message) {
      openNotification(type, message);
    }
  }
};

export { apiRequest };
