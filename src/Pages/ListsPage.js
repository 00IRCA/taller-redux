import styles from "../styles.module.css"
import ListsContainer from "../Components/ListsContainer";

export default function ListsPage(){
    return(
        <div className={styles.page}>
            <div>
                <ListsContainer edit={true}/>  
            </div>
        </div>
    )
}