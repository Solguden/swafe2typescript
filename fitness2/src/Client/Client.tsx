import React, { useState, useEffect } from "react";
import { handleResponse } from '../Login/handle-response';
import { authHeader } from '../Login/auth-header'
import { table } from "console";
import './Client.css';
import CSS from 'csstype';

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
  const [selectedWorkout, setSelectedWorkout] = useState(initialWorkouts[0])
  useEffect(() => {
    async function getWorkouts() {
      const requestOptions:any = { method: 'GET', headers: authHeader() };
      const workoutresp = await fetch("https://afe2021fitness.azurewebsites.net/api/WorkoutPrograms", requestOptions).then(handleResponse);
      const workoutdata = await (workoutresp);
      setWorkouts(workoutdata);
      setSelectedWorkout(workoutdata[0]);
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
    setSelectedWorkout(workout);
  }

  if (workouts === null || workouts === undefined) {
    return <p>Workout not found</p>
  }

  const wrapper:CSS.Properties = {
    backgroundColor:'lightgrey',
    paddingBottom:'10px',
    marginBottom:'20px'
};

  return (
    <main>
      <div style={wrapper}>
        <p>Workouts</p>
        <ul>
          {workouts.map(workout => {
            return(
              <li onClick={() => setSelectedWorkout(workout)}>{workout.name}</li>
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