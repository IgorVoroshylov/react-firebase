import styles from './header.module.css';
import { useContext } from 'react';
import { Context } from '../..';
import {useAuthState} from 'react-firebase-hooks/auth';

const Header = () => {
   const {auth} = useContext(Context);
   const [user] = useAuthState(auth);

   const logOut = () => {
      auth.signOut();
   }

   return (
      <div className={styles.nav}>
         <div className={styles.title}>network</div>
         <div >
            {
               user ?
               <div className={styles.navLine}>
                  <div className={styles.userName}>{user ? user.email : null}</div>
                  <button onClick={logOut}>Log Out</button>
               </div>
               :
               null
               // <NavLink to={'/login'}>
               //    <button>Login</button>
               // </NavLink>
            }
            
         </div>
      </div>
   )
}

export default Header;