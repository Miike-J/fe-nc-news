import React, { useEffect, useState, useContext } from "react"
import { getUsers } from "../api"
import userImage from '../userImage.png'
import PropgateLoader from 'react-spinners/PropagateLoader'
import { UserContext } from "../contexts/UserContext"


const UserList = () => {

    const [userList, setUserList] = useState([{}])
    const [isLoading, setIsLoading] = useState(true)

    const {setUserObj} = useContext(UserContext)
    
    useEffect(() => {
        getUsers().then(users => {
            users.forEach((user, i) => {
                user.user_id = i + 1
                user.img = userImage
            })
            setUserList(users)
            setIsLoading(false)
        })
    }, [userList])  
    
    const style = {position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }

    if(isLoading) return <div style={style}><PropgateLoader /></div>
    return (
        <ul className="user-list">
            {userList.map(user => {
               return (
                    <li className="user-item" key={`user-${user.user_id}`}>
                        <p id="user-name">{user.username}</p>
                        <img id="user-img" src={user.img} alt={user.username}/>
                        <button id="user-select" onClick={() => {
                            setUserObj(user)
                        }}>Select</button>
                    </li>
               ) 
            })}
        </ul>
    )
}

export default UserList