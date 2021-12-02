// import { Login } from './Login';
// Inspired by https://jasonwatmore.com/post/2019/04/06/react-jwt-authentication-tutorial-example#user-service-js
export function authHeader() {
    // return authorization header with jwt token
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    console.log(currentUser)
    if (currentUser && currentUser.jwt) {
        return { Authorization: `Bearer ${currentUser.jwt}` || '{}' };
    } else {
        return {};
    }
}