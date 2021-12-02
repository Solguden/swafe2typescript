import React, { useState, useEffect } from "react";
import { getData } from "../util/api";
import { handleResponse } from '../Login/handle-response';
import { authHeader } from '../Login/auth-header'
import { CreateClient } from "./CreateClient";
import { CreateWorkoutProgram } from "./CreateWorkoutProgram";
import CSS from 'csstype';
import { Workouts, Exercise } from "../Client/Client";
import { AddExercise } from "./AddExercise";
// import Spinner from "./ui/Spinner";
// import axios from 'axios';
interface UserState{
    userId?:string;
    firstName?:string;
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

    const initialWorkouts: Workouts[] = [{workoutProgramId: '', name: '',
  exercises: [{exerciseId: '', name: '', description: '', sets: 0, repetitions: 0, time: ''}]}];
  const [workouts, setWorkouts] = useState(initialWorkouts);
  const [selectedWorkout, setSelectedWorkout] = useState(initialWorkouts[0])
    useEffect(() => {
      async function getWorkouts() {
        const requestOptions:any = { method: 'GET', headers: authHeader() };
        const workoutresp = await fetch("https://afe2021fitness.azurewebsites.net/api/WorkoutPrograms/trainer", requestOptions).then(handleResponse);
        const workoutdata = await (workoutresp);
        setWorkouts(workoutdata);
        setSelectedWorkout(workoutdata[0]);
      }
      getWorkouts();
    }, []);


  if (users === null || users === undefined|| workouts === null || workouts === undefined) {
    return <p>Trainer (Found nothing/Loading)</p>
    //<Spinner />
  }

  function setRepsOrTime(exercise: Exercise) {
    if (exercise.time !== "string") {
      return exercise.time;
    }
    else {
      return exercise.repetitions;
    }
  }

  function setWorkout(workout: Workouts) {
    setSelectedWorkout(workout);
  }

  const wrapper:CSS.Properties = {
    backgroundColor:'lightgrey',
    paddingBottom:'10px',
    marginBottom:'20px'
};

  return (
    // <p>users</p>
    <main>
      <CreateClient></CreateClient>
      <CreateWorkoutProgram></CreateWorkoutProgram>
      <AddExercise></AddExercise>
      <div style={wrapper}>
        <p>Clients</p>
        <ul>
          {users.map(({userId,firstName}) => 
            <li key={userId}>{firstName}</li>
          )}
        </ul>
      </div>
      <div style={wrapper}>
        <p>Workouts</p>
        <ul>
          {workouts.map(workout => {
            return(
              <li onClick={() => setWorkout(workout)}>{workout.name}</li>
            );
          })}
        </ul>
      </div>
      <div style={wrapper}>
        <p>{selectedWorkout.name}</p>
        <table className="table">
          <thead>
            <tr>
              <th>Exercise</th>
              <th>Description</th>
              <th>Set</th>
              <th>Reps/time</th>
            </tr>
          </thead>
          <tbody>
            {selectedWorkout.exercises.map(exercise => {
              return (
                <tr>
                  <td>{exercise.name}</td>
                  <td>{exercise.description}</td>
                  <td>{exercise.sets}</td>
                  <td>{setRepsOrTime(exercise)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}