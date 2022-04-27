import './Header.css'
import {NavLink } from 'react-router-dom'

function Header({ isLogged, onLogout }) {
    return (
        <header className="header">
            <NavLink to="/">
                <div>
                    <button>LIST</button>
                </div>
            </NavLink>
            <NavLink to="/adverts/newAdvert"
                className={({ isActive }) =>
                    isActive ? 'active' : ''
                }
            >
                <div>
                    <button>NEW ADVERT</button>
                </div>
            </NavLink>
            <nav>{
                isLogged
                    ? <button onClick={onLogout} className="buttonLogout">LOGOUT</button>
                    : <NavLink to="/login">
                        <div>
                            <button className="buttonLogin">LOGIN</button>
                        </div>
                    </NavLink>
            }
            </nav>
        </header>
    );
}


export default Header;