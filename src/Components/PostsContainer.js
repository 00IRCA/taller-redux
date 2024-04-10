import { useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../App"
import styles from "./PostsContainer.module.css"
import Post from "./Post"
import { useDispatch, useSelector } from "react-redux"
import { addOnlinePosts, selectPosts } from "../redux/postSlice"

export default function PostsContainer() {
    const { id } = useParams()
    const { user } = useContext(AppContext)
    const [loaded, setLoaded] = useState(false)

    const posts = useSelector(selectPosts)
    const dispatch = useDispatch()

    useEffect(() => {
        if (id != user.id) {
            dispatch(addOnlinePosts(id))
            .then(setLoaded(true))
        } else {
            if (posts[user.id]) {
                setLoaded(true)
            }
        }
    }, [])

    return (
        <div className="postsContainer">
            {(loaded && posts[id]?.length) ? (
                <>
                    <h3>Posts</h3>
                    <div className={styles.postsShowcase}>
                        {posts[id].map(post => <Post postData={post} />)}
                    </div>
                </>
            ) : "vacio"}
        </div>
    )
}