import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Context } from '../../store/Store';

import Navbar from '../../components/Navbar';
import CustomInput from '../../components/custom/CustomInput';
import CustomButton from '../../components/custom/CustomButton';

const { getCredentials } = require('../../lib/auth');
const { createContact } = require('../../lib/api');

const Contact = () => {
  const [state, dispatch] = useContext(Context);
  const router = useRouter();

  const [waiting, setWaiting] = useState(false);
  const [formData, setFormData] = useState({
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
      name: `${name} ${lastname}`,
      phone,
    });
    setWaiting(false);

    switch (status) {
      case 201:
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
    <div className="content-center h-auto w-full">
      <Navbar />
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
        placeholder="Sagan"
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
  );
};

export default Contact;
