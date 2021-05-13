import React, { useEffect} from "react";
import { useSelector } from 'react-redux';
import {useHistory } from 'react-router-dom';
import {ActionCreator} from "../../store/action";
import { connect } from "react-redux";
import { login } from "../../store/api-actions";
import store from "../../store/store";

const LoginPage = () => {
  const history = useHistory();
  const isLogged = useSelector((state) => {
    return state.APP.isLogged;
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const email = new FormData(evt.target).get('login');
    const password = new FormData(evt.target).get('password');
    store.dispatch(login({email, password}));
  }

  useEffect(() => {
    if (isLogged) {
      history.push(`/`);
    }

  }, [isLogged]);

  return (
    <>
      <form action="/" encType="multipart/form-data" onSubmit={handleSubmit}>
        <input type="text" name='login'/>login
        <input type="password" name='password'/>password
        <button type="submit">Login</button>
      </form>
    </>

  );
};

const mapDispatchToProps = (dispatch) => ({
  login() {
    dispatch(ActionCreator.login());
  },
});

export default connect(null, mapDispatchToProps)(LoginPage);
