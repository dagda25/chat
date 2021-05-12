import axios from "axios";

const BACKEND_URL = `https://pokeapi.co/api/v2`;
const REQUEST_TIMEOUT = 5000;

const HttpCode = {
  UNAUTHORIZED: 401
};


export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
    withCredentials: true,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    const {response} = err;

      throw err;

  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
