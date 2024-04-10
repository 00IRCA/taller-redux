import ProfileContent from "../Components/ProfileContent"
import ProfileBanner from "../Components/ProfileBanner"
import styles from "../styles.module.css"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import LoadingPage from "../Components/LoadingPage"

export default function ProfilePage() {
    const {id} = useParams();

    const [profileData, setProfileData] = useState({})
    const [loaded, setLoaded] = useState(false)

    useEffect(
        () => {
            setLoaded(false)
            setTimeout(() => fetch(`http://localhost:3001/users/${id}`)
                .then(response => {
                    return response.json()})
                .then(data => {
                    setProfileData(data);
                    setLoaded(true)
                }
                ), 400)
        }, [id])
    
    return loaded
    ? (
        <div className={styles.page}>
            <h2>Perfil de {profileData.name}</h2>
            <ProfileBanner user={profileData} key={id}/>
            <ProfileContent />
        </div>
    )
    :
    <LoadingPage loading={!loaded} />
}