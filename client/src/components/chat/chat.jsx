import React, {useEffect, useRef, useCallback} from "react";
import Message from "../message/message";
import SendForm from "../send-form/send-form";
import { ActionCreator } from "../../store/action";
import {connect, useDispatch} from "react-redux";
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
    if (data.receiver === userId && data.author === receiverId) {
      store.dispatch(fetchChat(userId, token, { receiverId, email }));
    } else if (data.receiver === userId) {
      dispatch(ActionCreator.setContact({ contactId: data.author, unRead: true }));
    }

  }, [userId, receiverId, email, token]);


  useEffect(() => {
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
          <div className="chat-title">?????? ?? {email}</div>
        </div>
        <div className="chat-list" ref={chatList}>
          {messages.length > 19 && <div className="show-more" onClick={() => handleShowMoreClick(messages.length)}>???????????????? ??????</div>}
          {
            messages.map((message) => {
              return <Message message={message} userId={userId} key={message._id} />;
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
