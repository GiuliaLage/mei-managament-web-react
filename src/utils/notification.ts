import { RequestMessagesInterface } from '../api/base.interfaces';
import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const openNotification = (
  type: NotificationType,
  message: RequestMessagesInterface,
) => {
  notification[type]({
    message: message.title,
    description: message.description,
  });
};

export { openNotification };
