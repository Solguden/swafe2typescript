import { useState } from "react";
import { handleResponse } from './handle-response';
import { authHeader } from './auth-header'

export function logout(){
  localStorage.removeItem('currentUser');
}

interface UserState{
    email?:string;
    password?:string;
}

export function Login () {
  const initialState:UserState = { email: '', password: '' };
//   const initialState = (email:string,password:string)
  const [state, setState] = useState(initialState);

  function handleChangeEmail(event:any) {
    console.log(event.target.value)
    setState({ email: event.target.value });
  }

  function handleChangePassword(event:any) {
    console.log(event.target.value)
    setState({ password: event.target.value });
  }

  function handleSubmit(event:any) {
    const email = state.email
    const password = state.password
    event.preventDefault();
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    };
    return fetch(`https://afe2021fitness.azurewebsites.net/api/Users/login`, requestOptions)
      // .then(resp => resp.json())
      .then(handleResponse)
      .then(user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          console.log(user)
          return user;
      });
  }    

  function getAll() {
    // let requestOptions: HeadersInit = new Headers();
    let requestOptions: any = { method: 'GET', headers: authHeader()};
    return fetch(`https://afe2021fitness.azurewebsites.net/api/Users`, requestOptions).then(handleResponse);
  }

  function setManager(){
    setState({ email: "boss@fitness.moon", password: "asdfQWER" });
  }

  function setTrainer(){
    setState({ email: "m@fit", password: "aQ" });
  }
  function setClient(){
    setState({ email: "c1@fit", password: "aA" });
  }

  return (
    <main>
      <div className="wrapper">
        <p>Login as:</p>
          <button onClick={setManager}>Manager</button>
          <button onClick={setTrainer}>Trainer</button>
          <button onClick={setClient}>Client</button>

          <form onSubmit={handleSubmit}>
              <label>
                Email:
                <input type="email" value={state.email} onChange={handleChangeEmail}></input>
              </label>
              <br/>
              <label>
                Password:
                <input type="password" value={state.password} onChange={handleChangePassword}></input>
              </label>
              <br/>
              <input type="submit" value="Login"></input>
          </form>
          <button onClick={getAll}>Test</button>
          <button onClick={logout}>Logout</button>
        </div>
    </main>
  );
}