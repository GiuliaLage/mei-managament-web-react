export const cleanCurrency = (currency: string) => {
  const cleanCurrency = currency.replace(/[^0-9,]*/g, '').replace(',', '.');
  return Number(cleanCurrency);
};
