import { NavLink } from "react-router-dom";

export function Navbar() {
    return (
        <nav>
            <a>
                <NavLink to="/home" >
                    Home
                </NavLink>
            </a>
            <a>
                <NavLink to="/client" >
                    Client
                </NavLink>
            </a>
            <a>
                <NavLink to="/trainer" >
                    Trainer
                </NavLink>
            </a>
            <a>
                <NavLink to="/manager" >
                    Manager
                </NavLink>
            </a>
            <a>
                <NavLink to="/login" >
                    Login
                </NavLink>
            </a>
            
            
            
            
        </nav>
    );
}
