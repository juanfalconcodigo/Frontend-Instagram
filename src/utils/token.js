import jwtDecode from 'jwt-decode';
import { TOKEN } from './constants';

const setToken = (token) => {
    localStorage.setItem(TOKEN, token);
}

const getToken = () => {
    return localStorage.getItem(TOKEN);
}

const decodeToken = (token) => {
    return jwtDecode(token);
}
export {
    setToken,
    getToken,
    decodeToken
}