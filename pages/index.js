import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Context } from '../store/Store';

import Navbar from '../components/Navbar';

const { getCredentials } = require('../lib/auth');
const { getContacts } = require('../lib/api');

const Home = () => {
  const [state, dispatch] = useContext(Context);
  const router = useRouter();

  const [error, setError] = useState('');

  const checkCredentials = async () => {
    const { token } = await getCredentials();
    if (token === null) {
      router.push('/login');
    }
  };

  const fetchContacts = async () => {
    const { token } = await getCredentials();
    const { status, data } = await getContacts({
      token,
      page: state.contactsCurrentPage,
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

  useEffect(() => {
    checkCredentials();
    fetchContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.contactsCurrentPage]);
  return (
    <div className="h-screen w-screen relative">
      <Navbar />
      <div className="flex justify-center">
        <div className="content-center h-auto w-screen">
          <table className="w-full table-auto">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Phone number</th>
              </tr>
            </thead>
            <tbody>
              {typeof state.contacts !== 'undefined' &&
                state.contacts.map((contact, key) => (
                  <tr key={`contact-${contact._id}`}>
                    <td
                      className={`p-2 text-center ${key % 2 === 0 &&
                        'bg-blue-100'}`}
                    >
                      {contact.name}
                    </td>
                    <td
                      className={`p-2 text-center ${key % 2 === 0 &&
                        'bg-blue-100'}`}
                    >
                      {contact.phone}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="absolute bottom-0 mb-4 w-screen">
            <div className="flex justify-between mt-4 mx-6">
              <button
                type="button"
                tabIndex={0}
                onKeyPress={() => {}}
                className="text-blue-500 float-left"
                onClick={() => {
                  dispatch({
                    type: 'SET_CONTACTS_CURRENT_PAGE',
                    payload: state.contactsCurrentPage - 1,
                  });
                }}
              >{`${'<'} Prev`}</button>
              <button
                type="button"
                tabIndex={0}
                onKeyPress={() => {}}
                className="text-blue-500  float-right"
                onClick={() => {
                  dispatch({
                    type: 'SET_CONTACTS_CURRENT_PAGE',
                    payload: state.contactsCurrentPage + 1,
                  });
                }}
              >{`Next ${'>'}`}</button>
            </div>
            <div className="flex justify-center mt-4">
              <p className="text-lg">
                Page {state.contactsCurrentPage} of {state.contactsPages}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
