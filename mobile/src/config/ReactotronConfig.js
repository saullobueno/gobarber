import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';

// se estiver em ambiente de desemvolvimento...
if (__DEV__) {
  const tron = Reactotron.configure(/* se estiver no android colocamos aqui o ip da nossa maquina: { host: '192.168.0.1'}*/)
    .useReactNative()
    .use(reactotronRedux())
    .use(reactotronSaga())
    .connect();

  tron.clear();

  console.tron = tron;
}
