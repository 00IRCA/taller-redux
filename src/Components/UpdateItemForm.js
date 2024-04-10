import { useState } from "react"
import styles from "./UpdateItemForm.module.css"
import { useDispatch, useSelector } from "react-redux"
import { selectEditingItem, setEditingItem, updateItem } from "../redux/listSlice"

export default function UpdateItemForm() {
    const item = useSelector(selectEditingItem)
    const dispatch = useDispatch()

    function onChangeInput (event) {
        dispatch(setEditingItem({...item, text: event.target.value}))
    }

    return (
        <div className={styles.formSection}>
            <label className={styles.label}>Actualizar elemento</label>
            <input onChange={onChangeInput} type="text" value={item.text}/>
            <button onClick={() => {dispatch(updateItem())}}>Actualizar</button>
        </div>
    )
}