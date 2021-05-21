import {ActionCreator} from "./action";
import axios from "axios";

const backendUrl = `https://dagda25-chat.herokuapp.com`;


export const sendMessage = (message, userId, receiverId, token) => (dispatch, _getState) => {
  axios.post(`${backendUrl}/api/send`, {message, userId, receiverId}, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then((response) => {
      dispatch(ActionCreator.send(response.data));
    })
    .catch(() => {
      dispatch(ActionCreator.logout());
      dispatch(ActionCreator.redirectToRoute(`/login`));
    });
};


export const fetchChat = (userId, token, {receiverId, email}, limit) => (dispatch, _getState) => {
  axios.post(`${backendUrl}/api/chat`, {userId, receiverId, limit}, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then((response) => {
      dispatch(ActionCreator.getChat({messages: response.data.messages, receiverId, email}));
      dispatch(ActionCreator.changeShowMode(`chat`));
      dispatch(ActionCreator.setContact({contactId: receiverId, unRead: false}));
    })
    .catch(() => {
      dispatch(ActionCreator.logout());
      dispatch(ActionCreator.redirectToRoute(`/login`));
    });
};

export const register = (data) => (dispatch, _getState) => {
  axios.post(`${backendUrl}/api/auth/register`, data)
    .then((response) => {
      dispatch(ActionCreator.register(response.data));
      dispatch(ActionCreator.redirectToRoute(`/login`));
    })
    .catch(() => {
      dispatch(ActionCreator.redirectToRoute(`/register`));
    });
};


export const addSocket = (socketId, userId) => (dispatch, _getState) => {
  axios.post(`${backendUrl}/api/socket`, {socketId, userId})
    .then((response) => {
      dispatch(ActionCreator.addSocket(response.data));
    });
};

export const login = (data) => (dispatch, _getState) => {
  axios.post(`${backendUrl}/api/auth/login`, data)
    .then((response) => {
      localStorage.setItem(`email`, response.data.email);
      localStorage.setItem(`token`, response.data.token);
      localStorage.setItem(`userId`, response.data.userId);

      dispatch(ActionCreator.login(response.data));
    })
    .catch(() => {
      dispatch(ActionCreator.redirectToRoute(`/login`));
    });
};

export const fetchContacts = (token, userId) => (dispatch, _getState) => {
  axios.post(`${backendUrl}/api/users`, {userId}, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then((response) => {
      dispatch(ActionCreator.getContacts(response.data.users));
    })
    .catch(() => {
      dispatch(ActionCreator.logout());
      dispatch(ActionCreator.redirectToRoute(`/login`));
    });
};
