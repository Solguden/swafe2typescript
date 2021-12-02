import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authHeader } from "./auth-header";
import { handleResponse } from "./handle-response";
import { useLoginContext } from "./LoginProvider";

export const authenticationService = {
    login,
    logout,
    authorized
}

export interface User {
    userId:number,
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    personalTrainerId:number,
    accountType:string

}

function getUserByEmail(email:string) {
    // let requestOptions: HeadersInit = new Headers();
    let requestOptions: any = { method: 'GET', headers: authHeader()};
    return fetch(`https://afe2021fitness.azurewebsites.net/api/Users`, requestOptions)
    .then(handleResponse)
    .then((users:User[]) => {
        let myUser = users.find(x => x.email === email)
        console.log(myUser)
        return myUser
    });
  }

function login( email:string, password:string){
    // const [loggedIn,setLogin] = useLoginContext();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      };
      return fetch(`https://afe2021fitness.azurewebsites.net/api/Users/login`, requestOptions)
        // .then(resp => resp.json())
        .then(handleResponse)
        .then((user:User) => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));

            let myUser = getUserByEmail(email)           

            return myUser;
        });
}

function logout(){
    // const [loggedIn,setLogin] = useLoginContext();
    localStorage.removeItem('currentUser');
    // setLogin({...loggedIn, loggedIn:false})
    return <Navigate to="/login" />
}

function authorized () {
    return !!localStorage.getItem('currentUser');
}