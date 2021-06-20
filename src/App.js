import './App.css';

import Navbar from './component/Navbar/navbar';
import { BrowserRouter } from 'react-router-dom';
import Preloader from './component/Preloader/preloader';
import { useContext } from 'react';
import { Context } from '.';
import { useAuthState } from 'react-firebase-hooks/auth';
import AppRouter from './component/AppRouter/app_router';

function App() {
  const {auth} = useContext(Context);
  const [user, loading, error] = useAuthState(auth);
  //! useAuthState передает: user - пользователь, loading - переменная отвечает загружен юзер или нет, error - обьект с ошибкой
  if(loading) {
    return <Preloader/>
  }
  return (
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>

  );
}

export default App;
















// import React,{ useEffect, useState } from 'react';
// import './App.css';
// import AppRouter from './component/app_router';
// import Navbar from './component/Navbar/navbar';
// import { BrowserRouter } from 'react-router-dom';
// import firebase from 'firebase';
// import 'firebase/firestore'
// import 'firebase/auth'


// const fire = firebase.initializeApp({
//    apiKey: "AIzaSyDxcq4YyU5u8TPTm17CkKGuO3c2g2bNFW0",
//    authDomain: "project-social-network-9bd0e.firebaseapp.com",
//    projectId: "project-social-network-9bd0e",
//    storageBucket: "project-social-network-9bd0e.appspot.com",
//    messagingSenderId: "219487498540",
//    appId: "1:219487498540:web:99a3269b96f64bbb15fc89"
// });

// function App() {
//   const [user, setUser] = useState('');

//   const login = async () => {
//     const provider = new firebase.auth.GoogleAuthProvider();
//     const {user} = await fire.auth().signInWithPopup(provider);
//     setUser(user);
//     console.log(user);
//  }

//   const handleLogout = () => {
//     fire.auth().signOut();
//   }

//   const authListener = () => {
//     fire.auth().onAuthStateChanged(user => {
//       if(user) {
//         setUser(user)
//       } else {
//         setUser('')
//       }
//     })
//   }

//   useEffect(() => {
//     authListener()
//   })

//   return (
//       <BrowserRouter>
//         <Navbar handleLogout={handleLogout}
//                 user={user} />
//         <AppRouter login={login}
//                    user={user}
//         />
//       </BrowserRouter>

//   );
// }

// export default App;