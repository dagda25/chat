import {ActionCreator} from "./action";
import axios from "axios";


export const sendMessage = (message, userId, receiverId) => (dispatch, _getState) => {
  axios.post(`http://localhost:5000/api/send`, {message, userId, receiverId})
    .then((response) => {
      console.log("resp data ", response.data)
      dispatch(ActionCreator.send(response.data));
    });
};


export const fetchChat = (userId, { receiverId, email }, limit) => (dispatch, _getState) => {
  axios.post(`http://localhost:5000/api/chat`, {userId, receiverId, limit})
    .then((response) => {
      dispatch(ActionCreator.getChat({messages: response.data.messages, receiverId, email}));
    });
};

export const register = (data) => (dispatch, _getState) => {
  axios.post(`http://localhost:5000/api/auth/register`, data)
    .then((response) => {
      dispatch(ActionCreator.register(response.data));
    });
};

export const login = (data) => (dispatch, _getState) => {
  axios.post(`http://localhost:5000/api/auth/login`, data)
    .then((response) => {
      dispatch(ActionCreator.login(response.data));
    });
};

export const fetchContacts = (data) => (dispatch, _getState) => {
  axios.get(`http://localhost:5000/api/users`, data)
    .then((response) => {
      dispatch(ActionCreator.getContacts(response.data.users));
    });
};
