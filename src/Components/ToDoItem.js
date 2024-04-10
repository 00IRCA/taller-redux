import { useContext } from "react";
import CheckBox from "./CheckBox";
import styles from "./ToDoItem.module.css"
import { EditContext } from "../Pages/CreateListPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { deleteItem, setEditingItem } from "../redux/listSlice";

export default function ToDoItem(item, checkFunction) {
    const {deletable, editable, deleteCallback} = useContext(EditContext)

    const dispatch = useDispatch()

    return (
        <li className={styles.toDoItem}>
            {deletable && (<FontAwesomeIcon className={styles.delete} icon={faTrash} onClick={() => {dispatch(deleteItem(item.id))}}/>)}
            {editable && (<FontAwesomeIcon className={styles.edit} icon={faPenToSquare} onClick={() => {dispatch(setEditingItem(item))}}/>)}
            <CheckBox checkFunction={checkFunction} item={item}/>
            <span className={styles.text}>{item.text}</span>
        </li>
    )
}