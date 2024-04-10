import styles from "./Post.module.css"

export default function Post({postData}) {
    return (
        <div className={styles.post}>
            <div className={styles.postTitle}>
                <span>{postData.title}</span>
            </div>
            <div className={styles.postImage}>
                <img src={postData.image} />
            </div>
            <div className={styles.postText}>
                <span>{postData.text}   </span>
            </div>
        </div>
    )
}