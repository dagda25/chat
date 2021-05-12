import React from "react";
import { ActionCreator } from "../../store/action";
import { sendMessage } from "../../store/api-actions";
import { connect } from "react-redux";
import { useSelector } from 'react-redux';
import store from "../../store/store";


const SendForm = ({send}) => {
  const { userId } = useSelector((state) => {
    return state.APP.user;
  });

  const { receiverId } = useSelector((state) => {
    return state.APP.receiver;
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const message = new FormData(evt.target).get(`message`);
    console.log(message, userId, receiverId)
    store.dispatch(sendMessage(message, userId, receiverId));
  };


  return (
    <form action="/" encType="multipart/form-data" onSubmit={handleSubmit}>
      <input type="text" name="message"/>
      <button type="submit">send</button>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  send() {
	  dispatch(ActionCreator.send());
  },
});

export default connect(null, mapDispatchToProps)(SendForm);
