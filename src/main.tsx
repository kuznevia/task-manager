import './index.css';

import { ChakraProvider } from '@chakra-ui/react';
import { Login } from 'components/Login/Login';
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
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
