import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpinLoader from '../../components/spin-loader/spin-loader.component';
import { Button, Card, DatePicker } from 'antd';
import {
  HomeContainer,
  ActionsContainer,
  TotalizerContainer,
  ChartContainer,
} from './home.style';
import { format } from 'date-fns';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { cleanCurrency } from '../../utils/clean-currency';

import { getTaxInvoicesTotalizers } from '../../api/tax-invoices/tax-invoices.provider';
import { formatTotalizers } from '../../utils/totalizers-format';
import locale from 'antd/es/date-picker/locale/pt_BR';

//TODO: Criar arquivo de cores globais

const HomePage = () => {
  const navigation = useNavigate();
  const [spinning, setSpinning] = useState(true);
  const [totalizers, setTotalizers] = useState<any>();

  const [currentYear, setCurrentYear] = useState(format(new Date(), 'yyyy'));
  const [chartTotalTaxInvoiceByMonthData, setChartTotalTaxInvoiceByMonthData] =
    useState<any>([]);
  const [chartTaxInvoiceBalanceData, setChartTaxInvoiceBalanceData] =
    useState<any>([]);

  const loadTotalizers = async (totalizersParams: any) => {
    const response = await getTaxInvoicesTotalizers(totalizersParams);
    const totalizersFormated = await formatTotalizers(response);
    setTotalizers(totalizersFormated);
    loadChartData(totalizersFormated);
  };

  const loadChartData = (totalizersData: any) => {
    if (totalizersData.taxInvoiceByMonth.length > 0) {
      const totalTaxInvoiceByMonthData: any = [];
      totalizersData.taxInvoiceByMonth.forEach((element: any) => {
        totalTaxInvoiceByMonthData.push({
          name: element.month,
          value: cleanCurrency(element.total),
        });
      });
      setChartTotalTaxInvoiceByMonthData(totalTaxInvoiceByMonthData);
    } else {
      setChartTotalTaxInvoiceByMonthData([]);
    }

    const taxInvoiceBalanceData = [];
    taxInvoiceBalanceData.push({
      totalValue: cleanCurrency(totalizersData.totalTaxInvoice),
      limit: cleanCurrency(totalizersData.taxInvoiceLimit),
      balance: `Saldo ${totalizersData.balance}`,
    });
    setChartTaxInvoiceBalanceData(taxInvoiceBalanceData);
  };

  useEffect(() => {
    const loadPageData = async () => {
      try {
        await loadTotalizers({ year: currentYear });
      } finally {
        setTimeout(() => {
          setSpinning(false);
        }, 300);
      }
    };
    loadPageData();
  }, []);

  return !spinning ? (
    <>
      <HomeContainer>
        <ActionsContainer>
          <Button
            onClick={() => navigation('/cadastrar/nota-fiscal')}
            type="primary"
          >
            Lançar Nota Fiscal
          </Button>
          <Button type="primary">Lançar Despesas</Button>
        </ActionsContainer>
        <TotalizerContainer>
          <Card style={{ width: 300 }}>
            <p>Valor total notas emitidas {currentYear}</p>
            <p>{totalizers?.totalTaxInvoice}</p>
          </Card>
          <Card style={{ width: 300 }}>
            <p>Ainda posso emitir em {currentYear}</p>
            <p>{totalizers?.balance}</p>
          </Card>
        </TotalizerContainer>
      </HomeContainer>
      <DatePicker
        locale={locale}
        inputReadOnly={true}
        picker="year"
        onChange={(e: any) => {
          const year = format(e._d, 'yyyy');
          setCurrentYear(year);
          loadTotalizers({ year });
        }}
        placeholder={currentYear}
      />
      <ChartContainer>
        {chartTotalTaxInvoiceByMonthData.length > 0 ? (
          <>
            <BarChart
              width={400}
              height={250}
              data={chartTotalTaxInvoiceByMonthData}
              margin={{
                top: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis dataKey="value" />
              <Tooltip />
              <Legend />
              <Bar
                name="Valor total notas fiscais"
                dataKey="value"
                fill="#1890ff"
              />
            </BarChart>
          </>
        ) : (
          <h3>No ano de {currentYear}, nenhuma nota fiscal foi emitida.</h3>
        )}
        {chartTaxInvoiceBalanceData && (
          <BarChart
            width={400}
            height={250}
            data={chartTaxInvoiceBalanceData}
            margin={{
              top: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="balance" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              name="Valor total notas fiscais"
              dataKey="totalValue"
              stackId="id"
              fill="#1890ff"
            />
            <Bar
              name="Limite MEI"
              dataKey="limit"
              stackId="id"
              fill="#ff4d4f"
            />
          </BarChart>
        )}
      </ChartContainer>
    </>
  ) : (
    <SpinLoader spinning={spinning} />
  );
};
export default HomePage;
