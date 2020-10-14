import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { Context } from '../../store/Store';

import CustomInput from '../custom/CustomInput';
import CustomButton from '../custom/CustomButton';

const { getCredentials } = require('../../lib/auth');
const { createContact } = require('../../lib/api');

const CreateContact = () => {
  const [state, dispatch] = useContext(Context);
  const router = useRouter();

  const [waiting, setWaiting] = useState(false);
  const [formData, setFormData] = useState({
    _id: '',
    name: '',
    lastname: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const checkCredentials = async () => {
    const { token } = await getCredentials();
    if (token === null) {
      router.push('/login');
    }
  };

  const cleanForm = () => {
    setFormData({
      name: '',
      lastname: '',
      phone: '',
    });
  };

  const cleanAlerts = () => {
    setSuccess('');
    setError('');
  };

  const createUserHandler = async () => {
    cleanAlerts();
    setWaiting(true);
    const { name, lastname, phone } = await formData;
    const { token } = await getCredentials();
    const { status, data } = await createContact({
      token,
      name,
      lastname,
      phone,
    });
    setWaiting(false);

    if (status === 202) {
      const newContact = {
        _id: data._id,
        name,
        lastname,
        phone,
      };
      const clone = await state.contacts.map(contact => contact);
      await clone.push(newContact);
      await dispatch({
        type: 'SET_CONTACTS',
        payload: clone,
      });
      dispatch({ type: 'SET_FILTERED_CONTACTS', payload: clone });
    }

    switch (status) {
      case 202:
        await setSuccess('New contact created');
        cleanForm();
        break;
      case 400:
        setError(data.message);
        break;
      case 500:
        setError('A server error has ocurred');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    checkCredentials();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="content-center h-auto w-screen">
      <div className="overflow-y-auto w-full">
        <div className="p-4 bg-blue-900">
          <span className="text-xl shadow-2xl text-white font-medium">
            Create contact
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
            onClickHandler={!waiting ? () => createUserHandler() : () => {}}
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

export default CreateContact;
