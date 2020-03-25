import React from 'react';
// Integração do redux com o persist
import { PersistGate } from 'redux-persist/integration/react';
// Redux
import { Provider } from 'react-redux';
// para trabalhar a status bar, que é onde fica o relogio, bateria, etc
import { StatusBar } from 'react-native';
// Config do Reactotron
import './config/ReactotronConfig';
// Store do Redux
import { store, persistor } from './store';
// É no App q temos as rotas
import App from './App';

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {/* setando cores e background da statusbar */}
        <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
        <App />
      </PersistGate>
    </Provider>
  );
}
