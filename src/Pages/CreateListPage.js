import { createContext, useContext, useState } from "react"
import styles from "../styles.module.css"
import CreateListStyles from "./CreateListPage.module.css"
import { AppContext } from "../App"
import { v4 as uuidv4 } from 'uuid'
import ToDoList from "../Components/ToDoList"
import cn from "classnames"
import UpdateItemForm from "../Components/UpdateItemForm"
import { useNavigate, useParams } from "react-router-dom"


export const EditContext = createContext(null)

export default function CreateListPage() {
    const { listId } = useParams()
    const { user, addList, lists, setCounter } = useContext(AppContext)

    const isModified = listId ? true : false 

    const listToUse = listId ? lists[user.id][listId] : { id: uuidv4(), name: "", content: [] }
    const [editingList, setEditingList] = useState(listToUse)
    const [updateForm, setUpdateForm] = useState(false)
    const [item, setItem] = useState("")
    const [editingItem, setEditingItem] = useState("")
    const [modified, setModified] = useState(isModified);
    const navigate = useNavigate();

    function handleNameChange(event) {
        setEditingList({ ...editingList, name: event.target.value })
        setModified(true)
    }

    function handleItemChange(event) {
        setItem(event.target.value)
    }

    function addItem() {
        if (item) {
            const addedContent = [
                ...editingList.content,
                {
                    id: uuidv4(),
                    text: item,
                    checked: false
                }
            ]
            setEditingList({
                ...editingList,
                content: addedContent
            })
            setModified(true)
        }
    }

    function initialEdit() {
        setItem("")
        setEditingList({ id: uuidv4(), name: "", content: [] })
    }

    function checkUncheckItem(itemId) {

        function checkItem(item) {
            return { ...item, checked: true }
        }

        function uncheckItem(item) {
            return { ...item, checked: false }
        }

        const newContent = editingList.content.map((item) => {
            if (itemId === item.id) {
                return item.checked
                    ? uncheckItem(item)
                    : checkItem(item)
            } else {
                return item
            }
        })
        setEditingList({ ...editingList, content: newContent })
    }

    function setEditingItemCallback(item) {
        setUpdateForm(true)
        setEditingItem(item)
    }

    function updateCallback(updatedItem) {
        const updatedList = {
            ...editingList,
            content: editingList.content.map(
                item => {
                    if (item.id === updatedItem.id) {
                        return updatedItem
                    }
                    return item
                }
            )
        }

        setEditingList(updatedList)
        setUpdateForm(false)
    }

    function deleteCallback(itemId) {
        const updatedList = {
            ...editingList,
            content: editingList.content.filter(
                item => item.id !== itemId
            )
        }

        setEditingList(updatedList)
    }
    console.log("hola")
    return (
        <div className={styles.page}>
            <h2 className={CreateListStyles.title}>Crear Lista</h2>
            <div className={CreateListStyles.createListPage}>
                <div className={CreateListStyles.preview}>
                    {modified && (
                        <EditContext.Provider value={{ deletable: true, editable: true, setEditingItemCallback, deleteCallback }}>
                            <ToDoList canFilter list={editingList} checkUncheckItem={checkUncheckItem} />
                        </EditContext.Provider>
                    )}
                </div>
                <div className={CreateListStyles.listForm}>
                    <div className={CreateListStyles.formSection}>
                        <label className={CreateListStyles.label}>Nombre</label>
                        <input type="text" placeholder="Nombre" onChange={handleNameChange} />
                    </div>
                    <div className={CreateListStyles.formSection}>
                        <label className={CreateListStyles.label}>Elemento</label>
                        <input type="text" placeholder="elemento" onChange={handleItemChange} value={item} />
                        <button className={cn(CreateListStyles.button, CreateListStyles.addButton)} onClick={addItem}>Añadir</button>
                    </div>

                    {updateForm && <UpdateItemForm item={editingItem} updateCallback={updateCallback} />}

                    <div>
                        <button className={cn(CreateListStyles.button, CreateListStyles.saveButton)} onClick={() => { addList(editingList); initialEdit(); navigate("/") }}>Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}