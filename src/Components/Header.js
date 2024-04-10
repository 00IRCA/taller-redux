import { Link, NavLink } from 'react-router-dom';
import logo from '../logo.svg';
import styles from "./Header.module.css"
import { useContext } from 'react';
import { AppContext } from '../App';

export default function Header() {

    const { user, isPostAdded, isListAdded } = useContext(AppContext)

    //function to add class when link is active
    function linkClass({ isActive }) {
        return isActive ? styles.active : ""
    }

    return (
        <header className={styles.header}>
            <div className={styles.title}>
                <h1>Redux App</h1>
                <img src={logo} className="App-logo" alt="logo" />
            </div>
            <nav className={styles.navbar}>
                <ul className={styles.ul}>
                    <li>
                        <NavLink
                            to={"/"}
                            className={linkClass}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={`/profile/${user.id}`}
                            className={linkClass}>Perfil</NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={"/friends"}
                            className={linkClass}>Amigos</NavLink>
                    </li>
                    {(isPostAdded && isListAdded) && (
                        <li>
                            <NavLink
                                to={"/secret"}
                                className={linkClass}>Secreto</NavLink>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    )
}