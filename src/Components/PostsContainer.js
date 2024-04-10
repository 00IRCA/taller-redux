import { useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../App"
import styles from "./PostsContainer.module.css"
import Post from "./Post"
import EmptyLogo from "../assets/no-content.svg"

export default function PostsContainer() {
    const { id } = useParams()
    const { posts, setPosts, user } = useContext(AppContext)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (id != user.id) {
            fetch(`http://localhost:3001/posts/${id}`)
                .then(response => response.json())
                .then(data => {
                    setPosts({ ...posts, [data.id]: data.posts }); setLoaded(true)
                })
        } else {
            if (posts[user.id]) {
                setLoaded(true)
            }
        }
    }, [])

    return (
        <div className="postsContainer">
            {(loaded && posts[id].length) ? (
                <>
                    <h3>Posts</h3>
                    <div className={styles.postsShowcase}>
                        {posts[id].map(post => <Post postData={post} />)}
                    </div>
                </>
            ) : <img src={EmptyLogo} width={"100px"}></img>}
        </div>
    )
}