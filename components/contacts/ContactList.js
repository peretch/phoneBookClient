import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../../store/Store';

import Searchbar from './Searchbar';

const ContactList = ({
  handleCreateContact,
  handleSelectedContact,
  handleDeleteContact,
}) => {
  const [state, dispatch] = useContext(Context);
  const [error, setError] = useState('');
  return (
    <div className="content-center h-auto w-screen">
      <div className="overflow-y-auto w-full">
        <div className="p-4 bg-blue-900">
          <span className="text-xl shadow-2xl text-white font-medium">
            Contact list
          </span>
          {/* <Link href="/contacts/create"> */}
          <button
            type="button"
            tabIndex={0}
            onKeyPress={() => {}}
            onClick={() => handleCreateContact(true)}
            className="text-lg float-right px-2 rounded-full text-blue-400"
          >
            <svg
              className="w-8 h-8"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {/* </Link> */}
        </div>
        <div className="py-1">
          <Searchbar />
        </div>
        <table className="w-full table-auto">
          <thead className="bg-gray-300 text-black">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Phone number</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {typeof state.contacts !== 'undefined' &&
              state.contacts.length > 0 &&
              state.contacts.map((contact, key) => (
                <tr key={`contact-${contact._id}`}>
                  <td
                    className={`p-3 text-center text-blue-500 ${key % 2 === 0 &&
                      'bg-gray-100'}`}
                  >
                    <button
                      type="button"
                      onKeyPress={() => {}}
                      onClick={() => {
                        handleSelectedContact(contact);
                      }}
                    >
                      {contact.name} {contact.lastname}
                    </button>
                  </td>
                  <td
                    className={`p-3 text-center ${key % 2 === 0 &&
                      'bg-gray-100'}`}
                  >
                    {contact.phone}
                  </td>
                  <td
                    className={`p-3 text-center text-red-500 ${key % 2 === 0 &&
                      'bg-gray-100'}`}
                  >
                    <button
                      type="button"
                      tabIndex={0}
                      onKeyPress={() => {}}
                      onClick={() =>
                        handleDeleteContact({ contactId: contact._id })
                      }
                    >
                      Del
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <p className="text-red-500 text-md">{error}</p>
      </div>

      <div className="py-4 w-screen bg-blue-900 text-white">
        <div className="flex justify-between mt-4 mx-6 ">
          <button
            type="button"
            tabIndex={0}
            onKeyPress={() => {}}
            className="text-gray-200 text-lg float-left"
            onClick={() => {
              if (state.contactsCurrentPage > 1) {
                dispatch({
                  type: 'SET_CONTACTS_CURRENT_PAGE',
                  payload: state.contactsCurrentPage - 1,
                });
              }
            }}
          >{`${'<'} Prev`}</button>
          <button
            type="button"
            tabIndex={0}
            onKeyPress={() => {}}
            className="text-gray-200 text-lg float-right"
            onClick={() => {
              if (state.contactsCurrentPage < state.contactsPages) {
                dispatch({
                  type: 'SET_CONTACTS_CURRENT_PAGE',
                  payload: state.contactsCurrentPage + 1,
                });
              }
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
  );
};

ContactList.propTypes = {
  handleCreateContact: PropTypes.func,
  handleSelectedContact: PropTypes.func,
  handleDeleteContact: PropTypes.func,
};

export default ContactList;
