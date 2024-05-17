import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { selectContacts } from 'store/selectors';
import { addContacts } from 'store/operations';
import styles from './CreatePhonebookForm.module.css';

const CreatePhonebookForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();

    const contactExists = contacts.some(
      contact => contact.name === name || contact.number === number
    );

    if (contactExists) {
      alert("Контакт з таким ім'ям або номером вже існує!");
      return;
    }

    dispatch(addContacts({ id: nanoid(), name, number }));
    setName('');
    setNumber('');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="name" className={styles.label}>
          Name
        </label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          type="text"
          name="name"
          className={styles.input}
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and  spaces.        For example Adrian, Jacob Mercer, Charles de  Batz de Castelmore       d'Artagnan"
          required
        />
        <label htmlFor="number" className={styles.label}>
          Number
        </label>
        <input
          value={number}
          onChange={e => setNumber(e.target.value)}
          type="tel"
          name="number"
          className={styles.input}
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button type="submit" className={styles.button}>
          Add contact
        </button>
      </form>
    </div>
  );
};

export default CreatePhonebookForm;
