import {Link} from 'react-router-dom'

const Nav = () => {
    return (
        <ul className='Navbar'>
            <li id='home-link'><Link to='/'>Home</Link></li>
           <li id='users-link'><Link to='/users'>Users</Link></li> 
        </ul>
    )
}

export default Nav