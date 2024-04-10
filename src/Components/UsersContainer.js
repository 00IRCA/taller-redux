import { useEffect, useState } from "react"
import ProfileBanner from "./ProfileBanner"

export default function UsersContainer() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/users")
            .then(response => response.json())
            .then(response => setUsers([...response]))
    }, [])
    
    return (
        <div className="usersContainer">
            {users.map(
                user => <ProfileBanner user={user} clickable/>
            )}
        </div>
    )
}