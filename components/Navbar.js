import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';

const { getCredentials, clearCredentials } = require('../lib/auth');

const Navbar = ({ handleIndex }) => {
  const [menuActive, setMenuActive] = useState(false);
  const [userToken, setUserToken] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const { token } = getCredentials();
    setUserToken(token);
  }, []);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <nav className="w-full flex items-center justify-between flex-wrap px-6 py-4 bg-gray-900">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <button
          type="button"
          onClick={() => handleIndex()}
          tabIndex={0}
          className="focus:outline-none"
        >
          Phone book
          <span className="font-semibold text-xl tracking-tight" />
        </button>
      </div>
      <div className="block md:hidden">
        <button
          type="button"
          className="flex items-center px-3 py-2 border rounded text-gray-100 hover:text-white hover:border-white focus:outline-none"
          onClick={() => toggleMenu()}
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow md:flex md:items-center md:w-auto sm:py-0 text-center sm:text-justify bg-gray-900 sm:bg-gray-900">
        <div
          className={`text-sm md:flex-grow ${menuActive === false &&
            'hidden'} md:block`}
        >
          {userToken ? (
            <button
              type="button"
              tabIndex={0}
              onKeyPress={() => {}}
              onClick={async () => {
                await clearCredentials();
                router.push('/login');
              }}
              className="block sm:invisible mt-4 md:inline-block md:mt-0 text-gray-200 mr-4 text-base hover:text-blue-200 hover:shadow-xl px-6 sm:px-2"
            >
              Logout
            </button>
          ) : (
            <Link
              className="block sm:invisible mt-4 md:inline-block md:mt-0 text-gray-200 mr-4 text-base hover:text-blue-200 hover:shadow-xl px-6 sm:px-2"
              href="/login"
            >
              Login
            </Link>
          )}
        </div>
        <div>
          {userToken ? (
            <button
              type="button"
              onClick={() => {
                clearCredentials();
                router.push('/login');
              }}
              tabIndex={0}
              className="hidden sm:inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 md:mt-0"
            >
              Logout
            </button>
          ) : (
            <Link href="/login">
              <a className="hidden sm:inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 md:mt-0">
                Login
              </a>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  handleIndex: PropTypes.func,
};

export default Navbar;
