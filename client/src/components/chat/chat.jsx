import React, {useEffect, useRef, useCallback} from "react";
import Message from "../message/message";
import SendForm from "../send-form/send-form";
import { ActionCreator } from "../../store/action";
import {connect, useSelector, useDispatch} from "react-redux";
import {fetchChat, addSocket} from "../../store/api-actions";
import store from "../../store/store";
import {io} from "socket.io-client";
import './chat.css';

const Chat = ({ messages, userId, receiverId, email, token, showMode }) => {
  const socket = io();

  const handleShowMoreClick = (length) => {
    store.dispatch(fetchChat(userId, token, {receiverId, email}, length + 10));
  };

  const chatList = useRef(null);
  const dispatch = useDispatch();

  const handleConnect = useCallback(() => {
    dispatch(addSocket(socket.id, userId));
  }, [userId]);

  
  useEffect(() => {
    console.log(userId);
    //const socket = io();
    socket.addEventListener(`connect`, () => handleConnect());

    return () => {
      socket.removeEventListener(`connect`, handleConnect());
    };

  }, [userId]);


  useEffect(() => {
    if (messages.length <= 20) {
      chatList.current.scrollTop = chatList.current.scrollHeight;
    }
  }, [messages, showMode]);

  const handleMessage = useCallback((data) => {
    store.dispatch(fetchChat(userId, token, {receiverId, email}));
  }, [userId, receiverId, email, token]);



  useEffect(() => {
    console.log(userId, receiverId);
    //const socket = io();
    socket.addEventListener(`comment`, handleMessage);
    return () => {
      socket.removeEventListener(`comment`, handleMessage);
    }
  }, [userId, receiverId, email, token]);

  const showContacts = () => {
    dispatch(ActionCreator.changeShowMode(`contacts`));
  };

  return (
    <>
      <section className={showMode === `chat` ? `chat` : `chat chat--mobile-hidden`}>
        <div className="chat-header">
          <div className="chat-back" onClick={showContacts}></div>
          <div className="chat-title">Чат с {email}</div>
        </div>
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
  email: APP.receiver.email,
  showMode: APP.showMode
});

export default connect(mapStateToProps)(Chat);
