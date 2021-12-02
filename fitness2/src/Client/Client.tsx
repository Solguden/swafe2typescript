import React, { useState, useEffect } from "react";
import { handleResponse } from '../Login/handle-response';
import { authHeader } from '../Login/auth-header'
import { table } from "console";

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

  if (workouts === null || workouts === undefined) {
    return <p>Workout not found</p>
  }

  return (
    <main>
      <table>
        <tr>
          <th>Exercise</th>
          <th>Description</th>
          <th>Set</th>
          <th>Reps/time</th>
        </tr>
        <tr>
          {workouts[0].exercises.map(exercise => (
            <div>
              <td>{exercise.name}</td>
              <td>{exercise.description}</td>
              <td>{exercise.sets}</td>
              <td>{exercise.repetitions}</td>
            </div>
          ))}
        </tr>
        </table>
    </main>
  );
}