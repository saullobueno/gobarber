import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
// importando os diferentes layouts
import AuthLayout from '~/pages/_layouts/auth';
import DefaultLayout from '~/pages/_layouts/default';

import { store } from '~/store';

// Fazendo nosso proprio Route do react-router-dom
export default function RouteWrapper({
  // Pegando as propriedades da rota
  component: Component,
  isPrivate,
  ...rest
}) {
  // Passando para uma variavel se está logado
  const { signed } = store.getState().auth;

  // Se não estiver logado e a rota for privada
  if (!signed && isPrivate) {
    // Faz voltar para a página de login
    return <Redirect to="/" />;
  }

  // Se estiver logado e a rota nao for privada
  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  // Escolhendo o layout caso esteja logado ou não
  const Layout = signed ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...rest}
      // trocamos o metodo component por render pra renderizar a função props e depois renderizamos o component
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  // Seta o tipo como elemento do react ou uma função
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};
// seta o valor default de isPrivate como false
RouteWrapper.defaultProps = {
  isPrivate: false,
};
