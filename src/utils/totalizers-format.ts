import { formatCurrency } from './format-currency';
import { getMonthNames } from './month-names';
import { format } from 'date-fns';

const currentMonth = getMonthNames(format(new Date(), 'MM'));

const formatTotalizers = async (totalizers: any) => {
  const taxInvoiceLimit = formatCurrency(totalizers.tax_invoice_limit);
  const totalTaxInvoice = formatCurrency(totalizers.total_tax_invoice);
  const balance = formatCurrency(totalizers.balance);
  const taxInvoiceByMonth: any = [];
  let taxInvoiceByCurrentMonth = 'R$ 0,00';

  await totalizers.taxInvoiceByMonth.forEach((element: any) => {
    const month = getMonthNames(element.month);
    const total = formatCurrency(Number(element.total));

    if (month === currentMonth) taxInvoiceByCurrentMonth = total;

    taxInvoiceByMonth.push({ total, month });
  });

  return {
    taxInvoiceLimit,
    totalTaxInvoice,
    balance,
    taxInvoiceByMonth,
    taxInvoiceByCurrentMonth,
  };
};

export { formatTotalizers };
