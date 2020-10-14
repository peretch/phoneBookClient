import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../store/Store';

import CustomButton from './custom/CustomButton';
import CustomInput from './custom/CustomInput';

const UpdateContact = ({ selectedContact, onUpdate }) => {
  const [state, dispatch] = useContext(Context);

  const [waiting, setWaiting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState(selectedContact);

  const cleanAlerts = () => {
    setSuccess('');
    setError('');
  };

  const udateUserHandler = async () => {
    cleanAlerts();
    setWaiting(true);
    const newContactsState = state.contacts.map(contact => {
      if (contact._id === formData._id) {
        return formData;
      }
      return contact;
    });
    await dispatch({ type: 'SET_CONTACTS', payload: newContactsState });
    onUpdate();
  };

  return (
    <div className="content-center h-auto w-screen">
      <div className="overflow-y-auto w-full">
        <div className="p-4 bg-blue-900">
          <span className="text-xl shadow-2xl text-white font-medium">
            Update contact
          </span>
        </div>
        <CustomInput
          label="Name"
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          type="text"
          placeholder="Carl"
          value={formData.name}
        />
        <CustomInput
          label="Lastname"
          onChange={e => setFormData({ ...formData, lastname: e.target.value })}
          type="text"
          placeholder="Sagan"
          value={formData.lastname}
        />
        <CustomInput
          label="Phone"
          onChange={e => setFormData({ ...formData, phone: e.target.value })}
          type="text"
          placeholder="+5980991234567"
          value={formData.phone}
        />
        <div className="flex justify-center p-2">
          <CustomButton
            bgColor={!waiting ? 'blue' : 'gray'}
            text="Save contact"
            waiting={waiting}
            onClickHandler={!waiting ? () => udateUserHandler() : () => {}}
          />
        </div>
        <div className="p-2">
          <p className="text-center text-red-500">{error}</p>
          <p className="text-center text-green-500">{success}</p>
        </div>
      </div>
    </div>
  );
};

UpdateContact.propTypes = {
  selectedContact: PropTypes.object,
  onUpdate: PropTypes.func,
};

export default UpdateContact;
