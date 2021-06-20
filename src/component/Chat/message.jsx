import styles from './chat.module.css'

const Message = ({deleteMessage, message, user}) => {
   return (
      <div className={user.uid === message.uid ? styles.message_block : styles.message_block2}>
         <div className={styles.nameBlock}>
            <div className={styles.avatar}>
               <img src={message.photoURL} className={styles.photo} alt="sorry..." />
            </div>
            <div>{message.displayName}</div>
         </div>
         <div>
            <p className={styles.message}>{message.text}</p>
         </div>
         <div>
            <button onClick={ () => { deleteMessage(message.id)}} >Delete</button>
         </div>
      </div>
   )
}

export default Message;