const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const formatterInputNumber = (val: any) => {
  return `${val}`
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    .replace(/\.(?=\d{0,2}$)/g, ',');
};

const parserInputNumber = (val: any) => {
  return Number.parseFloat(
    val.replace(/\$\s?|(\.*)/g, '').replace(/(\,{1})/g, '.'),
  ).toFixed(2);
};

export { formatCurrency, formatterInputNumber, parserInputNumber };
