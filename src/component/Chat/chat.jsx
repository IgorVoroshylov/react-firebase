import { useContext, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Context } from '../..';
import Preloader from '../Preloader/preloader';
import styles from './chat.module.css'
import firebase from 'firebase'
import Message from './message';
import { v4 as uuidv4 } from 'uuid';

const Chat = () => {
   const {auth, fire} = useContext(Context);
   const ref = fire.firestore().collection('messages');

   const [user] = useAuthState(auth);
   const [value, setValue] = useState('');
   const [messages, loading] = useCollectionData(ref.orderBy('createdAt'));

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
                  displayName: user.displayName,
                  photoURL: user.photoURL,
                  text: value,
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
         <div>Chat</div>
         <div className={styles.chat}>
           {messages.map( message => <Message key={message.id} deleteMessage={deleteMessage} message={message} user={user} /> )}
         </div>
         <div className={styles.chat_inner}>
            <div>
               <textarea className={styles.chat_input} type="text" name='text' value={value} onChange={chengeInputValue} />
            </div>
            <button onClick={ sendMessage } >Send</button>
         </div> 
      </div>
   )
}

export default Chat;

// const sendMessage = async () => {
//    firestore.collection('messages').add({
//       uid: user.uid,
//       displayName: user.displayName,
//       photoURL: user.photoURL,
//       text: value,
//       createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//       id: messages.length + 1
//    });
//    setValue('');
// }


//className={styles.btn} onClick={sendMessage}