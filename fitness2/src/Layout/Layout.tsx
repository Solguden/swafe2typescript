
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useRoutes
  } from "react-router-dom";
import { Client } from "../Client/Client";
import { Login } from "../Login/Login";
import PrivateRoute from "../Login/PrivateRoute";
import { Manager } from "../Manager/Manager";
import { Trainer } from "../Trainer/Trainer";
import { Home } from "./Home";
import { Navbar } from "./Navbar";

export function Layout () {
return (
    <Router>
        <Navbar  />
        <Routes>
            <Route path="/" element={<PrivateRoute />}>
                <Route path='' element={<Home/>}/>
            </Route>
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
    </Router>
    );
}