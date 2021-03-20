import React from 'react';
import locale from 'antd/es/date-picker/locale/ru_RU';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { Main } from './Main/Main';
import { store } from './store';

export const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <ConfigProvider locale={locale.lang}>
        <Main />
      </ConfigProvider>
    </Provider>
  </BrowserRouter>
);
