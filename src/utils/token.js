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

const removeToken = () => {
    localStorage.removeItem(TOKEN);
}
export {
    setToken,
    getToken,
    decodeToken,
    removeToken
}