import { useState } from "react";
import { handleResponse } from './handle-response';
import { authHeader } from './auth-header'
import { useLoginContext } from "./LoginProvider";
import { authenticationService, User } from "./LoginService";
import { useNavigate } from "react-router-dom";

export function logout(){
  localStorage.removeItem('currentUser');
}

interface UserState{
    email?:string;
    password?:string;
}

export function Login () {
  const initialState:UserState = { email: '', password: '' };
  const [state, setState] = useState(initialState);
  const navigate = useNavigate();
  const [loggedIn,setLogin] = useLoginContext();


  function handleChangeEmail(event:any) {
    console.log(event.target.value)
    setState({...state, email: event.target.value });
  }

  function handleChangePassword(event:any) {
    console.log(event.target.value)
    setState({...state, password: event.target.value });
  }

  function handleSubmit(event:any) {
    const email = state.email
    const password = state.password
    console.log(email,password)
    event.preventDefault();
    
    authenticationService.login(email || '',password || '')
    .then( loginResult =>{
      setLogin({...loggedIn, loggedIn:true, accountType:loginResult?.accountType})   
      console.log("test",loginResult?.accountType) 
      redirect(loginResult?.accountType || '')
    })
    .catch(error => {
      console.log(error)
    })
    
  }    

  function redirect(accountType:string){
    console.log(accountType)
    switch(accountType){
      case 'Manager':
        navigate('/manager')
        break;
      case 'Client':
        navigate('/client')
        break;
      case 'PersonalTrainer':
        navigate('/trainer')
        break;
      default:
        navigate('/login')
        break
    }
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
          {/* <button onClick={getAll}>Test</button> */}
          <button onClick={logout}>Logout</button>
        </div>
    </main>
  );
}