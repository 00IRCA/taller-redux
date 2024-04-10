import { Link, Outlet } from "react-router-dom";
import styles from "./ProfileContent.module.css"

export default function ProfileContent() {
    return (
        <div className="profileContent">
            <div className={styles.contentSelection}>
                <Link to={"posts"}>Posts</Link>
                <Link to={"lists"}>Listas</Link>
            </div>
            {<Outlet />}
        </div>
    )
}