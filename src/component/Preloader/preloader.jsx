import styles from './preloader.module.css'

const Preloader = () => {
   return(
      <div className={styles.preloader_box}>
            <div className={styles.lds_hourglass}></div>
      </div>
   )
}

export default Preloader;
