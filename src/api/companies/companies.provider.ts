import { apiRequest } from '../base.provider';
import { queryStringBuilder } from '../../utils/query-string';
import { companiesErrors } from './companies.constans';

const getCompanies = async (params: any) => {
  const queryString = queryStringBuilder(params);
  const response = await apiRequest({
    method: 'get',
    url: `company${queryString}`,
    userFeedback: false,
  });

  return response.data;
};

const registerCompany = async (params: any) => {
  const response = await apiRequest(
    {
      method: 'post',
      url: `company`,
      data: params,
      userFeedback: true,
    },
    companiesErrors,
  );

  return response.data;
};

export { getCompanies, registerCompany };
