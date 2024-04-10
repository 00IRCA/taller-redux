import { createContext, useContext, useState } from "react"
import styles from "../styles.module.css"
import CreateListStyles from "./CreateListPage.module.css"
import { AppContext } from "../App"
import { v4 as uuidv4 } from 'uuid'
import ToDoList from "../Components/ToDoList"
import cn from "classnames"
import UpdateItemForm from "../Components/UpdateItemForm"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { 
    selectItem, 
    selectLists, 
    selectModified, 
    selectUpdateForm, 
    setEditingListName, 
    selectEditingList,
    addEditingItem,
    initialEdit,
    selectUserList,
    setEditingList,
    setItem,
    addItem
 } from "../redux/listSlice"
import { addList } from "../redux/listSlice"


export const EditContext = createContext(null)

export default function CreateListPage() {
    const { listId } = useParams()
    const { user } = useContext(AppContext)

    const list = useSelector(selectUserList({userId: user.id, listId: listId}))
    const dispatch = useDispatch()

    const modified = useSelector(selectModified)
    const item = useSelector(selectItem)
    const updateForm = useSelector(selectUpdateForm)
    const editingList = useSelector(selectEditingList)

    const isModified = listId ? true : false
    const navigate = useNavigate();
    useEffect(() => {
        if(list){
            console.log("a")
            dispatch(setEditingList(list))
        }
    }, [])

    function handleItemChange(event) {
        dispatch(setItem(event.target.value))
    }
    
    return (
        <div className={styles.page}>
            <h2 className={CreateListStyles.title}>Crear Lista</h2>
            <div className={CreateListStyles.createListPage}>
                <div className={CreateListStyles.preview}>
                    {modified && (
                        <EditContext.Provider value={{ deletable: true, editable: true }}>
                            <ToDoList canFilter list={editingList} />
                        </EditContext.Provider>
                    )}
                </div>
                <div className={CreateListStyles.listForm}>
                    <div className={CreateListStyles.formSection}>
                        <label className={CreateListStyles.label}>Nombre</label>
                        <input type="text" placeholder="Nombre" onChange={(e) => {dispatch(setEditingListName(e.target.value))}} />
                    </div>
                    <div className={CreateListStyles.formSection}>
                        <label className={CreateListStyles.label}>Elemento</label>
                        <input type="text" placeholder="elemento" onChange={handleItemChange} value={item} />
                        <button className={cn(CreateListStyles.button, CreateListStyles.addButton)} onClick={() => {dispatch(addItem())}}>Añadir</button>
                    </div>

                    {updateForm && <UpdateItemForm />}

                    <div>
                        <button className={cn(CreateListStyles.button, CreateListStyles.saveButton)} onClick={() => { dispatch(addList({userId: user.id, list: editingList})); dispatch(initialEdit()); navigate("/") }}>Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}