import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Context } from '../store/Store';

import CustomButton from '../components/custom/CustomButton';
import CustomInput from '../components/custom/CustomInput';
import CustomLink from '../components/custom/CustomLink';

const { recovery } = require('../lib/api');
const { setCredentials, getCredentials } = require('../lib/auth');

const Recovery = () => {
  const router = useRouter();

  const [waiting, setWaiting] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const checkCredentials = async () => {
    const { email, token } = await getCredentials();
    if (token !== null) {
      router.push('/');
    }
  };

  useEffect(() => {
    checkCredentials();
  }, []);

  const cleanForm = () => {
    setFormData({
      email: '',
      password: '',
      passwordConfirm: '',
    });
  };

  const cleanAlerts = () => {
    setSuccess('');
    setError('');
  };

  const handleRecovery = async () => {
    cleanAlerts();
    const { email, password, passwordConfirm } = formData;
    setError('');
    setWaiting(true);

    if (password !== passwordConfirm) {
      setError('Passwords do not match');
      setWaiting(false);
      return;
    }

    const { status, data } = await recovery({ email });
    setWaiting(false);

    if (status === 500) {
      setError('Server error');
    }

    setSuccess('Search in your email');
  };

  return (
    <div className="flex justify-center">
      <div className=" content-center h-auto w-screen sm:w-1/2 xl:w-1/3 mt-10">
        <h1 className="text-center py-10 text-2xl">Password recovery</h1>
        <CustomInput
          label="Email"
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          type="text"
          placeholder="example@mail.com"
          value={formData.email}
        />
        <div className="flex justify-center p-2">
          <CustomButton
            bgColor={!waiting ? 'blue' : 'gray'}
            text="Send by email"
            waiting={waiting}
            onClickHandler={!waiting ? () => handleRecovery() : () => {}}
          />
        </div>
        <div className="text-center mt-2">
          <CustomLink href="/login" color="blue" text="Login" />
        </div>
        <div className="p-2">
          <p className="text-center text-red-500">{error}</p>
          <p className="text-center text-green-500">{success}</p>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
