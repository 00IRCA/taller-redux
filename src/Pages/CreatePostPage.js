import { AppContext } from "../App"
import Post from "../Components/Post"
import styles from "../styles.module.css"
import CreatePostPageStyles from "./CreatePostPage.module.css"
import { useContext, useState } from "react"

export default function CreatePostPage() {
    const {addPost} = useContext(AppContext)

    const [title, setTitle] = useState("")
    const [image, setImage] = useState("/assets/loro.jpg")
    const [text, setText] = useState("")

    function handleTitleChange(event) {
        setTitle(event.target.value)
    }

    function handleTextChange(event) {
        setText(event.target.value)
    }

    function handleImageChange(event) {
        setImage(event.target.value)
    }

    return (
        <div className={styles.page}>
            <h2 className={CreatePostPageStyles.title}>Crear Post</h2>
            <div className={CreatePostPageStyles.createListPage}>
                <div className={CreatePostPageStyles.preview}>
                    <Post postData={{title, image, text}}/>
                </div>
                <div className={CreatePostPageStyles.PostForm}>
                    <div className={CreatePostPageStyles.formSection}>
                        <label className={CreatePostPageStyles.label}>Titulo:</label>
                        <input onChange={handleTitleChange} type="text" />
                    </div>
                    <div className={CreatePostPageStyles.formSection}>
                        <label className={CreatePostPageStyles.label}>Contenido</label>
                        <select onChange={handleImageChange}>
                            <option value="/assets/loro.jpg">Loro</option>
                            <option value="/assets/dog.jpeg">Perro</option>
                            <option value="/assets/cat.jpeg">Gato</option>
                        </select>
                    </div>
                    <div className={CreatePostPageStyles.formSection}>
                        <label className={CreatePostPageStyles.label}>Texto:</label>
                        <textarea className={CreatePostPageStyles.textArea} onChange={handleTextChange} />
                    </div>
                    <div>
                        <button className={CreatePostPageStyles.button} onClick={() => {addPost({title, image, text})}}>Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}