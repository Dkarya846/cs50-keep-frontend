import http from "./httpServices";
import config from "../config.json";
import jwt_decode from "jwt-decode";

const token = "loginToken";
const apiEndPoint = config.apiEndPoint;

http.setJWT(localStorage.getItem(token));

const login = async (user) => {
   const { data: jwt } = await http.post(apiEndPoint + "/auth", user);
   localStorage.setItem(token, jwt);
};

const loginWithJWT = async (user) => {
   const { data } = await http.post(apiEndPoint + "/users", user);
   localStorage.setItem(token, data);
};

const logout = () => {
   localStorage.removeItem(token);
   window.location.href = "/login";
};

const getUserDetails = () => {
   const jwt = localStorage.getItem(token);
   if (jwt) return jwt_decode(jwt);
   else return null;
};

const auth = {
   getUserDetails,
   login,
   loginWithJWT,
   logout,
};

export default auth;
