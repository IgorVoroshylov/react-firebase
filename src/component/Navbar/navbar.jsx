import { NavLink } from 'react-router-dom';
import styles from './navbar.module.css';
import { useContext } from 'react';
import { Context } from '../..';
import {useAuthState} from 'react-firebase-hooks/auth';

const Navbar = () => {
   const {auth} = useContext(Context);
   const [user] = useAuthState(auth);

   return (
      <div className={styles.nav}>
         <div className={styles.title}>navbar</div>
         <div className={styles.buttons}>
            {
               user ?
               <div className={styles.navName_button}>
                  <div>{user.displayName}</div>
                  <button onClick={() => auth.signOut()}>Out</button>
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

export default Navbar;




// import { NavLink } from 'react-router-dom';
// import styles from './navbar.module.css'

// const Navbar = ({ handleLogout, user }) => {
//    return (
//       <div className={styles.nav}>
//          <div className={styles.title}>navbar</div>
//          <div className={styles.buttons}>
//             {
//                user ?
//                <button onClick={handleLogout} >Out</button>
//                :
//                <NavLink to={'/login'}>
//                   <button>Login</button>
//                </NavLink>
//             }
            
//          </div>
//       </div>
//    )
// }

// export default Navbar;