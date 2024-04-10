import { useContext } from "react"
import ToDoItem from "../Components/ToDoItem"
import styles from "./ToDoList.module.css"
import { AppContext } from "../App"
import { useParams } from "react-router-dom"

export default function ToDoList({ list, checkUncheckItem, canFilter}) {
    //list prop => editing list
    
    const { lists, filter, setFilter } = useContext(AppContext)
    const { id, listId } = useParams();

    function renderList() {
        switch(filter){
            case "check":
            return (
                <ul className={styles.listContent}>
                    {listToUse.content.filter((item) => item.checked === true).map((item) => ToDoItem(item, checkUncheckItem))}
                </ul>
            )
            case "uncheck":
            return (
                <ul className={styles.listContent}>
                    {listToUse.content.filter((item) => item.checked === false).map((item) => ToDoItem(item, checkUncheckItem))}
                </ul>
            )
            default:
                return (
                    <ul className={styles.listContent}>
                        {listToUse.content.map((item) => ToDoItem(item, checkUncheckItem))}
                    </ul>
                )
        }
    }

    const listToUse = list ? list : lists[id][listId]
    return (
        <div className={styles.toDoList}>
            <div className={styles.listPanel}>
                <h4 className={styles.toDoTitle}>{listToUse.name}</h4>
                {renderList()}
            </div>

            {canFilter && (
                <div className={styles.buttonPanel}>
                    <button className={styles.filterButton} onClick={() => { setFilter("check") }}>Check</button>
                    <button className={styles.filterButton} onClick={() => { setFilter("uncheck") }}>No Check</button>
                    <button className={styles.filterButton} onClick={() => { setFilter("") }}>Quitar Filtro</button>
                </div>
            )}
        </div>
    )
}