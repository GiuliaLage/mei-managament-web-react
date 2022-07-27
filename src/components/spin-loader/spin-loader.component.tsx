import React from 'react';
import { Spin } from 'antd';
import { SpinContainer } from './spin-loader.styled';

export interface Props {
  spinning: boolean;
  children?: React.ReactNode;
}

const SpinLoader: React.FC<Props> = ({ spinning, children }: Props) => {
  return (
    <SpinContainer>
      <Spin spinning={spinning} tip="Carregando...">
        {children}
      </Spin>
    </SpinContainer>
  );
};

export default SpinLoader;
