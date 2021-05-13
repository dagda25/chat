import {ActionType} from "../../action";


const initialState = {
  data: [],
  isLogged: false,
  user: {

  },
  receiver: ``,
  messages: [

  ],
  contacts: [

  ],
  socket: ``
};


const reducerApp = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_DATA:
      return Object.assign({}, state, {
        data: action.payload,
      });
    case ActionType.GET_CONTACTS:
      return Object.assign({}, state, {
        contacts: action.payload,
      });
    case ActionType.GET_CHAT:
      return Object.assign({}, state, {
        messages: action.payload.messages,
        receiver: Object.assign({}, state.receiver, {receiverId: action.payload.receiverId, email: action.payload.email})
      });
    case ActionType.LOGIN:
      return Object.assign({}, state, {
        user: action.payload,
        isLogged: true
      });
    case ActionType.SET_USER:
      return Object.assign({}, state, {
        user: action.payload,
        isLogged: true
      });
    case ActionType.REGISTER:
      return Object.assign({}, state, {
        data: action.payload,
      });
    case ActionType.SEND:
      return Object.assign({}, state, {
        messages: [...state.messages, action.payload]
      });
    case ActionType.ADD_MESSAGE:
      return Object.assign({}, state, {
        messages: [...state.messages, action.payload]
      });
    case ActionType.ADD_SOCKET:
      return Object.assign({}, state, {
        socket: action.payload
      });
    default:
      return state;
  }
};

export {reducerApp};

