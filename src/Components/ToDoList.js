import { useContext } from "react"
import ToDoItem from "../Components/ToDoItem"
import styles from "./ToDoList.module.css"
import { AppContext } from "../App"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { selectFilter, selectLists, setFilter } from "../redux/listSlice"

export default function ToDoList({ list, checkUncheckItem, canFilter}) {
    //list prop => editing list
    
    const lists = useSelector(selectLists)
    const { id, listId } = useParams();
    const filter = useSelector(selectFilter);
    const dispatch = useDispatch()

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
                    <button className={styles.filterButton} onClick={() => { dispatch(setFilter("check")) }}>Check</button>
                    <button className={styles.filterButton} onClick={() => { dispatch(setFilter("uncheck")) }}>No Check</button>
                    <button className={styles.filterButton} onClick={() => { dispatch(setFilter("")) }}>Quitar Filtro</button>
                </div>
            )}
        </div>
    )
}