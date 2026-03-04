// Import the functions you need from the SDKs you need
import { initializeApp,getApps,getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
getStorage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0K9w5tPHYGBJHiHFbaCVMRNA3IHBGHWs",
  authDomain: "insta-c-9212d.firebaseapp.com",
  projectId: "insta-c-9212d",
  storageBucket: "insta-c-9212d.appspot.com",
  messagingSenderId: "764022364079",
  appId: "1:764022364079:web:a6f3773a7108c43695015a"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig):getApp();
const db=getFirestore(app);
const storage=getStorage(app);
export { app, db, storage};