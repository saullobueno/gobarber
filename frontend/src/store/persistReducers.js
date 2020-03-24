// Lib para persistir dados do usuario no LocalStorage
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      // Aqui colocamos a chave da aplicação para não confundir com outros estados de outras aplicações
      key: 'gobarber',
      // Storage que importamos e queremos usar
      storage,
      // Nome dos reducers que queremos persistir
      whitelist: ['auth', 'user'],
    },
    reducers
  );

  return persistedReducer;
};
