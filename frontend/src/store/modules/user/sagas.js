import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

// Saga para alteração de usuario
export function* updateProfile({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload.data;

    // condicional para caso ele tenha preenchido a senha antiga e ai ele uni os objetos (Object.assign)
    const profile = Object.assign(
      { name, email, avatar_id },
      rest.oldPassword ? rest : {}
    );
    // Acessa a api e faz a alteração
    const response = yield call(api.put, 'users', profile);
    // Toast de sucesso
    toast.success('Perfil atualizado com sucesso!');
    // Chama a action de sucesso
    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    // Se erro chama toast e action de falha
    toast.error('Erro ao atualizar perfil, confira seus dados!');
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
