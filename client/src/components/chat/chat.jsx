import React, {useEffect, useRef, useCallback} from "react";
import Message from "../message/message";
import SendForm from "../send-form/send-form";
import {ActionCreator} from "../../store/action";
import {connect, useSelector, useDispatch} from "react-redux";
import {fetchChat} from "../../store/api-actions";
import store from "../../store/store";
import {io} from "socket.io-client";
import './chat.css';

const Chat = ({messages, userId, receiverId, email}) => {

  /*const {userId} = useSelector((state) => {
    return state.APP.user;
  });

  const {receiverId, email} = useSelector((state) => {
    return state.APP.receiver;
  });*/

  const handleShowMoreClick = (length) => {
    store.dispatch(fetchChat(userId, {receiverId, email}, length + 10));
  };

  const chatList = useRef(null);
  const dispatch = useDispatch();


  useEffect(() => {
    if (messages.length <= 20) {
      chatList.current.scrollTop = chatList.current.scrollHeight;
    }
  }, [messages]);

  const handleMessage = useCallback((data) => {
    store.dispatch(fetchChat(userId, {receiverId: data.receiver, email}));
  }, []);

  /*const handleMessage = (data) => {
    store.dispatch(fetchChat(userId, {receiverId: data.receiver, email}));
  }*/

  useEffect(() => {
    console.log(userId, receiverId);
    const socket = io();
    socket.addEventListener(`comment`, handleMessage);
    socket.addEventListener(`connect`, () => {
      dispatch(ActionCreator.addSocket(socket.id));
    });

  }, []);


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
  receiverId: APP.receiver.receiverId,
  email: APP.receiver.email
});

export default connect(mapStateToProps)(Chat);
