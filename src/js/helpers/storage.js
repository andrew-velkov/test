import jwt from 'jsonwebtoken';

class STORAGE {
  static setItem = (key, value) => localStorage.setItem(key, JSON.stringify(value));

  static getItem = (key) => JSON.parse(localStorage.getItem(key));

  static isItem = (key) =>
    JSON.parse(localStorage.getItem(key)) === null ||
    JSON.parse(localStorage.getItem(key)) === '' ||
    localStorage.getItem(key) === undefined;

  static isAuthenticatUserToken = () => JSON.parse(localStorage.getItem('token')) !== null;

  static removeItem = (key) => localStorage.removeItem(key);

  static clear = () => localStorage.clear();

  static jwtDecode = (token) => jwt.decode(token);
}

export default STORAGE;
