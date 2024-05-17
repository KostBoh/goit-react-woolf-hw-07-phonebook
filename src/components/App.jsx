import CreatePhonebookForm from './CreatePhonebookForm/CreatePhonebookForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

import styles from './App.module.css';

const App = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Phonebook</h1>
      <CreatePhonebookForm />
      <h2 className={styles.subheading}>Contacts</h2>
      <Filter />
      <ContactList />
    </div>
  );
};

export default App;
