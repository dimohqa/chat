import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Main } from './Main/Main';

import './index.css';

export const App = () => (
  <BrowserRouter>
    <Main />
  </BrowserRouter>
);
