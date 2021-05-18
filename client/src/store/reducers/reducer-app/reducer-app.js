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
  socket: ``,
  showMode: `chat`
};

const sortContacts = (contacts) => {
  const sorted = contacts.sort((a, b) => {
    if (!a.messages[0]) {
      return 1;
    }

    if (!b.messages[0]) {
      return -1;
    }
    return new Date(b.messages[0].date) - new Date(a.messages[0].date);
  });
  return sorted;
};

const setContact = (state, data) => {
  const contacts = JSON.parse(JSON.stringify(state.contacts));
  const contact = contacts.find((c) => {
    return c._id === data.contactId;
  });
  contact.unRead = data.unRead;
  return contacts;
};


const reducerApp = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_DATA:
      return Object.assign({}, state, {
        data: action.payload,
      });
    case ActionType.GET_CONTACTS:
      return Object.assign({}, state, {
        contacts: sortContacts(action.payload),
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
    case ActionType.LOGOUT:
      return Object.assign({}, state, {
        user: {},
        isLogged: false
      });
    case ActionType.SET_USER:
      return Object.assign({}, state, {
        user: action.payload,
        isLogged: true
      });
    case ActionType.SET_CONTACT:
      return Object.assign({}, state, {
        contacts: setContact(state, action.payload)
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
        socket: action.payload.socketId
      });
    case ActionType.CHANGE_SHOW_MODE:
      return Object.assign({}, state, {
        showMode: action.payload
      });
    default:
      return state;
  }
};

export {reducerApp};

