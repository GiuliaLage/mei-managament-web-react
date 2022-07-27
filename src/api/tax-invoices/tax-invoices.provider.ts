import { apiRequest } from '../base.provider';
import { queryStringBuilder } from '../../utils/query-string';
import { taxInvoiceErrors } from './tax-invoices.constants';

const getTaxInvoices = async (params: any) => {
  const queryString = queryStringBuilder(params);
  const response = await apiRequest({
    method: 'get',
    url: `tax-invoice${queryString}`,
    userFeedback: false,
  });

  return response.data;
};

const getTaxInvoicesTotalizers = async (params: any) => {
  const queryString = queryStringBuilder(params);
  const response = await apiRequest({
    method: 'get',
    url: `tax-invoice/totalizers${queryString}`,
    userFeedback: false,
  });

  return response.data;
};

const registerTaxInvoices = async (params: any) => {
  const response = await apiRequest(
    {
      method: 'post',
      url: `tax-invoice`,
      data: params,
      userFeedback: true,
    },
    taxInvoiceErrors,
  );

  return response.data;
};

export { getTaxInvoices, getTaxInvoicesTotalizers, registerTaxInvoices };
