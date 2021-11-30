// import { Login } from './Login';

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