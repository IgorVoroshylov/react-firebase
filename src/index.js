import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase';
import "firebase/firestore"
import "firebase/auth"

const fire = firebase.initializeApp({
   apiKey: "AIzaSyDxcq4YyU5u8TPTm17CkKGuO3c2g2bNFW0",
   authDomain: "project-social-network-9bd0e.firebaseapp.com",
   projectId: "project-social-network-9bd0e",
   storageBucket: "project-social-network-9bd0e.appspot.com",
   messagingSenderId: "219487498540",
   appId: "1:219487498540:web:99a3269b96f64bbb15fc89"
});

const auth = fire.auth();
export const Context = createContext(null);

ReactDOM.render(
  <Context.Provider value={{
    fire,
    auth,
  }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();