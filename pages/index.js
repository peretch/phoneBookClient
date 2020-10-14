import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Context } from '../store/Store';

import Navbar from '../components/Navbar';
import UpdateContact from '../components/contacts/UpdateContact';
import CreateContact from '../components/contacts/CreateContact';
import ContactList from '../components/contacts/ContactList';
import FetchFailure from '../components/contacts/FetchFailure';

const { getCredentials } = require('../lib/auth');
const { getContacts, deleteContact } = require('../lib/api');

const Home = () => {
  const [state, dispatch] = useContext(Context);
  const router = useRouter();

  const [error, setError] = useState('');
  const [creatingContact, setCreatingContact] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleIndex = () => {
    setCreatingContact(false);
    setSelectedContact(null);
  };

  const fetchContacts = async () => {
    console.log('Getting contacts...');
    const { token } = await getCredentials();
    const { status, data } = await getContacts({
      token,
      page: state.contactsCurrentPage,
      search: state.contactsSearch,
    });
    if (status === 200) {
      const { contacts, totalContacts, totalPages, page } = data;
      dispatch({ type: 'SET_CONTACTS', payload: contacts });
      dispatch({ type: 'SET_CONTACTS_CURRENT_PAGE', payload: page });
      dispatch({ type: 'SET_CONTACTS_TOTAL', payload: totalContacts });
      dispatch({ type: 'SET_CONTACTS_PAGES', payload: totalPages });
    } else {
      setError('Failed to get contacts');
    }
  };

  const handleDelete = async ({ contactId }) => {
    const { token } = await getCredentials();
    const { status, data } = await deleteContact({ token, contactId });
    if (status === 204) {
      fetchContacts();
    }
  };

  const isLogged = async () => {
    const { token } = await getCredentials();
    if (token === null) {
      return router.push('/login');
    }
  };

  useEffect(() => {
    isLogged();
  });

  useEffect(() => {
    fetchContacts();
  }, [state.contactsCurrentPage]);

  return (
    <div className="h-screen w-screen relative">
      <Navbar handleIndex={handleIndex} />
      {selectedContact === null && !creatingContact && (
        <>
          {state.contacts !== null ? (
            <ContactList
              handleCreateContact={setCreatingContact}
              handleSelectedContact={setSelectedContact}
              handleDeleteContact={handleDelete}
            />
          ) : (
            <FetchFailure reload={fetchContacts} />
          )}
        </>
      )}
      {selectedContact !== null && (
        <UpdateContact
          selectedContact={selectedContact}
          onUpdate={() => setSelectedContact(null)}
        />
      )}
      {creatingContact && <CreateContact />}
    </div>
  );
};

export default Home;
