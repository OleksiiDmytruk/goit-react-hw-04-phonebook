import { ContactForm } from './ContactForm/ContactForm';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout';
import { Component } from 'react';
import { Section } from './Section/Section';
import { ContactList } from './ContactList/ContactList';
import { ContactFilter } from './ContactFilter/ContactFilter';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contactsList');
    if (savedContacts !== null) {
      const contacts = JSON.parse(savedContacts);
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem('contactsList', JSON.stringify(this.state.contacts));
    }
  }

  addContact = contact => {
    if (this.isOnList(contact.name)) {
      alert(`${contact.name} is already in contacts`);
    } else {
      this.setState(prevState => ({
        contacts: [
          ...prevState.contacts,
          {
            id: nanoid(),
            ...contact,
          },
        ],
      }));
    }
  };

  isOnList = name => {
    return this.state.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  filterChange = value => {
    this.setState({
      filter: value,
    });
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter } = this.state;
    const searchContacts = this.filterContacts();
    return (
      <Layout>
        <Section title="Phonebook">
          <ContactForm onAdd={this.addContact} />
        </Section>
        <Section title="Contacts">
          <ContactFilter
            filter={filter}
            title="Find contacts by name"
            onChange={this.filterChange}
          />
          <ContactList
            contacts={searchContacts}
            onDelete={this.deleteContact}
          />
        </Section>
        <GlobalStyle />
      </Layout>
    );
  }
}
