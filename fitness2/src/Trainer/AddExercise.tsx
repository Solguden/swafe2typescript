import { User } from "../util/LoginService";
import { useEffect, useState } from "react";
import { userService } from "../util/UserService";
import CSS from 'csstype';
import { Exercise, Workouts } from "../Client/Client";
import { authHeader } from "../Login/auth-header";
import { handleResponse } from "../Login/handle-response";
import { useLoginContext } from "../Login/LoginProvider";

export function AddExercise () {
    const [loggedIn,setLogin] = useLoginContext();
    const initialWorkouts: Workouts[] =  [{
        name: '', 
        description: '',
        clientId:'',
        exercises: [
        ]
    }];
    const [workouts, setWorkouts] = useState(initialWorkouts);

    const initialWorkout:Workouts = {
        name: '', 
        description: '',
        clientId:'',
        exercises: [
        ]
    };
    const [workout, setWorkout] = useState(initialWorkout);

    const initialExercise:Exercise = {
        name: '', 
        description: '',
        sets: 0,
        repetitions: 0,
        time:''
    };
    const [exercise, setExercise] = useState(initialExercise);

    function handleInputChange(event:any) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setExercise(state => {
            return {
                ...state,
                [name]: value
            };
        });
    }


    useEffect(() => {
        async function getPrograms() {
          const requestOptions:any = { method: 'GET', headers: authHeader() };
          const workresp = await fetch(`https://afe2021fitness.azurewebsites.net/api/WorkoutPrograms`, requestOptions).then(handleResponse);
          const workdata = await (workresp);
          setWorkouts(workdata);
        }
        getPrograms();
      }, []);


    function handleSubmit(event:any) {
    event.preventDefault();
    userService.updateWorkoutProgram(exercise,workout.workoutProgramId || '').then( res => {
        alert('Following exercise has been created ' + JSON.stringify(res));
        setExercise(initialExercise)
    })
    .catch(error => {
        alert('Something went wrong ' + JSON.stringify(error));
    }) 
    }
    const wrapper:CSS.Properties = {
        backgroundColor:'lightgrey',
        paddingBottom:'10px',
        marginBottom:'20px'
    };
    const select:CSS.Properties = {
        width:'170px',
        height:'21px'
    };

    var Data = ['this', 'example', 'isnt', 'funny'];

    function initWorkout(event:any){
        let id = event.target.value
        console.log(id)
        let workout1:any = workouts.find(x => x.workoutProgramId == id)
        console.log(workouts)
        console.log(workout1)
        setWorkout({...workout1})
    }

    function MakeItem(X:Workouts) {
        
    return <option value={X.workoutProgramId}>{X.name}</option>;
    };

    return (
        <main style={wrapper}>
            <p>Add exercise to workoutprogram:</p>
            Select workoutprogram
            <select style={select}  onChange={initWorkout}>
                <option disabled selected></option>
                {workouts.map(MakeItem)}
            </select>
            <form onSubmit={handleSubmit}>
                <br/>
                <label>
                Name
                <input
                    name="name"
                    type="text"
                    value={exercise.name}
                    onChange={handleInputChange} />
                </label>
                <br />
                <label>
                Description
                <input
                    name="description"
                    type="text"
                    value={exercise.description}
                    onChange={handleInputChange} />
                </label>
                <br/>
                <label>
                Sets
                <input
                    name="sets"
                    type="number"
                    value={exercise.sets}
                    onChange={handleInputChange} />
                </label>
                <br/>
                <label>
                Repititions
                <input
                    name="repetitions"
                    type="number"
                    value={exercise.repetitions}
                    onChange={handleInputChange} />
                </label>
                <br/>
                <label>
                Time
                <input
                    name="time"
                    type="text"
                    value={exercise.time}
                    onChange={handleInputChange} />
                </label>
                <br/>
                <input type="submit" value="Add exercise" />
            </form>
        </main> 
    );
}