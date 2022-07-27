import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/antd.css';
import AppRoutes from './routes/routes';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>,
);
