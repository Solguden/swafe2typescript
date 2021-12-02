import { render } from "@testing-library/react";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { authenticationService } from '../util/LoginService'
import {useLoginContext}from '../Login/LoginProvider'
import CSS from 'csstype';

interface NavState{
    loggedIn:Boolean
}
export function Navbar() {
    // const initialState:NavState = { loggedIn:authenticationService.authorized()};
    // const [state, setState] = useState(initialState);
    const [loggedIn,setLogin] = useLoginContext();
    const navigate = useNavigate();

    const login = () => {
        navigate('/login')
    }
    const logout = () => {
        console.log("logout")
        setLogin({...loggedIn, loggedIn:false})
        authenticationService.logout()
        navigate('/login')
    }
    const navStyle:CSS.Properties = {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "space-evenly",
        // paddingLeft: '15%',
        // paddingRight: '15%',
    };
    return (
        
        <nav style={navStyle}>   
            {
                <a>
                    <NavLink to="/" >
                        Home
                    </NavLink>
                </a>
            }
            {   loggedIn.loggedIn && loggedIn.accountType == 'Client' &&
                <a>
                    <NavLink to="/client" >
                        Client
                    </NavLink>
                </a>
            } 
            {   loggedIn.loggedIn && loggedIn.accountType == 'PersonalTrainer' &&
                <a>
                    <NavLink to="/trainer" >
                        Trainer
                    </NavLink>
                </a>
            }         
            {   
                loggedIn.loggedIn && loggedIn.accountType == 'Manager' &&
                <a>
                    <NavLink to="/manager" >
                        Manager
                    </NavLink>
                </a>
            } 
            
            {
                !loggedIn.loggedIn && 
                <button onClick={login}>Login</button>
            }
        
            {
                loggedIn.loggedIn && 
                <button onClick={logout}>Logout</button>
            }
        </nav>
    );
}
