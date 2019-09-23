import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';
import React from 'react';
import { Box } from 'rebass';
import { theme } from './common/styles/basic.theme';
import Dashboard from './dashboard';

const MainContainer = styled(Box)`
  font-family: ${(props: any) => props.theme.fonts.body};
  button {
    cursor: pointer;
    margin-right: ${(props: any) => props.theme.space[2]}px;
    &:disabled {
      background-color: ${(props: any) => props.theme.colors.gray};
    }
  }
  input,
  select {
    border-radius: 4px;
    border: 1px solid ${(props: any) => props.theme.colors.gray};
    color: black;
    font-family: ${(props: any) => props.theme.fonts.body};
    font-size: ${(props: any) => props.theme.fontSizes[0]}px;
    height: 32px;
    padding: ${(props: any) => props.theme.space[2]}px;
    width: 100%;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: ${(props: any) => props.theme.space[3]}px 0;
    th {
      cursor: pointer;
      padding: ${(props: any) => props.theme.space[3]}px 0;

      &[data-active='true'] {
        color: ${(props: any) => props.theme.colors.primary};
      }
    }

    tbody tr {
      &:nth-of-type(2n) {
        background-color: ${(props: any) => props.theme.colors.lightgray};
      }

      &:hover {
        background-color: ${(props: any) => props.theme.colors.primary};
        color: white;
      }

      td {
        padding: ${(props: any) => props.theme.space[2]}px;
      }
    }
  }
`;

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <MainContainer p={4}>
        <Dashboard />
      </MainContainer>
    </ThemeProvider>
  );
};

export default App;
