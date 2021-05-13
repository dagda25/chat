import React, {useEffect, useRef, useCallback} from "react";
import Message from "../message/message";
import SendForm from "../send-form/send-form";
import {ActionCreator} from "../../store/action";
import {connect, useSelector, useDispatch} from "react-redux";
import {fetchChat} from "../../store/api-actions";
import store from "../../store/store";
import {io} from "socket.io-client";
import './chat.css';

const Chat = ({messages, userId, receiverId, email, token}) => {

  const handleShowMoreClick = (length) => {
    store.dispatch(fetchChat(userId, token, {receiverId, email}, length + 10));
  };

  const chatList = useRef(null);
  const dispatch = useDispatch();


  useEffect(() => {
    if (messages.length <= 20) {
      chatList.current.scrollTop = chatList.current.scrollHeight;
    }
  }, [messages]);

  const handleMessage = useCallback((data) => {
    store.dispatch(fetchChat(userId, token, {receiverId, email}));
  }, [userId, receiverId, email, token]);


  useEffect(() => {
    console.log(userId, receiverId);
    const socket = io();
    //socket.on('ROOM:SET_USERS', setUsers);
    //socket.on('ROOM:NEW_MESSAGE', addMessage);
    socket.addEventListener(`connect`, () => {
      dispatch(ActionCreator.addSocket(socket.id));
    });

  }, []);

  useEffect(() => {
    console.log(userId, receiverId);
    const socket = io();
    socket.addEventListener(`comment`, handleMessage);
    return () => {
      socket.removeEventListener(`comment`, handleMessage);
    }
  }, [userId, receiverId, email, token]);


  return (
    <>
      <section className="chat">
        <div className="chat-header">{email}</div>
        <div className="chat-list" ref={chatList}>
          {messages.length > 19 && <div className="show-more" onClick={() => handleShowMoreClick(messages.length)}>Показать еще</div>}
          {
            messages.map((message) => {
              return <Message message={message} userId={userId} />;
            })
          }
        </div>
        <SendForm/>
      </section>
      </>
  );
};

const mapStateToProps = ({APP}) => ({
  messages: APP.messages,
  userId: APP.user.userId,
  token: APP.user.token,
  receiverId: APP.receiver.receiverId,
  email: APP.receiver.email
});

export default connect(mapStateToProps)(Chat);
