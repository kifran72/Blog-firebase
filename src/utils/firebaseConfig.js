const FirebaseConfig = {
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: process.env.VUE_APP_AUTH,
  projectId: process.env.VUE_APP_PROJECTID,
  storageBucket: process.env.VUE_APP_BUCKET,
  messagingSenderId: process.env.VUE_APP_SENDERID,
  appId: process.env.VUE_APP_APPID,
};

export default FirebaseConfig;
