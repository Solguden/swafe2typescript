import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useRoutes
} from "react-router-dom";
import { Navbar } from './Layout/Navbar';
import { Home } from './Layout/Home';
import { Client } from './Client/Client'
import { Manager } from './Manager/Manager'
import { Trainer } from './Trainer/Trainer'
import { Login } from './Login/Login'
import PrivateRoute from './Login/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Fitness app</h1>
        <Navbar  />
        <div className="router-view">
          <div className="filler-left"></div>
          <div  className="routes">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/client" element={<PrivateRoute />}>
                <Route path='' element={<Client/>}/>
              </Route>
              <Route path="/manager" element={<PrivateRoute />}>
                <Route path='' element={<Manager/>}/>
              </Route>
              <Route path="/trainer" element={<PrivateRoute />}>
                <Route path='' element={<Trainer/>}/>
              </Route>
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
          <div className="filler-right"></div>
        </div>
        <div className="footer"></div>
      </div>
    </Router>
  );
}

export default App;
