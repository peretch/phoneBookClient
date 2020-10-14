import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Context } from '../store/Store';
import { userLogin, contactSearch } from '../store/Actions';

import CustomButton from '../components/custom/CustomButton';
import CustomInput from '../components/custom/CustomInput';
import CustomLink from '../components/custom/CustomLink';

const { login } = require('../lib/api');
const { setCredentials, getCredentials } = require('../lib/auth');

const Login = () => {
  const [state, dispatch] = useContext(Context);
  const router = useRouter();

  const [waiting, setWaiting] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const checkCredentials = async () => {
    const { email, token } = await getCredentials();
    if (token !== null) {
      router.push('/');
    }
  };

  // useEffect(() => {
  //   checkCredentials();
  // }, []);

  const loginHandler = async () => {
    setError('');
    setWaiting(true);
    const { email, password } = formData;
    const { status, data } = await userLogin(dispatch, { email, password });
    await contactSearch(dispatch, {});
    setWaiting(false);

    switch (status) {
      case 200:
        await setCredentials({ email: data.email, token: data.token });
        router.push('/');
        break;
      case 401:
        setError('Invalid credentials');
        break;
      case 500:
        setError('A server error has ocurred');
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex justify-center">
      <div className=" content-center h-auto w-screen sm:w-1/2 xl:w-1/3 mt-10">
        <h1 className="text-center py-10 text-2xl">Login</h1>
        <CustomInput
          label="Email"
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          type="text"
          placeholder="example@mail.com"
          value={formData.email}
        />
        <CustomInput
          label="Password"
          onChange={e => setFormData({ ...formData, password: e.target.value })}
          type="password"
          placeholder="4asdX@wz1"
          value={formData.password}
        />
        <div className="flex justify-center p-2">
          <CustomButton
            bgColor={!waiting ? 'blue' : 'gray'}
            text="Login"
            waiting={waiting}
            onClickHandler={!waiting ? () => loginHandler() : () => {}}
          />
        </div>
        <div className="text-center mt-2">
          <CustomLink href="/register" color="blue" text="Register" />
        </div>
        <p className="text-center text-red-500 text-md py-2">{error}</p>
      </div>
    </div>
  );
};

export default Login;
