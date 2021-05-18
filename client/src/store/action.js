export const ActionType = {
  GET_DATA: `GET_DATA`,
  REDIRECT_TO_ROUTE: `REDIRECT_TO_ROUTE`,
  LOGIN: `LOGIN`,
  LOGOUT: `LOGOUT`,
  REGISTER: `REGISTER`,
  SEND: `SEND`,
  GET_CONTACTS: `GET_CONTACTS`,
  GET_CHAT: `GET_CHAT`,
  ADD_MESSAGE: `ADD_MESSAGE`,
  ADD_SOCKET: `ADD_SOCKET`,
  SET_USER: `SET_USER`,
  SET_CONTACT: `SET_CONTACT`,
  CHANGE_SHOW_MODE: `CHANGE_SHOW_MODE`
};

export const ActionCreator = {
  getData: (data) => ({
    type: ActionType.GET_DATA,
    payload: data
  }),
  addMessage: (data) => ({
    type: ActionType.ADD_MESSAGE,
    payload: data
  }),
  addSocket: (data) => ({
    type: ActionType.ADD_SOCKET,
    payload: data
  }),
  getContacts: (data) => ({
    type: ActionType.GET_CONTACTS,
    payload: data
  }),
  getChat: (data) => ({
    type: ActionType.GET_CHAT,
    payload: data
  }),
  login: (data) => ({
    type: ActionType.LOGIN,
    payload: data
  }),
  logout: (data) => ({
    type: ActionType.LOGOUT,
    payload: data
  }),
  setUser: (data) => ({
    type: ActionType.SET_USER,
    payload: data
  }),
  setContact: (data) => ({
    type: ActionType.SET_CONTACT,
    payload: data
  }),
  register: (data) => ({
    type: ActionType.REGISTER,
    payload: data
  }),
  send: (data) => ({
    type: ActionType.SEND,
    payload: data
  }),
  redirectToRoute: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url,
  }),
  changeShowMode: (data) => ({
    type: ActionType.CHANGE_SHOW_MODE,
    payload: data
  }),
};
