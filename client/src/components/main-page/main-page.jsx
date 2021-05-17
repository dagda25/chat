import React from "react";
import Chat from "../chat/chat";
import Contacts from "../contacts/contacts";
import {ActionCreator} from "../../store/action";
import {connect} from "react-redux";
import './main-page.css';

const MainPage = ({}) => {
  return (
    <main className="main-page">
      <Contacts/>
      <Chat/>
    </main>

  );
};

const mapDispatchToProps = (dispatch) => ({
  register() {
    dispatch(ActionCreator.register());
  },
});

export default connect(null, mapDispatchToProps)(MainPage);
