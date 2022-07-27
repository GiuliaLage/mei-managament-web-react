const getMonthNames = (monthNumber: string) => {
  const monthNames = [
    { key: '01', name: 'Janeiro' },
    { key: '02', name: 'Fevereiro' },
    { key: '03', name: 'Março' },
    { key: '04', name: 'Abril' },
    { key: '05', name: 'Maio' },
    { key: '06', name: 'Junho' },
    { key: '07', name: 'Julho' },
    { key: '08', name: 'Agosto' },
    { key: '09', name: 'Setembro' },
    { key: '10', name: 'Outubro' },
    { key: '11', name: 'Novembro' },
    { key: '12', name: 'Dezembro' },
  ];

  const findMonth = monthNames.find((month: any) => month.key === monthNumber);
  return findMonth ? findMonth.name : 'Mês atual';
};

export { getMonthNames };
