import styled from 'styled-components';

const MenuBar = styled.div`
  grid-area: 'menu-bar';
`;

const MainContent = styled.div`
  grid-area: 'main-content';
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 20rem 70%;
  grid-template-areas:
    'menu-bar main-content main-content main-content'
    'menu-bar main-content main-content main-content'
    'menu-bar main-content main-content main-content';
  align-items: stretch;
`;

export { Container, MainContent, MenuBar };
