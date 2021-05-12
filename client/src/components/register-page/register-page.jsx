import React from "react";
import {ActionCreator} from "../../store/action";
import { connect } from "react-redux";
import { register } from "../../store/api-actions";
import store from "../../store/store";

const RegisterPage = ({ }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const email = new FormData(evt.target).get('login');
    const password = new FormData(evt.target).get('password');
    store.dispatch(register({email, password}));
  }

  return (
    <>
      <form action="/" encType="multipart/form-data" onSubmit={handleSubmit}>
        <input type="text" name='login'/>login
        <input type="password" name='password'/>password
        <button type="submit">Register</button>
      </form>
    </>

  );
};

const mapDispatchToProps = (dispatch) => ({
  register() {
    dispatch(ActionCreator.register());
  },
});

export default connect(null, mapDispatchToProps)(RegisterPage);
