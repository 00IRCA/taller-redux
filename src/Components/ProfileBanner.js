import { useNavigate } from "react-router-dom"
import styles from "./ProfileBanner.module.css"

export default function ProfileBanner({user, clickable}) {

    const navigate = useNavigate();

    function isClickable() {
        if(clickable){
            navigate(`/profile/${user.id}`)
        }
    }
    return (
        <div className={styles.profileBanner} onClick={isClickable}>
            <div className={styles.avatar}>
                <img className={styles["avatar-image"]} src={"/assets/default_avatar.jpg"} />
            </div>
            <div>
                <span>{user.name}</span>
            </div>
            <div>
                <span>Seguidores: {user.followers}</span>
            </div>
        </div>
    )
}