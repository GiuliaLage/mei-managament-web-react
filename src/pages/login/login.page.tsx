import { Button, Form, Input, Spin } from 'antd';
import { login } from '../../api/auth/auth.provider';
import { useNavigate } from 'react-router-dom';
import { AuthRequest } from '../../api/auth/auth.interfaces';
import { useState } from 'react';
import { PageContainer } from './login.style';
import SpinLoader from '../../components/spin-loader/spin-loader.component';

const LoginPage = () => {
  console.log(import.meta.env.VITE_API_BASE_URL);
  const navigate = useNavigate();
  const [spinning, setSpinning] = useState(false);

  const onFinish = async (data: AuthRequest) => {
    try {
      setSpinning(true);
      await login(data);
      navigate('/inicio');
    } finally {
      setSpinning(false);
    }
  };

  return (
    <PageContainer>
      <SpinLoader spinning={spinning}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Por favor insira seu email!' }]}
          >
            <Input placeholder="Digite seu email" />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="password"
            rules={[{ required: true, message: 'Por favor insira sua senha!' }]}
          >
            <Input.Password placeholder="Digite sua senha" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Logar
            </Button>
          </Form.Item>
        </Form>
      </SpinLoader>
    </PageContainer>
  );
};

export default LoginPage;
