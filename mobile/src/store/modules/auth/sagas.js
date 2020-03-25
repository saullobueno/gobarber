// o alert aqui substitui o toostfy
// o history tbm nao é usado. Fazemos o direcionamento no Routes
import { Alert } from 'react-native';
import { takeLatest, call, put, all /* , delay */ } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (user.provider) {
      // Alert substituindo o toastfy
      Alert.alert(
        'Erro no login',
        'O usuário não pode ser prestador de serviços'
        );
        return;
      }

      api.defaults.headers.Authorization = `Bearer ${token}`;

      // Para colocarmos um delay para aparecer o loading no botao, fazemos: yield delay(3000);

      yield put(signInSuccess(token, user));

      // history.push('/dashboard');
    } catch (err) {
    // Alert substituindo o toastfy
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique seus dados'
    );
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
      // Aqui eu retiro o provider, para q o cadastro no mobile nao serja para prestadores de serviço
    });

    // history.push('/');
  } catch (err) {
    Alert.alert(
      'Falha no cadastro',
      'Houve um erro no cadastro, verifique seus dados'
    );

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

/*
  export function signOut() {
  history.push('/');
  }
*/

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
