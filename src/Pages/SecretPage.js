import styles from "../styles.module.css"

export default function SecretPage() {
    
    return (
        <div className={styles.page}>
            <div className={styles.secretContainer}>
                <img className={styles.secret} src="assets/cat.jpeg" alt="cat"></img>
            </div>
        </div>
    )
}