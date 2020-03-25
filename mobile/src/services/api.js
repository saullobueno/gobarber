import axios from 'axios';

const api = axios.create({
  /* localhost:3333 é para iOS, se for Android Studio será http://10.0.2.2:3333,
  se for outro emulador  http://10.0.2.2:3333. Se for usb ou outro sem ser emulador
  usa o ip da maquina, ex: http://192.168.0.2:3333
  */
  baseURL: 'http://localhost:3333',
});

export default api;
