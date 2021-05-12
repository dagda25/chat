import React, {useEffect} from "react";
import './contacts.css';
import { connect, useSelector } from "react-redux";
import {useHistory } from 'react-router-dom';
import store from "../../store/store";
import {fetchContacts, fetchChat} from "../../store/api-actions";

const Contacts = ({ contacts }) => {
  const history = useHistory();
  const { userId, email } = useSelector((state) => {
    return state.APP.user;
  });
  useEffect(() => {
    if (!userId) {
      history.push(`/login`);
    }
    
  }, [userId]);

  useEffect(() => {
    store.dispatch(fetchContacts());
  }, []);

  if (!contacts || !contacts.length) {
    return <div>no contacts</div>;
  }

  const handleContactClick = (evt) => {
    store.dispatch(fetchChat(userId, { receiverId: evt.target.dataset.id, email: evt.target.dataset.email }));
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
