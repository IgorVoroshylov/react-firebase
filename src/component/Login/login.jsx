import { useContext, useState } from 'react';
import { Context } from '../..';
import styles from './login.module.css';
import firebase from 'firebase'

const Login = () => {
   const {auth, fire} = useContext(Context);
   const ref = fire.firestore().collection('users');

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [emailError, setEmailError] = useState('');
   const [passwordError, setPasswordError] = useState('');
   const [hasAccount, setHasAccaunt] = useState(true);
   const [phone, setPhone] = useState('');
   const [name, setName] = useState('');
   const [surName, setSerName] = useState('');
   const [gender, setGender] = useState('');
   const [city, setCity] = useState('');


   const checkIn = () => {
      auth
         .createUserWithEmailAndPassword(email, password)
         .then(() => {
            resetInput();
         })
         .catch(err => {
            switch(err.code) {
              case 'auth/email-already-in-use':
              case 'auth/invalid-email':
                setEmailError(err.message);
                break;
              case 'auth/weak-password':
                setPasswordError(err.message);
                break;
            }
          })
   }

   const createUsers = () => {
      ref
         .doc(email)
         .set({
                  name,
                  surName,
                  email,
                  phone,
                  gender,
                  city,
                  createdAt: firebase.firestore.FieldValue.serverTimestamp()
               })
         .then(() => {
            resetInput()
         })
         .catch((err) => {
            console.log(err);
         });
   }

   const login = () => {
      auth
         .signInWithEmailAndPassword(email, password)
         .then(() => {
            resetInput()
         })
         .catch(err => {
            switch(err.code) {
              case 'auth/invalid-email':
              case 'auth/user-disabled':
              case 'auth/user-not-found':
                setEmailError(err.message);
                break;
              case 'auth/wrong-password':
                setPasswordError(err.message);
                break;
            }
          })
   }

   const resetInput = () => {
      setEmail('');
      setPassword('');
      setName('');
      setSerName('');
      setPhone('');
      setGender('');
      setCity('');
   }

   return(
      <section className={styles.login}>
         <div className={styles.loginContainer}>
            {
               hasAccount ?
               <div className={styles.btnContainer}>
                  <div className={styles.title}>Sign in</div>
                  <label>Username</label>
                  <input type="text"
                         autoFocus
                         required
                         value={email}
                         onChange={e => setEmail(e.target.value)}/>
                  <p className={styles.errorMsg}>{emailError}</p>

                  <label>Pssword</label>
                  <input type="password"
                         required
                         value={password}
                         onChange={e => setPassword(e.target.value)}/>
                  <p className={styles.errorMsg}>{passwordError}</p>

                  <button onClick={login} >Sign in</button>
                  <p className={styles.chengeVariant}>Don't have an account?<span onClick={() => setHasAccaunt(!hasAccount)}>Sign up</span></p>
               </div>
                :
               <div className={styles.btnContainer}>
                  <div className={styles.title}>Sign up</div>
                  <label>Phone</label>
                  <input type="number" name='number' value={phone} onChange={e => setPhone(e.target.value)}/>
                  <p></p>

                  <label>Username</label>
                  <input type="text" autoFocus required value={email} onChange={e => setEmail(e.target.value)} />
                  <p className={styles.errorMsg}>{emailError}</p>

                  <label>Password</label>
                  <input type="password" required value={password} onChange={e => setPassword(e.target.value)} />
                  <p className={styles.errorMsg}>{passwordError}</p>

                  <label>Name</label>
                  <input type="text" name='name' autoComplete="off" value={name} onChange={e => setName(e.target.value)}/>
                  <p></p>

                  <label>Surname</label>
                  <input type="text" name='surname' autoComplete="off" value={surName} onChange={e => setSerName(e.target.value)}/>
                  <p></p>

                  <label>Gender</label>
                  <input type="text" name='gender' autoComplete="off" value={gender} onChange={e => setGender(e.target.value)}/>
                  <p></p>

                  <label>City</label>
                  <input type="text" name='city' autoComplete="off" value={city} onChange={e => setCity(e.target.value)}/>
                  <p></p>

                  <button onClick={ () => {
                     checkIn();
                     createUsers();
                  }}>Sign up</button>
                  <p className={styles.chengeVariant}>Have an account? <span onClick={() => setHasAccaunt(!hasAccount)}>Sign in</span></p>
               </div>
            }
         </div>
      </section>
   )
}

export default Login;