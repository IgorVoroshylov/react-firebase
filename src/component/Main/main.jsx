import { useContext, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Context } from '../..';
import Preloader from '../Preloader/preloader';
import styles from './main.module.css'
import firebase from 'firebase'
import Message from './message';
import { v4 as uuidv4 } from 'uuid';

const Main = () => {
   const {auth, fire} = useContext(Context);
   const ref = fire.firestore().collection('messages');

   const [user] = useAuthState(auth);
   const [textareaValue, setValue] = useState('');
   const [messages, loading] = useCollectionData(ref.orderBy('createdAt', 'desc'));

   const chengeInputValue = (e) => {
      setValue(e.target.value);
   }

   function sendMessage() {
      const id = uuidv4();
      ref
         .doc(id)
         .set({
                  id,
                  uid: user.uid,
                  displayName: user.email,
                  photoURL: user.photoURL,
                  text: textareaValue,
                  createdAt: firebase.firestore.FieldValue.serverTimestamp()
               })
         .catch((err) => {
            console.log(err);
         });
         setValue('')
   }

   function deleteMessage(id) {
      ref
         .doc(id)
         .delete()
         .catch((err) => {
            console.log(err);
         });
   }

   if(loading) {
      return <Preloader/>
   }

   return (
      <div className={styles.chat_box}>
         <div className={styles.chat_inner}>
            <div>
               <textarea className={styles.chat_input} type="text" name='text' value={textareaValue} onChange={chengeInputValue} />
            </div>
            <button onClick={ sendMessage } >Send</button>
         </div>
         <div className={styles.chat}>
           {messages.map( message => <Message key={message.id} deleteMessage={deleteMessage} message={message} user={user} /> )}
         </div>
      </div>
   )
}

export default Main;