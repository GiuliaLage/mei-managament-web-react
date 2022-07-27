export interface ResquestConfigsInterface {
  url: string;
  method: string;
  data?: any;
  userFeedback?: boolean;
}

export interface RequestMessagesInterface {
  error?: string;
  title: string;
  description?: string;
}

export interface RequestMessageListInterface {
  code: number;
  messages: RequestMessagesInterface[];
}

export interface BaseApiRequestError {
  statusCode: number;
  message: string;
}
