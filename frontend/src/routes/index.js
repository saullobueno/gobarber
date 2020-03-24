import React from 'react';
// Para não deixar sobrescrever rotas
import { Switch } from 'react-router-dom';
// importamos nosso proprio route criado nesta mesma pasta
import Route from './Route';
// Paginas
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      {/*Criando PageNotFound: <Route path="/" component={() => <h1>404 - Página não encontrada</h1>} /> */}
    </Switch>
  );
}
