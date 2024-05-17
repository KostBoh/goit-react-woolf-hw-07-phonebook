import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ContactList.module.css';
import { selectContacts, selectFilter } from 'store/selectors';
import { deleteContact, fetchContacts } from 'store/operations';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts = contacts.filter(
    contact => contact.name.toLowerCase().includes(filter.toLowerCase()),
    [contacts, filter]
  );

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  return (
    <ul className={styles.list}>
      {filteredContacts.map(({ id, name, phone }) => (
        <li key={id} className={styles.item}>
          {name}: {phone}
          <button
            className={styles.buttonDelete}
            onClick={() => handleDelete(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
