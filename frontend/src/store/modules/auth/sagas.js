import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

// Saga de login
export function* signIn({ payload }) {
  try {
    // pega os dados recebidos
    const { email, password } = payload;
    // acessa a api com os dados acima
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });
    // pega os dados recebidos da api
    const { token, user } = response.data;
    // Se não for prestador de serviço retorna erro
    if (!user.provider) {
      toast.error('Usuário não é prestador');
      return;
    }
    // Aqui setamos o token de logado no headers
    api.defaults.headers.Authorization = `Bearer ${token}`;
    // dando tudo certo dispara a action de sucesso
    yield put(signInSuccess(token, user));
    // navega o usuario para o dashboard
    history.push('/dashboard');

    // se der erro...
  } catch (err) {
    toast.error('Falha na autenticação, verifique seus dados');
    yield put(signFailure());
  }
}

// Saga de cadastro
export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
      provider: true,
    });

    history.push('/');
  } catch (err) {
    toast.error('Falha no cadastro, verifique seus dados!');

    yield put(signFailure());
  }
}

// Saga do token. Setando token para persistir os dados do token no headers
export function setToken({ payload }) {
  // Se não tiver nada no payload, apenas retorna
  if (!payload) return;
  // Pega os dados
  const { token } = payload.auth;

  // Se existir, setamos o token de logado no headers
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

// Saga do logout
export function signOut() {
  history.push('/');
}

// Exportando todos os sagas
export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
