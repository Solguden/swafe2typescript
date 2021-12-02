import { authenticationService } from './LoginService'
// Inspired by https://jasonwatmore.com/post/2019/04/06/react-jwt-authentication-tutorial-example#user-service-js
export function handleResponse(response:any) {
    return response.text().then((text:any) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if ([401, 403].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                // authenticationService.logout();
                // location.reload(true);
                authenticationService.logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}