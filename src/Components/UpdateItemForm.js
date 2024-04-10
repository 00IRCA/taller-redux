import { useState } from "react"
import styles from "./UpdateItemForm.module.css"

export default function UpdateItemForm({item, updateCallback}) {
    const [updatedValue, setUpdatedValue] = useState(item)

    function onChangeInput (event) {
        setUpdatedValue({...item, text: event.target.value})
    }

    return (
        <div className={styles.formSection}>
            <label className={styles.label}>Actualizar elemento</label>
            <input onChange={onChangeInput} type="text" value={updatedValue.text}/>
            <button onClick={() => {updateCallback(updatedValue)}}>Actualizar</button>
        </div>
    )
}