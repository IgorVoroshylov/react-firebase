import { useContext } from 'react';
import { Context } from '../..';
import styles from './login.module.css';
import firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Login = () => {
   const {auth} = useContext(Context);

   const login = async () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      const {user} = await auth.signInWithPopup(provider);
  }

   return (
      <div className={styles.block}>
         <div>
            <button className={styles.enter} onClick={login} >Enter with Google</button>
         </div>
      </div>
   )
}

export default Login;







// import styles from './login.module.css';

// const Login = ({ login }) => {
//    return (
//       <div className={styles.block}>
//          <div>
//             <button className={styles.enter} onClick={login} >Enter with Google</button>
//          </div>
//       </div>
//    )
// }

// export default Login;