import React from 'react';
import { useSelector } from 'react-redux';

// Pegando as rotas com o nome createRouter
import createRouter from './routes';

export default function App() {
  // Pega o status de logado ou nao
  const signed = useSelector(state => state.auth.signed);
  // passando para a const Routes as rotas de CreateRouter com o valor de logado
  const Routes = createRouter(signed);

  return <Routes />;
}
