import React from 'react';
import {
  Routes,
  Route,
  unstable_HistoryRouter as HistoryRouter,
  BrowserRouter,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PrivateRoute from './private-route';
import LoginPage from '../pages/login/login.page';
import HomePage from '../pages/home/home.page';
import CompaniesPage from '../pages/preferences/companies/companies.page';
import RegisterTaxInvoicePage from '../pages/home/register-tax-invoices/register-tax-invoice.page';
import HistoricTaxInvoicePage from '../pages/historic/tax-invoices/historic-tax-invoices.page';

const history = createBrowserHistory();

const AppRoutes: React.FC = () => {
  return (
    <>
      <HistoryRouter history={history}>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route
            path="inicio"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="preferencias/empresas"
            element={
              <PrivateRoute>
                <CompaniesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="historico/notas-fiscais"
            element={
              <PrivateRoute>
                <HistoricTaxInvoicePage />
              </PrivateRoute>
            }
          />
          <Route
            path="cadastrar/nota-fiscal"
            element={
              <PrivateRoute>
                <RegisterTaxInvoicePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </HistoryRouter>
    </>
  );
};

export default AppRoutes;
