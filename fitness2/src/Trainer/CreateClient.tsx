import { User } from "../util/LoginService";
import { useState } from "react";
import { userService } from "../util/UserService";
import CSS from 'csstype';
import { useLoginContext } from "../Login/LoginProvider";

export function CreateClient () {
    const [loggedIn,setLogin] = useLoginContext();

    const initialState:User = { 
        email: '', password: '', 
        firstName:'', lastName:'',
        accountType:'Client',
        personalTrainerId: loggedIn.userId
    };
    const [state, setState] = useState(initialState);

    function handleInputChange(event:any) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setState(state => {
        return {
            ...state,
            [name]: value
        };
        });
    }

    function handleSubmit(event:any) {
        event.preventDefault();

        userService.createUser(state).then( res => {
            alert('Following user has been created ' + JSON.stringify(res));
            setState(initialState)
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
    

    return (
        <main style={wrapper}>
            <p>Create new client:</p>
            <form onSubmit={handleSubmit}>
                <label>
                Email
                <input
                    name="email"
                    type="email"
                    value={state.email}
                    onChange={handleInputChange} />
                </label>
                <br />
                <label>
                Password
                <input
                    name="password"
                    type="password"
                    value={state.password}
                    onChange={handleInputChange} />
                </label>
                <br/>
                <label>
                First Name
                <input
                    name="firstName"
                    type="text"
                    value={state.firstName}
                    onChange={handleInputChange} />
                </label>
                <br/>
                <label>
                Last Name
                <input
                    name="lastName"
                    type="text"
                    value={state.lastName}
                    onChange={handleInputChange} />
                </label>
                <br/>
                <input type="submit" value="Create Client" />
            </form>
        </main> 
    );
}