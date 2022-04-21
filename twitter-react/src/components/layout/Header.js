import './Header.css'
import { Link, NavLink } from 'react-router-dom'

function Header({ isLogged, onLogout }) {
    return (
        <header className="header">
            <NavLink to="/">
                <div>
                    <img src="https://i0.wp.com/hipertextual.com/wp-content/uploads/2012/06/twitter-bird-white-on-blue.jpg?fit=300%2C300&ssl=1" alt="Logo" />
                </div>
            </NavLink>
            <NavLink to="/tweets/new"
                className={({ isActive }) =>
                    isActive ? 'active' : ''
                }
            >
                <div>
                    <img src="https://i2.wp.com/blog.credo.com/wp-content/uploads/2018/04/1060_icons_compose-tweet.png?ssl=1" alt="New" />
                </div>
            </NavLink>
            <nav>{
                isLogged
                    ? <button onClick={onLogout} className="buttonLogout">Logout</button>
                    : <button className="buttonLogin">Login</button>
            }
            </nav>
        </header>
    );
}


export default Header;