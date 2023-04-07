import './index.css';

import { ChakraProvider } from '@chakra-ui/react';
import { Login } from 'components/Authorization/Login/Login';
import { Registration } from 'components/Authorization/Registration/Registration';
import { RestorePassword } from 'components/Authorization/RestorePassword/RestorePassword';
import { Dashboard } from 'components/Dashboard/Dashboard';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/restorePassword" element={<RestorePassword />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
