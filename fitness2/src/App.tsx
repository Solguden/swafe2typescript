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

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Fitness app</h1>
        <Navbar />
        <div className="router-view">
          <div className="filler-left"></div>
          <div  className="routes">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/client" element={<Client />} />
              <Route path="/manager" element={<Manager />} />
              <Route path="/trainer" element={<Trainer />} />
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
