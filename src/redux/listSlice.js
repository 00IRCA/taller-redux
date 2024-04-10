import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid'

export const addOnlineList = createAsyncThunk(
    'list/addOnlineList',
    async (id, {rejectWithValue}) => {
        try{
            const data = await fetch(`http://localhost:3001/lists/${id}`)
            .then(response => response.json())
            .then(data => {
                const responseLists = data.lists.reduce((acc, list) => {
                    return ({
                        ...acc,
                        [list.id]: list
                    })
                }, {})
                return responseLists
            })
        return {userId: id, lists: data}
        }catch(error){
            return rejectWithValue({error: error.message, userId: id})
        }
    },
  )

function initialState() {
    return {
        filter: null,
        lists: {},
        editingList: {name: "", id: uuidv4(), content: []},
        updateForm: false,
        item: "",
        editingItem: "",
        modified: true
    }
}

const listSlice = createSlice({
    name: "list",
    initialState: initialState(),
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload
        },
        addList: (state, action) => {
            const {userId, list} = action.payload
            state.lists[userId] = {
                ...state.lists[userId],
                [list.id]: list
            }
        },
        setEditingListName: (state, action) => {
            state.editingList.name = action.payload
        },
        setItem: (state, action) => {
            state.item =  action.payload
        },
        addItem: (state) => {
            state.editingList.content = [
                ...state.editingList.content,
                {
                    id: uuidv4(),
                    text: state.item,
                    checked: false
                }
            ]
        },
        checkItem: (state, action) => {
            state.editingList.content = state.editingList.content.map(
                (item) => {
                    return item.id === action.payload
                        ? {...item, checked: true}
                        : item
                }
            )
        },
        uncheckItem: (state, action) => {
            state.editingList.content = state.editingList.content.map(
                (item) => {
                    return item.id === action.payload
                        ? {...item, checked: false}
                        : item
                }
            )
        },
        initialEdit: (state) => {
            state.editingList = {name: "", id: uuidv4(), content: []}
            state.updateForm = false,
            state.item = ""
            state.editingItem = ""
        },
        setEditingList: (state, action) => {
            state.editingList = action.payload
        },
        setEditingItem: (state, action) => {
            state.editingItem = action.payload
            state.updateForm = true
        },
        updateItem: (state) => {
            state.editingList.content = state.editingList.content.map(
                (item => {
                    if(item.id === state.editingItem.id){
                        return state.editingItem
                    }else{
                        return item
                    }
                })
            )
        },
        deleteItem: (state, action) => {
            state.editingList.content = state.editingList.content.filter(
                (item) => item.id !== action.payload
            )
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addOnlineList.fulfilled, (state, action) => {
            const {userId, lists} = action.payload
            state.lists[userId] = lists
        }),
        builder.addCase(addOnlineList.rejected, (state, action) => {
            console.log(action)
            const {error, userId} = action.payload  
            state.lists[userId] = [{name:error, content: []}]
        })
    }
})

export const selectFilter = (state) => state.list.filter

export const selectLists = (state) => state.list.lists

export const selectUserLists = id => state => state.list.lists[id]

export const selectUserList = ({userId, listId}) => state => state.list.lists[userId]?.[listId]

export const selectModified = (state) => state.list.modified

export const selectItem = (state) => state.list.item

export const selectEditingItem = (state) => state.list.editingItem

export const selectUpdateForm = (state) => state.list.updateForm

export const selectEditingList = (state) => state.list.editingList



export const {
    setFilter, 
    addList, 
    setEditingListName, 
    setItem, 
    addItem, 
    checkItem, 
    uncheckItem,
    initialEdit,
    setEditingList,
    setEditingItem,
    updateItem,
    deleteItem
} = listSlice.actions

export default listSlice.reducer