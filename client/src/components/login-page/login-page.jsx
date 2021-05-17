import React, {useEffect} from "react";
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {ActionCreator} from "../../store/action";
import {connect} from "react-redux";
import {login} from "../../store/api-actions";
import store from "../../store/store";
import './login-page.css';

const LoginPage = () => {
  const history = useHistory();
  const isLogged = useSelector((state) => {
    return state.APP.isLogged;
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const email = new FormData(evt.target).get(`login`);
    const password = new FormData(evt.target).get(`password`);
    store.dispatch(login({email, password}));
  };

  useEffect(() => {
    if (isLogged) {
      history.push(`/`);
    }

  }, [isLogged]);

  return (
    <section className="login-section">
      <h2 className="login-title">Вход</h2>
      <form action="/" encType="multipart/form-data" onSubmit={handleSubmit} className="login-form">
        <input type="text" name='login' className="login-input-login" placeholder="Введите логин"/>
        <input type="password" name='password' className="login-input-password" placeholder="Введите пароль"/>
        <button type="submit" className="login-button">Войти</button>
      </form>
      <div className="login-no-account">Еще нет аккаунта?<br/><a href="/register" className="login-no-account-link">Зарегистрироваться</a></div>
    </section>

  );
};

const mapDispatchToProps = (dispatch) => ({
  login() {
    dispatch(ActionCreator.login());
  },
});

export default connect(null, mapDispatchToProps)(LoginPage);
