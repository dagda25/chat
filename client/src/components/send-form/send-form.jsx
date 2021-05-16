import React from "react";
import { ActionCreator } from "../../store/action";
import { sendMessage } from "../../store/api-actions";
import { connect } from "react-redux";
import { useSelector } from 'react-redux';
import store from "../../store/store";
import './send-form.css';


const SendForm = ({send}) => {
  const { userId, token } = useSelector((state) => {
    return state.APP.user;
  });

  const { receiverId } = useSelector((state) => {
    return state.APP.receiver;
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const message = new FormData(evt.target).get(`message`);
    if (message) {
      store.dispatch(sendMessage(message, userId, receiverId, token));
    }
  };


  return (
    <section className="send-panel">
      <form action="/" encType="multipart/form-data" onSubmit={handleSubmit} className="send-form">
        <textarea name="message" className="send-input"/>
        <button type="submit" className="send-button">Отправить</button>
        <button type="submit" className="send-button-mobile"></button>
      </form>
    </section>

  );
};

const mapDispatchToProps = (dispatch) => ({
  send() {
	  dispatch(ActionCreator.send());
  },
});

export default connect(null, mapDispatchToProps)(SendForm);
