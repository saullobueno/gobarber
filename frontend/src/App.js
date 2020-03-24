import React from 'react';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

// Ferramenta para ajudar nos logs da aplicação. Substitui o console.log
import './config/ReactotronConfig';

import Routes from './routes';
import history from './services/history';
// Store do Redux tem q ser importado depois das configurações do Reactotron
import { store, persistor } from './store';
// Estilos globais
import GlobalStyle from './styles/global';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes />
          <GlobalStyle />
          <ToastContainer autoClose={3000} />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
