import styles from './main.module.css'

const Message = ({deleteMessage, message}) => {
   return (
            <div className={styles.message_block}>
               <div className={styles.nameBlock}>
                  <div className={styles.avatar}>
                     <img src={message.photoURL} className={styles.photo} alt="no foto" />
                  </div>
                  <div>{message.displayName}</div>
               </div>
               <div>
                  <p className={styles.message}>{message.text}</p>
               </div>
               <div>
                  <button onClick={ () => { deleteMessage(message.id)}} >Delete</button>
               </div>
            </div>)
}

export default Message;