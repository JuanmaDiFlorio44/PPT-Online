import * as admin from "../node_modules/firebase-admin";
//import * as serviceAccount from "./rtdb-key.json";
const serviceAccount = require("./key.json");

//importante para que no falle la rtdb
/*
You need to add your database url in admin.initializeApp

 admin.initializeApp({
 databaseURL:"your_database_url"
  });
*/

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://ppt-online-9f033-default-rtdb.firebaseio.com/",
});

//esta es la base de datos no sql
const firestore = admin.firestore();

//real-time data base de firebase
const rtdb = admin.database();

export { firestore, rtdb };
