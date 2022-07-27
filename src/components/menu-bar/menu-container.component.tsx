import React, { useState } from 'react';
import { Menu } from './menu-bar.style';
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import {
  HomeOutlined,
  HistoryOutlined,
  SettingOutlined,
} from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

//TODO: centralizar o estado das props defaultSelectedKeys e defaultOpenKeys;

const MenuBarComponent: React.FC = () => {
  const navigate = useNavigate();
  const [defaultSelectedKeys, setDefaultSelectedKeys] =
    useState<string>('inicio');
  const [defaultOpenKeys, setDefaultOpenKeys] = useState<string[]>(['inicio']);

  const menuItems: MenuItem[] = [
    { label: 'Início', key: '/inicio', icon: <HomeOutlined /> },
    {
      label: 'Histórico de lançamentos',
      key: '/historico',
      icon: <HistoryOutlined />,
      children: [
        { label: 'Notas Fiscais', key: '/historico/notas-fiscais', icon: null },
        { label: 'Despesas', key: '/historico/despesas', icon: null },
      ],
    },
    {
      label: 'Preferências',
      key: '/preferencias',
      icon: <SettingOutlined />,
      children: [
        { label: 'Empresas', key: '/preferencias/empresas', icon: null },
        {
          label: 'Categorias Despesas',
          key: '/preferencias/categorias-despesas',
          icon: null,
        },
        {
          label: 'Configurações',
          key: '/preferencias/configurações',
          icon: null,
        },
        { label: 'Sair', key: '/login', icon: null },
      ],
    },
  ];

  const handleDefaultSelectedKeys = ({ key, keyPath }: any) => {
    key === '/login' && Cookies.remove('access_token');
    navigate(key);
    setDefaultSelectedKeys(key);
    setDefaultOpenKeys(keyPath);
  };

  return (
    <Menu
      onClick={handleDefaultSelectedKeys}
      style={{ width: 256 }}
      defaultSelectedKeys={[defaultSelectedKeys]}
      defaultOpenKeys={defaultOpenKeys}
      mode="inline"
      items={menuItems}
    />
  );
};

export default MenuBarComponent;
