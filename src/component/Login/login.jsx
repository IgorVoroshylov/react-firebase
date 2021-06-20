import { useContext, useState } from 'react';
import { Context } from '../..';
import styles from './login.module.css';

const Login = () => {
   const {auth} = useContext(Context);
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


   const register = () => {
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
   }

   return(
      <section className={styles.login}>
         <div className={styles.loginContainer}>
            {
               hasAccount ?
               <div className={styles.btnContainer}>
                  <div className={styles.title}>Sign in</div>
                  <label>Username</label>
                  <input type="text" autoFocus required value={email} onChange={e => setEmail(e.target.value)} />
                  <p className={styles.errorMsg}>{emailError}</p>

                  <label>Pssword</label>
                  <input type="password" required value={password} onChange={e => setPassword(e.target.value)} />
                  <p className={styles.errorMsg}>{passwordError}</p>

                  <button onClick={login} >Sign in</button>
                  <p className={styles.chengeVariant}>Don't have an account? <span onClick={() => setHasAccaunt(!hasAccount)}>Sign up</span></p>
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
                  <input type="text" name='name' autocomplete="off" value={name} onChange={e => setName(e.target.value)}/>
                  <p></p>

                  <label>Surname</label>
                  <input type="text" name='surname' value={surName} onChange={e => setSerName(e.target.value)}/>
                  <p></p>

                  <label>Gender</label>
                  <input type="text" name='gender' value={gender} onChange={e => setGender(e.target.value)}/>
                  <p></p>

                  <label>City</label>
                  <input type="text" name='city' value={city} onChange={e => setCity(e.target.value)}/>
                  <p></p>

                  <button onClick={register}>Sign up</button>
                  <p className={styles.chengeVariant}>Have an account? <span onClick={() => setHasAccaunt(!hasAccount)}>Sign in</span></p>
               </div>
            }
         </div>
      </section>
   )
}

export default Login;







// (
//    <div>
//       <div>
//          <h1>Login</h1>
//          <h3>Login/Register</h3>
//          <input type="email" value={email} onChange={ e => setEmail(e.target.value)} placeholder='email' />
//          <input type="password" value={password} onChange={ e => setPassword(e.target.value)} placeholder='password' />
//          <div className={styles.errorField}>{error}</div>
//          <button onClick={register}>Register</button>
//          <button onClick={login}>Login</button>
//       </div>
//    </div>
// )