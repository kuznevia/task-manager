import 'app/styles/globalStyles.css';

import { ChakraProvider } from '@chakra-ui/react';
import { AppRouter as Router } from 'app/providers/Router';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <Router />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
