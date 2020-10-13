import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import Reducer from './Reducer';

const initialState = {
  token: null,
  contacts: [],
  contactsCurrentPage: 1,
  contactsTotal: 0,
  contactsPages: 0,
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

Store.propTypes = {
  children: PropTypes.object,
};

export const Context = createContext(initialState);

export default Store;
