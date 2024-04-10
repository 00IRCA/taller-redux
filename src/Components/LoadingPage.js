import { ClipLoader } from "react-spinners"
import styles from "../styles.module.css"

export default function LoadingPage({loading}) {
    return (
        <div className={styles.page} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div style={{display: "inline"}}>
            <ClipLoader
                loading={loading}
                color="white"
                size={150}/>
            </div>
        </div>
    )
}