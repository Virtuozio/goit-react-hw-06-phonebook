import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { store } from 'store/store';

export const App = () => {
  const [filter, setFilter] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  useEffect(() => {
    const acontacts = localStorage.getItem('contacts');
    console.log(acontacts);
    if (acontacts) {
      setContacts(JSON.parse(acontacts));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  const handleCreate = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const names = contacts.map(contact => contact.name);
    if (names.includes(name)) {
      alert(`${name} is already in contacts.`);
      return;
    }
    setContacts(prev => {
      return [
        ...prev,
        {
          id: nanoid(),
          name: name,
          number: number,
        },
      ];
    });
    form.reset();
  };
  const handleChange = ({ target: { name, value } }) => {
    if (name === 'filter') setFilter(value);
    if (name === 'name') setName(value);
    if (name === 'number') setNumber(value);
  };
  const deleteContact = ({ target }) => {
    setContacts(contacts.filter(contact => contact.id !== target.id));
  };

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onChange={handleChange} onAddContact={handleCreate} />

      <h2>Contacts</h2>
      <Filter filter={filter} onChange={handleChange} />
      <ContactList
        contacts={contacts}
        filter={filter}
        deleteBtn={deleteContact}
      />
    </>
  );
};
