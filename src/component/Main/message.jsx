import styles from './main.module.css'

const Message = ({deleteMessage, message}) => {
   return (
            <div className={styles.message_block}>
               <div className={styles.nameBlock}>
                  <div className={styles.title}>
                     <img src={message.photoURL} className={styles.photo} alt="no_foto" />
                     <p>{message.displayName}</p>
                  </div>
                  <div className={styles.city}>
                     <p>{message.city}</p>
                  </div>
               </div>
               <p className={styles.message}>{message.text}</p>
               <div className={styles.message_btn}>
                  <button className={styles.btn + ' ' + styles.send_mesmessage_btn} onClick={ () => { deleteMessage(message.id)}} >Delete</button>
               </div>
            </div>)
}

export default Message;