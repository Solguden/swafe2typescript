import { handleResponse } from "../Login/handle-response";
import { User } from "./LoginService";
import { authHeader } from "../Login/auth-header";


export const userService = {
    createUser,

}

function createUser(user:User){
    const requestOptions:any = {
        method: 'POST',
        headers:  authHeader(), 
        body: JSON.stringify({ ...user })
    };
    console.log(requestOptions)
    return fetch(`https://afe2021fitness.azurewebsites.net/api/Users`, requestOptions)
            .then(handleResponse)
            .then((user:User) => {
                return user;
            });
}

function getUsers(user:User){
    const requestOptions:any = {
        method: 'POST',
        headers:  authHeader(), 
        body: JSON.stringify({ ...user })
    };
    console.log(requestOptions)
    return fetch(`https://afe2021fitness.azurewebsites.net/api/Users`, requestOptions)
            .then(handleResponse)
            .then((user:User) => {
                return user;
            });
}