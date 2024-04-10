import { Link } from "react-router-dom"
import styles from "../styles.module.css"
import HomePageStyles from "./HomePage.module.css"
import cn from "classnames"
import { useContext } from "react"
import { AppContext } from "../App"

export default function HomePage() {
    const { user } = useContext(AppContext)

    return (
        <div className={styles.page}>
            <h2 className={HomePageStyles.title}>Pagina Principal</h2>
            <div className={HomePageStyles.menu}>
                <Link className={cn(HomePageStyles.menuButton, HomePageStyles.createPostButton)} to={`/createPost`}> Crear post</Link>
                <Link className={HomePageStyles.menuButton} to={"/createList"}>Crear Lista</Link>
                <Link className={HomePageStyles.menuButton} to={`/editLists/${user.id}`}> Editar Lista</Link>
                {/* <Link className={cn(HomePageStyles.menuButton, HomePageStyles.showButton)} to={`/lists/${user.id}`}>Ver Listas</Link>*/}
            </div>
        </div>
    )
}