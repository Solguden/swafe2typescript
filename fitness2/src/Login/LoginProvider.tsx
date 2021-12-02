import React, { Children, FC, useContext, useState } from "react";
import { User } from "../util/LoginService";

interface ILoginContext {
    loggedIn:boolean,
    accountType?:string,
    userId?:number,
    user?:User,
    firstName?:string,
    lastName?:string,
    // login?:()=> {},
    // logout?:()=> {},
}

const defaultState: ILoginContext = {
    loggedIn:false,
}

export const LoginContext = React.createContext<[ILoginContext, (loggedIn: ILoginContext) => void]>([defaultState, () => {}]);
export const useLoginContext = () => useContext(LoginContext);

export const LoginProvider: FC = ({ children }) => {
    const [loggedIn, setLogin] = useState(defaultState);
    const defaultSessionContext: [ILoginContext, typeof setLogin] = [loggedIn, setLogin];

    return (
        <LoginContext.Provider value={defaultSessionContext}>
                {children}
        </LoginContext.Provider>
    )
}
 

