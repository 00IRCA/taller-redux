import UsersContainer from "../Components/UsersContainer"
import styles from "../styles.module.css"

export default function FriendsPage() {
    
    return (
        <div className={styles.page}>
            <h2>Amigos</h2>
            <UsersContainer />
        </div>
    )
}