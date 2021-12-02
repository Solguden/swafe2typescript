import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { authenticationService } from './LoginService'

//Inspired by:
//https://stackoverflow.com/questions/69864165/error-privateroute-is-not-a-route-component-all-component-children-of-rou

export default function PrivateRoute() {
    const auth = authenticationService.authorized() // determine if authorized, from context or however you're doing it
    console.log("auth " + auth)
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ? <Outlet /> : <Navigate to="/login" />;
}