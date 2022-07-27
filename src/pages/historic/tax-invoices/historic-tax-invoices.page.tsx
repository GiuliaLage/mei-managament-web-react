import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getTaxInvoices,
  getTaxInvoicesTotalizers,
} from '../../../api/tax-invoices/tax-invoices.provider';
import { getCompanies } from '../../../api/companies/companies.provider';

import { Table, Select, Card, PageHeader } from 'antd';
import SpinLoader from '../../../components/spin-loader/spin-loader.component';
import {
  ContainerHistoricInvoice,
  CardContainer,
} from './historic-tax-invoice.style';

import { format } from 'date-fns';
import { formatCurrency } from '../../../utils/format-currency';
import { getMonthNames } from '../../../utils/month-names';
import { formatTotalizers } from '../../../utils/totalizers-format';

const { Option } = Select;

//TODO: limpar select e voltar a exibir todos os registros
//TODO: Paginação usando o servidor
//TOOD: Colocar botão para ir pra pagina emissão de notas fiscais

const HistoricTaxInvoicePage: React.FC = () => {
  const navigation = useNavigate();

  const [spinning, setSpinning] = useState(true);
  const [taxInvoices, setTaxInvoices] = useState([]);
  const [taxInvoicesParams, setTaxInvoicesFilters] = useState<any>({
    page: 0,
    take: 100,
  });

  const [companies, setCompanies] = useState([]);
  const [totalizers, setTotalizers] = useState<any>();
  const columns = [
    {
      title: 'Número NF',
      dataIndex: 'taxInvoiceNumber',
      key: 'taxInvoiceNumber',
    },
    {
      title: 'Valor NF',
      dataIndex: 'taxInvoiceValue',
      key: 'taxInvoiceValue',
      render: (row: any) => formatCurrency(row),
    },
    {
      title: 'Empresa',
      dataIndex: 'companyId',
      key: 'comapnyId',
      render: (row: any) => {
        const findCompany: any = companies.find(
          (company: any) => company.id === row,
        );
        if (findCompany) return findCompany.name;
      },
    },
    {
      title: 'Competência',
      dataIndex: 'competenceDate',
      key: 'competenceDate',
      render: (row: any) => format(new Date(row), 'MM/yyyy'),
    },
    {
      title: 'Data do pagamento',
      dataIndex: 'paymentDate',
      key: 'paymentDate',
      render: (row: any) => format(new Date(row), 'dd/MM/yyyy'),
    },
    {
      title: 'Descrição',
      dataIndex: 'description',
      key: 'description',
      render: (row: any) => (row ? row : '-'),
    },
    {
      title: 'Data da Criação',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (row: any) => format(new Date(row), 'dd/MM/yyyy HH:mm:ss'),
    },
  ];

  const currentYear = format(new Date(), 'yyyy');
  const currentMonth = format(new Date(), 'MM');

  const loadTaxInvoices = async (taxInvoicesParams: any) => {
    const response = await getTaxInvoices(taxInvoicesParams);
    return setTaxInvoices(response.data);
  };

  const loadCompanies = async () => {
    const response = await getCompanies({ take: 100, page: 0 });
    return setCompanies(response.data);
  };

  const loadTotalizers = async (totalizersParams: any) => {
    const response = await getTaxInvoicesTotalizers(totalizersParams);
    const totalizersFormated = await formatTotalizers(response);
    setTotalizers(totalizersFormated);
  };

  useEffect(() => {
    const loadPageData = async () => {
      try {
        await loadTaxInvoices(taxInvoicesParams);
        await loadCompanies();
        await loadTotalizers({ year: currentYear });
      } finally {
        setTimeout(() => {
          setSpinning(false);
        }, 300);
      }
    };
    loadPageData();
  }, []);

  const handleChooseCompany = async (companyId: string) => {
    try {
      setSpinning(true);
      await loadTaxInvoices({ ...taxInvoicesParams, companyId });
      await loadTotalizers({ year: currentYear, company_id: companyId });
    } finally {
      setTimeout(() => {
        setSpinning(false);
      }, 300);
    }
  };

  return !spinning ? (
    <>
      <PageHeader
        onBack={() => navigation(-1)}
        title="Histórico - Notas Fiscais"
      />
      <ContainerHistoricInvoice>
        <Select
          style={{ width: '40rem' }}
          placeholder="Selecione uma empresa"
          onChange={handleChooseCompany}
        >
          {companies.map((company: any) => {
            return (
              <Option key={company.id} value={company.id}>
                {company.name}
              </Option>
            );
          })}
        </Select>
        <CardContainer>
          <Card style={{ width: 300 }}>
            <p>Valor total notas emitidas {currentYear}</p>
            <p>{totalizers?.totalTaxInvoice}</p>
          </Card>
          <Card style={{ width: 300 }}>
            <p>Valor total notas emitidas {getMonthNames(currentMonth)}</p>
            <p>{totalizers?.taxInvoiceByCurrentMonth}</p>
          </Card>
        </CardContainer>
      </ContainerHistoricInvoice>

      <Table columns={columns} dataSource={taxInvoices} />
    </>
  ) : (
    <SpinLoader spinning={spinning} />
  );
};

export default HistoricTaxInvoicePage;
