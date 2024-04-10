import styles from "./CheckBox.module.css"

export default function CheckBox({item, checkFunction}){
    return (
        <div onClick={() => {checkFunction(item.id)}} className={styles.CheckBox}>
            {item.checked && (<span>X</span>)}
        </div>
    )
}