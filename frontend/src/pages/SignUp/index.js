import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// Lib para formularios
import { Form, Input } from '@rocketseat/unform';
// Lib para validações
import * as Yup from 'yup';

import logo from '~/assets/logo.svg';
// Ações do redux
import { signUpRequest } from '~/store/modules/auth/actions';

// Validações
const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'No mínimo 6 caracteres')
    .required('A senha é obrigatória'),
});

export default function SignUp() {
  // Ação do redux
  const dispatch = useDispatch();
  // Ação do redux no submit do form
  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />

        <button type="submit">Criar conta</button>
        <Link to="/">Já tenho login</Link>
      </Form>
    </>
  );
}
