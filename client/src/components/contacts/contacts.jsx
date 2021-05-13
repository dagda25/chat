import React, {useEffect} from "react";
import './contacts.css';
import { connect, useSelector, useDispatch } from "react-redux";
import {useHistory } from 'react-router-dom';
import store from "../../store/store";
import {ActionCreator} from "../../store/action";
import {fetchContacts, fetchChat} from "../../store/api-actions";

const Contacts = ({ contacts }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  /*const { userId, email, token } = useSelector((state) => {
    return state.APP.user;
  });*/
  const email = localStorage.getItem('email');
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  useEffect(() => {

    if (email && userId && token) {
      dispatch(ActionCreator.setUser({email, userId, token}));
    }
    if (!userId) {
      history.push(`/login`);
    }
    
  }, []);

  useEffect(() => {
    store.dispatch(fetchContacts(token));
  }, []);

  if (!contacts || !contacts.length) {
    return <div>no contacts</div>;
  }

  const handleContactClick = (evt) => {
    store.dispatch(fetchChat(userId, token, { receiverId: evt.target.dataset.id, email: evt.target.dataset.email }));
  }

  return (
    <section className="contacts">
      <div className="contacts-header">{email}</div>
      <ul className="contacts-list">
        {contacts.map((contact) => {
          if (contact._id !== userId) {
            return <li key={contact._id} data-id={contact._id} data-email={contact.email} onClick={handleContactClick}>{contact.email}</li>;
          }

        })}
      </ul>
    </section>
  );
};


const mapStateToProps = ({APP}) => ({
  contacts: APP.contacts,

});

export default connect(mapStateToProps)(Contacts);
