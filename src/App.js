import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import routes from './routes';
import store, { persistor } from './redux/store';

const theme = {
  primaryColor: '#e25141',
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Switch>{routes}</Switch>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ThemeProvider> );
}

export default App;
