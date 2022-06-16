import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"

const Header = () => {

    const {userObj} = useContext(UserContext)

    return (
        <div className="Header">
            <h1>NC - News</h1>
            <div className="Userbar">
            <p id="Userbar-name">{userObj.username}</p>
            <img id="Userbar-img" src={userObj.img} alt={userObj.username}/>
            </div>
        </div>
    )
}

export default Header