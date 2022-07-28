import React, { useEffect, useState } from 'react';
import { getCompanies } from '../../../api/companies/companies.provider';
import { Table, PageHeader, Form, Input, Button } from 'antd';
import SpinLoader from '../../../components/spin-loader/spin-loader.component';
import { useNavigate } from 'react-router-dom';
import { openNotification } from '../../../utils/notification';
import { registerCompany } from '../../../api/companies/companies.provider';
import { format } from 'date-fns';

//TODO: Colocar mascara no input de CPNJ
//TODO: Paginação vinda do servidor

const CompaniesPage: React.FC = () => {
  const [spinning, setSpinning] = useState(true);
  const navigation = useNavigate();

  const [companies, setCompanies] = useState([]);
  const [companiesParams] = useState<any>({
    page: 0,
    take: 100,
    order: 'createdAt',
    orderDirection: 'DESC',
  });

  const columns = [
    {
      title: 'CNPJ',
      dataIndex: 'cnpj',
      key: 'cnpj',
    },
    {
      title: 'Empresa',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Razão Social',
      dataIndex: 'socialname',
      key: 'socialname',
    },
    {
      title: 'Data da Criação',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (row: any) => format(new Date(row), 'dd/MM/yyyy HH:mm:ss'),
    },
  ];

  const listCompanies = async (companiesParams: any) => {
    try {
      setSpinning(true);
      const response = await getCompanies(companiesParams);
      setCompanies(response.data);
    } finally {
      setTimeout(() => {
        setSpinning(false);
      }, 300);
    }
  };

  const handleFormSubmit = async (formData: any) => {
    await registerCompany(formData);
    openNotification('success', { title: 'Empresa cadastrada com sucesso!' });
    listCompanies(companiesParams);
  };

  useEffect(() => {
    const companys = async () => {
      try {
        await listCompanies(companiesParams);
      } finally {
        setTimeout(() => {
          setSpinning(false);
        }, 300);
      }
    };
    companys();
  }, []);

  return !spinning ? (
    <>
      <PageHeader
        onBack={() => navigation(-1)}
        title="Preferências - Empresas"
      />
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={handleFormSubmit}
      >
        <Form.Item
          label="CNPJ"
          name="cnpj"
          rules={[{ required: true, message: 'Por favor preencha o CNPJ!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Nome"
          name="name"
          rules={[
            {
              required: true,
              message: 'Por favor preencha o nome da empresa!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Razão Social"
          name="socialname"
          rules={[
            {
              required: true,
              message: 'Por favor preencha a razão social da empresa!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
          <Button
            style={{ width: '12rem' }}
            size="large"
            type="primary"
            htmlType="submit"
          >
            Cadastrar empresa
          </Button>
        </Form.Item>
      </Form>
      <Table columns={columns} dataSource={companies} />
    </>
  ) : (
    <SpinLoader spinning={spinning} />
  );
};

export default CompaniesPage;
