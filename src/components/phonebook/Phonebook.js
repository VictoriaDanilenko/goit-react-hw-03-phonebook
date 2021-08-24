import React, { useState } from 'react';
import ContactForm from './contactForm/ContactForm';
import ContactList from './contactList/ContactList';
import Filter from './filter/Filter';
import Main from './PhonebookStyled';

import { notice } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const Phonebook = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '+380674591256' },
    { id: 'id-2', name: 'Hermione Kline', number: '+380674438912' },
    { id: 'id-3', name: 'Eden Clements', number: '+380676451779' },
    { id: 'id-4', name: 'Annie Copeland', number: '+380672279126' },
  ]);
  const [filter, setFilter] = useState('');

  const addContact = user => {
    if (contacts.some(item => item.name === user.name)) {
      notice({
        text: `${user.name} is already in contacts`,
        delay: 1500,
        width: '300px',
      });
      return;
    }
    if (contacts.some(item => item.number === user.number)) {
      notice({
        text: `${user.number} is already in use`,
        delay: 1500,
        width: '300px',
      });
      return;
    }

    if (!user.name.length) {
      notice({
        text: 'Please enter a name',
        delay: 1500,
        width: '300px',
      });
      return;
    }

    if (!user.number.length) {
      notice({
        text: 'Please enter a number',
        delay: 1500,
        width: '300px',
      });
      return;
    }
    const regex = /^(\+38|7|8)?[\s-]?\(?[0][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/;

    if (!regex.test(user.number)) {
      notice({
        text: 'Рlease enter the correct phone number',
        delay: 1500,
        width: '300px',
      });

      return;
    }

    setContacts(prevState => [...prevState, user]);
  };

  const deleteContact = e => {
    const id = e.currentTarget.dataset.id;
    setContacts(prevState => [...prevState.filter(item => item.id !== id)]);
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  const handleFilterInputChange = e => {
    setFilter(e.target.value);
  };

  return (
    <Main>
      <h1 className="phonebook_title">Phonebook</h1>
      <ContactForm addContact={addContact} />

      <h2 className="contacts_title">Contacts</h2>
      {contacts.length >= 1 && (
        <Filter onChange={handleFilterInputChange} filter={filter} />
      )}

      {contacts.length > 0 ? (
        <ContactList
          contacts={getFilteredContacts()}
          filter={filter}
          deleteContact={deleteContact}
        />
      ) : (
        <p className="contacts_text">
          Your phone book is empty. Please add a contact.
        </p>
      )}
    </Main>
  );
};

export default Phonebook;