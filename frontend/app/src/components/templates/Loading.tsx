import styles from '@/styles/spinner.module.css';
const Loading = () => {
    return (
        <div className={styles.spinnerSquare}>
            <div className={`${styles.square1} ${styles.square}`}></div>
            <div className={`${styles.square2} ${styles.square}`}></div>
            <div className={`${styles.square3} ${styles.square}`}></div>
            <div className={`${styles.square4} ${styles.square}`}></div>
        </div>
    );
};

export default Loading;
