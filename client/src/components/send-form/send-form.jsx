import React, {useRef} from "react";
import { ActionCreator } from "../../store/action";
import { sendMessage } from "../../store/api-actions";
import { connect } from "react-redux";
import { useSelector } from 'react-redux';
import store from "../../store/store";
import './send-form.css';


const SendForm = () => {
  const {userId, token} = useSelector((state) => {
    return state.APP.user;
  });

  const { receiverId } = useSelector((state) => {
    return state.APP.receiver;
  });

  const input = useRef(null);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const message = new FormData(evt.target).get(`message`);
    if (message) {
      store.dispatch(sendMessage(message, userId, receiverId, token));
      input.current.value = ``;
    }
  };


  return (
    <section className="send-panel">
      <form action="/" encType="multipart/form-data" onSubmit={handleSubmit} className="send-form">
        <textarea name="message" className="send-input" ref={input}/>
        <button type="submit" className="send-button">Отправить</button>
        <button type="submit" className="send-button-mobile"></button>
      </form>
    </section>

  );
};


export default SendForm;
