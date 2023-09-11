import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgopJ018cxUdVR4FYolQ7m84-dwlI1GZ0",
  authDomain: "vue-firebase-f88c1.firebaseapp.com",
  projectId: "vue-firebase-f88c1",
  storageBucket: "vue-firebase-f88c1.appspot.com",
  messagingSenderId: "1071539503035",
  appId: "1:1071539503035:web:7071bded270cf143aa0e9e",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
export const storage = getStorage();

const app = createApp(App);
app.use(router);

app.mount("#app");
