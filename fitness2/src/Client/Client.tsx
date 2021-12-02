import React, { useState, useEffect } from "react";
import { handleResponse } from '../Login/handle-response';
import { authHeader } from '../Login/auth-header'
import { table } from "console";
import './Client.css';

export interface Exercise{
  exerciseId?:string;
  name?:string;
  description?:string;
  sets?:number;
  repetitions?:number;
  time?:string;
}
export interface Workouts{
  workoutProgramId?:string;
  name?:string;
  exercises:Exercise[];
  clientId?:string
  description?:string
}

export function Client () {

  let allWorkouts: Workouts[];

  const initialWorkouts: Workouts[] = [{workoutProgramId: '', name: '',
  exercises: [{exerciseId: '', name: '', description: '', sets: 0, repetitions: 0, time: ''}]}];
  const [workouts, setWorkouts] = useState(initialWorkouts);
  useEffect(() => {
    async function getWorkouts() {
      const requestOptions:any = { method: 'GET', headers: authHeader() };
      const workoutresp = await fetch("https://afe2021fitness.azurewebsites.net/api/WorkoutPrograms", requestOptions).then(handleResponse);
      const workoutdata = await (workoutresp);
      setWorkouts(workoutdata);
    }
    getWorkouts();
  }, []);

  function setRepsOrTime(exercise: Exercise) {
    if (exercise.time !== "string") {
      return exercise.time;
    }
    else {
      return exercise.repetitions;
    }
  }

  function setWorkout(workout: Workouts) {
    const tempWorkouts: Workouts[] = [workout];
    setWorkouts(tempWorkouts);
  }

  if (workouts === null || workouts === undefined) {
    return <p>Workout not found</p>
  }

  if (workouts.length > 1) {
    return (
      <main>
        <p>Workouts</p>
        <ul>
          {workouts.map(workout => {
            return(
              <li onClick={() => setWorkout(workout)}>{workout.name}</li>
            );
          })}
        </ul>
      </main>
    )
  }

  return (
    <main>
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
          {workouts[0].exercises.map(exercise => {
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
    </main>
  );
}