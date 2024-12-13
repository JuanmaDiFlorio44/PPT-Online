import { initializeApp } from "../node_modules/firebase/app";
import {
  getDatabase,
  ref,
  set,
  onValue,
  DataSnapshot,
} from "../node_modules/firebase/database";

const firebaseConfig = {
  //usuarios y servicios => cuentas de servicios => secretos de la base de datos
  //ahi encuentro la key
  apiKey: "AIzaSyA7h1I_DCGYe-KUMR6MOiYHkGCd2tVd2Q8",
  databaseURL: "https://ppt-online-9f033-default-rtdb.firebaseio.com",
  authDomain: "ppt-online-9f033.firebaseapp.com",
  projectId: "ppt-online-9f033",
};

const firebaseApp = initializeApp(firebaseConfig);
const rtdb = getDatabase(firebaseApp); //RTDB//

export { rtdb };
