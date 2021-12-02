import { handleResponse } from "../Login/handle-response";
import { User } from "./LoginService";
import { authHeader } from "../Login/auth-header";
import { Exercise, Workouts } from "../Client/Client";


export const userService = {
    createUser,
    createWorkoutProgram,
    updateWorkoutProgram
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

function createWorkoutProgram(program:Workouts){
    const requestOptions:any = {
        method: 'POST',
        headers:  authHeader(), 
        body: JSON.stringify({ ...program })
    };
    console.log(requestOptions)
    return fetch(`https://afe2021fitness.azurewebsites.net/api/WorkoutPrograms`, requestOptions)
            .then(handleResponse)
            .then((wp:Workouts) => {
                return wp;
            });
}

function updateWorkoutProgram(ex:Exercise, programId:string){
    const requestOptions:any = {
        method: 'POST',
        headers:  authHeader(), 
        body: JSON.stringify({ ...ex })
    };
    console.log(requestOptions)
    return fetch(`https://afe2021fitness.azurewebsites.net/api/Exercises/Program/`+programId, requestOptions)
            .then(handleResponse)
            .then((e:Exercise) => {
                return e;
            });
}