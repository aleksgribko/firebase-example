import Cookies from 'js-cookie';

export function setToken(token) {
  Cookies.set('token', token);
}

export function getToken() {
  return Cookies.get('token');
}

export function removeToken() {
  Cookies.set('token', '');
}
