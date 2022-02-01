import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
   const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status <= 500;

   if (!expectedErrors) {
      console.log("Logging the error", error);
      toast.error("An unexpected error occured ");
   }
   return Promise.reject(error);
});

function setJWT(jwt) {
   axios.defaults.headers.common["x-auth-token"] = jwt;
}

const http = {
   get: axios.get,
   post: axios.post,
   put: axios.put,
   delete: axios.delete,
   setJWT,
};

export default http;
