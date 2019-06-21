import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import routes from './routes';
import store, { persistor } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Switch>{routes}</Switch>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
