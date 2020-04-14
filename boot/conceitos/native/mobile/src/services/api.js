import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

// IOS com emulador: localhost
// IOS usb: IP da maquina
// Android emulador: localhost (adb reverse)
// Android emulador: 10.0.2.2 (android studio)
// Android emulador: 10.0.3.2 (geny)
// Android usb: IP da maquina

export default api;
