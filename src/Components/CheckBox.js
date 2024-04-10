import { useDispatch } from "react-redux"
import styles from "./CheckBox.module.css"
import { checkItem, uncheckItem } from "../redux/listSlice"

export default function CheckBox({item, checkFunction}){
    const dispatch = useDispatch()
    return (
        <div onClick={() => {item.checked ? dispatch(uncheckItem(item.id)): dispatch(checkItem(item.id))}} className={styles.CheckBox}>
            {item.checked && (<span>X</span>)}
        </div>
    )
}