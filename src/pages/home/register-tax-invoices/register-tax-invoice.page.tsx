import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SpinLoader from '../../../components/spin-loader/spin-loader.component';
import {
  PageHeader,
  Form,
  Select,
  InputNumber,
  DatePicker,
  Input,
  Button,
} from 'antd';
import {
  formatterInputNumber,
  parserInputNumber,
} from '../../../utils/format-currency';
import { getCompanies } from '../../../api/companies/companies.provider';
import { registerTaxInvoices } from '../../../api/tax-invoices/tax-invoices.provider';

import { openNotification } from '../../../utils/notification';

import locale from 'antd/es/date-picker/locale/pt_BR';

//TODO: Colocar mascara caso a data seja digitada manualmente, atualmente desabilitei essa opção
//TODO: Ao cadastrar passar como parametro pra tela de historico o id da compania para carregar apenas os dados dela

const RegisterTaxInvoicePage: React.FC = () => {
  const navigation = useNavigate();
  const [spinning, setSpinning] = useState(false);

  const [companies, setCompanies] = useState([]);

  const loadCompanies = async () => {
    const response = await getCompanies({ take: 100, page: 0 });
    return setCompanies(response.data);
  };

  const handleFormSubmit = async (formData: any) => {
    await registerTaxInvoices(formData);
    openNotification('success', {
      title: 'Nota fiscal cadastrada com sucesso!',
    });

    navigation('/historico/notas-fiscais');
  };

  useEffect(() => {
    const loadPageData = async () => {
      try {
        await loadCompanies();
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
      <PageHeader
        onBack={() => navigation(-1)}
        title="Lançamento de nota fiscal"
      />
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={handleFormSubmit}
      >
        <Form.Item
          label="Empresa"
          name="companyId"
          rules={[
            { required: true, message: 'Por favor selecione uma empresa!' },
          ]}
        >
          <Select
            style={{ width: '40rem' }}
            placeholder="Selecione uma empresa"
          >
            {companies.map((company: any) => {
              return (
                <Select.Option key={company.id} value={company.id}>
                  {company.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          label="Valor da Nota"
          name="taxInvoiceValue"
          rules={[
            { required: true, message: 'Por favor preencha o valor da nota!' },
          ]}
        >
          <InputNumber
            formatter={(value: any) => formatterInputNumber(value)}
            parser={(value) => parserInputNumber(value)}
            placeholder="R$ 0,00"
          />
        </Form.Item>

        <Form.Item
          label="Número da Nota"
          name="taxInvoiceNumber"
          rules={[
            { required: true, message: 'Por favor preencha o valor da nota!' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Descrição" name="description">
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Competência"
          name="competenceDate"
          rules={[
            {
              required: true,
              message: 'Por favor preencha a data da competência!',
            },
          ]}
        >
          <DatePicker
            inputReadOnly={true}
            locale={locale}
            format={'DD/MM/yyyy'}
          />
        </Form.Item>

        <Form.Item
          label="Data do pagamento"
          name="paymentDate"
          rules={[
            {
              required: true,
              message: 'Por favor preencha a data do pagamento!',
            },
          ]}
        >
          <DatePicker
            inputReadOnly={true}
            locale={locale}
            format={'DD/MM/yyyy'}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button
            style={{ width: '12rem' }}
            size="large"
            type="primary"
            htmlType="submit"
          >
            Lançar Nota
          </Button>
        </Form.Item>
      </Form>
    </>
  ) : (
    <SpinLoader spinning={spinning} />
  );
};

export default RegisterTaxInvoicePage;
