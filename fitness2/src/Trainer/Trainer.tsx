import React, { useState, useEffect } from "react";
import { getData } from "../util/api";
import { handleResponse } from '../Login/handle-response';
import { authHeader } from '../Login/auth-header'
// import Spinner from "./ui/Spinner";
// import axios from 'axios';
interface UserState{
    userId?:string;
    firstName?:string;
}
interface Workouts{
    id?:string;
    title?:string;
}
export function Trainer() {

  // const [users, setUsers] = useState({ hits: [] });
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       const result = await axios(
  //         "http://localhost:3001/users",
  //     );
  //     setUsers(result.data);
  //     console.log(users)
  //   };
  //   fetchData();
  //   console.log(users.hits)
  // }, []);

  const initialState:UserState[] = [{ userId: '', firstName: '' }];
  const [users, setUsers] = useState(initialState);

  //   useEffect(() => {
  //     fetch("http://localhost:3001/users")
  //     .then(resp => resp.json())
  //     .then(data => setUsers(data));
  // }, []);

    useEffect(() => {
      async function getUsers() {
        const requestOptions:any = { method: 'GET', headers: authHeader() };
        const userresp = await fetch(`https://afe2021fitness.azurewebsites.net/api/Users/Clients`, requestOptions).then(handleResponse);
        const userdata = await (userresp);
        setUsers(userdata);
        console.log(users)
      }
      getUsers();
    }, []);

    const initialWorkouts:Workouts[] = [{ id: '', title: '' }];
    const [workouts, setWorkouts] = useState(initialWorkouts);
    useEffect(() => {
      async function getWorkouts() {
        const requestOptions:any = { method: 'GET', headers: authHeader() };
        const workoutresp = await fetch("https://afe2021fitness.azurewebsites.net/api/WorkoutPrograms/trainer", requestOptions).then(handleResponse);
        const workoutdata = await (workoutresp);
        setWorkouts(workoutdata);
      }
      getWorkouts();
    }, []);


  if (users === null || users === undefined|| workouts === null || workouts === undefined) {
    return <p>Trainer (Found nothing/Loading)</p>
    //<Spinner />
  }
  return (
    // <p>users</p>
    <main>
      <p>Clients</p>
      <ul>
        {users.map(({userId,firstName}) => 
          <li key={userId}>{firstName}</li>
        )}
      </ul>
      <button type="button">Add new Client</button>
      <p>Workouts</p>
      <ul>
        {workouts.map(({id,title})=> (
          <li key={id}>{title}</li>
        ))}
      </ul>
    </main>
  );
}