import React from 'react';
import { Container, MainContent, MenuBar } from './base-container.style';
import MenuBarComponent from '../menu-bar/menu-container.component';

interface Props {
  mainContent: React.ReactNode;
}

const ContainerComponent: React.FC<Props> = ({ mainContent }: Props) => {
  return (
    <Container>
      <MenuBar>
        <MenuBarComponent />
      </MenuBar>
      <MainContent>{mainContent}</MainContent>
    </Container>
  );
};

export default ContainerComponent;
