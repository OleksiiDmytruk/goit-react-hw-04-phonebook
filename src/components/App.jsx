import { ContactForm } from './ContactForm/ContactForm';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';
import { useState } from 'react';
import { Section } from './Section/Section';
import { ContactList } from './ContactList/ContactList';
import { ContactFilter } from './ContactFilter/ContactFilter';
import { nanoid } from 'nanoid';
import { useEffect } from 'react';

const getInitialContacts = () => {
  const savedContacts = localStorage.getItem('contactsList');
  if (savedContacts !== null) {
    return JSON.parse(savedContacts);
  }
  return [];
};

export const App = () => {
  const [contacts, setContacts] = useState(getInitialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contactsList', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    if (isOnList(contact.name)) {
      alert(`${contact.name} is already in contacts`);
    } else {
      setContacts(prevContacts => [
        ...prevContacts,
        {
          id: nanoid(),
          ...contact,
        },
      ]);
    }
  };

  const isOnList = name => {
    return contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  return (
    <Layout>
      <Section title="Phonebook">
        <ContactForm onAdd={addContact} />
      </Section>
      <Section title="Contacts">
        <ContactFilter
          filter={filter}
          title="Find contacts by name"
          onChange={setFilter}
        />
        <ContactList contacts={filterContacts()} onDelete={deleteContact} />
      </Section>
      <GlobalStyle />
    </Layout>
  );
};
