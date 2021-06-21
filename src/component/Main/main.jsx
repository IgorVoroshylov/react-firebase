import { useContext, useEffect, useState } from 'react';
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
   const [user] = useAuthState(auth);

   const refMessages = fire.firestore().collection('messages');
   const refUsers = fire.firestore().collection('users');

   const [loading, setLoading] = useState(false);
   const [messages, setMessage] = useState([]);
   const [textareaValue, setTextareaValue] = useState('');

   const [users] = useCollectionData(refUsers.where('email', '==', user.email));


   const chengeInputValue = (e) => {
      setTextareaValue(e.target.value);
   }

   function getMessages() {
      setLoading(true);
      refMessages
         .orderBy('createdAt', 'desc')
         //.where('displayName', '==', user.email)
         //.limit(3)
         .onSnapshot((querySnapshot)=> {
            const items = [];
            querySnapshot.forEach((doc) => {
               items.push(doc.data());
            });
      setMessage(items);
      setLoading(false);
      });
   }

   useEffect(() => {
      getMessages()
   }, []);

   function sendMessage() {
      const id = uuidv4();
      refMessages
         .doc(id)
         .set({
                  id,
                  uid: user.uid,
                  displayName: users[0].surName,
                  photoURL: user.photoURL,
                  text: textareaValue,
                  createdAt: firebase.firestore.FieldValue.serverTimestamp()
               })
         .catch((err) => {
            console.log(err);
         });
         setTextareaValue('')
   }

   function deleteMessage(id) {
      refMessages
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
      <div>
         {
            users ?
               <div className={styles.chat_box}>
                  <div className={styles.chat_inner}>
                     <div>
                        <textarea className={styles.chat_input} type="text" name='text' value={textareaValue} onChange={chengeInputValue} />
                     </div>
                     <button onClick={ sendMessage } >Send</button>
                  </div>
                  <div className={styles.chat}>
                     {messages.map( message => <Message key={message.id} deleteMessage={deleteMessage} message={message} /> )}
                  </div>
               </div>
               :
               <div></div>
         }
         </div>)
}

export default Main;