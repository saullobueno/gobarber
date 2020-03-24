// Lib para manipular o estado
import produce from 'immer';

// Estados
const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    // condições
    switch (action.type) {
      // Na requisição aparecerá apenas o loading
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      // No sucesso setamos os estados
      case '@auth/SIGN_IN_SUCCESS': {
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      // Na falha setamos o loading como false
      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }
      // No logout zeramos tudo
      case '@auth/SIGN_OUT': {
        draft.token = null;
        draft.signed = false;
        break;
      }
      default:
    }
  });
}
