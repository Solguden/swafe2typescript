import { User } from "../util/LoginService";
import { useEffect, useState } from "react";
import { userService } from "../util/UserService";
import CSS from 'csstype';
import { Workouts } from "../Client/Client";
import { authHeader } from "../Login/auth-header";
import { handleResponse } from "../Login/handle-response";
import { useLoginContext } from "../Login/LoginProvider";

export function CreateWorkoutProgram () {
    const [loggedIn,setLogin] = useLoginContext();
    const initialWorkouts: Workouts =  {
        name: '', 
        description: '',
        clientId:'',
        exercises: [
        ]
    };
    const [workouts, setWorkouts] = useState(initialWorkouts);

    const initialState:User[] = [{ email: '', password: '', 
        firstName:'', lastName:'',
        accountType:'' 
    }];
    const [users, setUsers] = useState(initialState);

    function handleInputChange(event:any) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setWorkouts(state => {
            return {
                ...state,
                [name]: value
            };
        });
    }
    function test(e:any)
    {
        console.log(e)
    }
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


    function handleSubmit(event:any) {
    event.preventDefault();
    userService.createWorkoutProgram(workouts).then( res => {
        alert('Following user has been created ' + JSON.stringify(res));
        setWorkouts(initialWorkouts)
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
    function MakeItem(X:User) {
    return <option value={X.userId}>{X.firstName} {X.lastName}</option>;
    };

    return (
        <main style={wrapper}>
            <p>Create new workoutprogram:</p>
            <form onSubmit={handleSubmit}>
                <label>
                Name
                <input
                    name="name"
                    type="text"
                    value={workouts.name}
                    onChange={handleInputChange} />
                </label>
                <br />
                <label>
                Description
                <input
                    name="description"
                    type="text"
                    value={workouts.description}
                    onChange={handleInputChange} />
                </label>
                <br/>
                <label>
                Select Client
                <select style={select} name="clientId" onChange={handleInputChange}>
                    <option disabled selected></option>
                    {users.map(MakeItem)}
                </select>
                <br/>
                ClientId
                <input
                    disabled
                    name="clientId"
                    type="text"
                    value={workouts.clientId}
                    onChange={handleInputChange} />
                </label>
                <br/>
                <input type="submit" value="Create Workout Program" />
            </form>
        </main> 
    );
}