import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import styles from "../styles.module.css"

export default function Root() {
    return (
        <div className={styles.content}>
            <Header />
            <Outlet />
        </div>
    )
}