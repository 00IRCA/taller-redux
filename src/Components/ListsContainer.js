import { Link, useParams } from "react-router-dom"
import styles from "./ListContainer.module.css"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../App"
import ToDoList from "./ToDoList"
import { EditContext } from "../Pages/CreateListPage"
import EmptyLogo from "../assets/no-content.svg"

export default function ListsContainer({ edit }) {
    const { id, listId } = useParams()
    const { lists, setLists, user } = useContext(AppContext)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (id != user.id) {
            fetch(`http://localhost:3001/lists/${id}`)
                .then(response => response.json())
                .then(data => {
                    const responseLists = data.lists.reduce((acc, list) => {
                        return ({
                            ...acc,
                            [list.id]: list
                        })
                    }, {})
                    setLists({ ...lists, [data.id]: responseLists }); setLoaded(true)
                })
        } else {
            if (lists[user.id]) {
                setLoaded(true)
            }
        }
    }, [])

    return (loaded && Object.keys(lists[id]).length) ? (
        <div className={styles.listContainer}>
            <div className={styles.toDoLists}>
                <h3 className={styles.listTitle}>Listas</h3>
                <ul className={styles.list}>
                    {Object.keys(lists[id]).map((listId) => {
                        return (
                            <li className={styles.listItem}>
                                {edit
                                    ? <Link to={`/createList/${listId}`}><span>{lists[id][listId].name}</span></Link>
                                    : <Link to={`/profile/${id}/lists/${listId}`}><span>{lists[id][listId].name}</span></Link>
                                }
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className={styles.toDoList}>
                {listId && (
                    <EditContext.Provider value={{}}>
                        <ToDoList canFilter checkUncheckItem={() => {}} />
                    </EditContext.Provider>
                )}
            </div>
        </div>
    ) : <img src={EmptyLogo} width={"100px"}></img>
}
