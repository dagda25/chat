import React from "react";
import {ActionCreator} from "../../store/action";
import { connect } from "react-redux";
import { register } from "../../store/api-actions";
import store from "../../store/store";
import './register-page.css';

const RegisterPage = ({ }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const email = new FormData(evt.target).get('login');
    const password = new FormData(evt.target).get('password');
    store.dispatch(register({email, password}));
  }

  return (
    <section className="register-section">
      <h2 className="register-title">Регистрация</h2>
      <form action="/" encType="multipart/form-data" onSubmit={handleSubmit} className="register-form">
        <input type="text" name='login' className="register-login"/>
        <input type="password" name='password' className="register-password"/>
        <button type="submit" className="register-button">Зарегистрироваться</button>
      </form>
      <div className="register-already">Уже зарегистрированы?<br/><a href="/login" className="register-already-link">Войти</a></div>
    </section>

  );
};

const mapDispatchToProps = (dispatch) => ({
  register() {
    dispatch(ActionCreator.register());
  },
});

export default connect(null, mapDispatchToProps)(RegisterPage);
