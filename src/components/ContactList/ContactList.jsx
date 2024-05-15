import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../store/contactsSlice';

import styles from './ContactList.module.css';
import { selectContacts, selectFilter } from 'store/selectors';

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const filteredContacts = React.useMemo(
    () =>
      contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [contacts, filter]
  );

  const onDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <ul className={styles.list}>
      {filteredContacts.map(contact => (
        <li key={contact.id} className={styles.item}>
          {contact.name}: {contact.number}
          <button
            className={styles.buttonDelete}
            onClick={() => onDeleteContact(contact.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
