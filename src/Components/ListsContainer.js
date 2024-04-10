import { Link, useParams } from "react-router-dom"
import styles from "./ListContainer.module.css"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../App"
import ToDoList from "./ToDoList"
import { EditContext } from "../Pages/CreateListPage"
import { useDispatch, useSelector } from "react-redux"
import { addOnlineList, selectUserLists } from "../redux/listSlice"

export default function ListsContainer({ edit }) {
    const { id, listId } = useParams()
    const { user } = useContext(AppContext)
    const [loaded, setLoaded] = useState(false)

    const lists = useSelector(selectUserLists(id))
    const dispatch = useDispatch()

    useEffect(() => {
        if (id != user.id) {
            dispatch(addOnlineList(id))
            .then(() => {setLoaded(true)})
        } else {
            if (lists) {
                setLoaded(true)
            }
        }
    }, [])

    return (loaded && Object.keys(lists).length) ? (
        <div className={styles.listContainer}>
            <div className={styles.toDoLists}>
                <h3 className={styles.listTitle}>Listas</h3>
                <ul className={styles.list}>
                    {Object.keys(lists).map((listId) => {
                        return (
                            <li className={styles.listItem}>
                                {edit
                                    ? <Link to={`/createList/${listId}`}><span>{lists[listId].name}</span></Link>
                                    : <Link to={`/profile/${id}/lists/${listId}`}><span>{lists[listId].name}</span></Link>
                                }
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className={styles.toDoList}>
                {listId && (
                    <EditContext.Provider value={{}}>
                        <ToDoList canFilter checkUncheckItem={() => { }} />
                    </EditContext.Provider>
                )}
            </div>
        </div>
    ) : "vacio"
}
