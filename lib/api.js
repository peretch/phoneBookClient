import { BASE_URL, API_PATH } from './constants';

const axios = require('axios');

const baseURL = `${BASE_URL}${API_PATH}`;

const register = async ({ email, password }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    email,
    password,
  };
  try {
    const { status, data } = await axios.post(`${baseURL}/users`, body, {
      headers,
    });

    return { status, data };
  } catch (error) {
    return {
      status: error.response.status,
      data: error.response.data,
    };
  }
};

const login = async ({ email, password }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    email,
    password,
  };
  try {
    const { status, data } = await axios.post(`${baseURL}/sessions`, body, {
      headers,
    });

    return { status, data };
  } catch (error) {
    return {
      status: error.response.status,
      data: error.response.data,
    };
  }
};

const recovery = async ({ email }) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const body = {
    email,
  };
  try {
    const { status, data } = await axios.post(
      `${baseURL}/users/recovery`,
      body,
      {
        headers,
      }
    );

    return { status, data };
  } catch (error) {
    return {
      status: error.response.status,
      data: error.response.data,
    };
  }
};

const getContacts = async ({ token, search }) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const params = {
    name: search,
  };

  try {
    const { status, data } = await axios.get(`${baseURL}/contacts`, {
      headers,
      params,
    });

    return { status, data };
  } catch (error) {
    return {
      status: error.response.status,
      data: error.response.data,
    };
  }
};

const getContact = async ({ token, contactId }) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  try {
    const { status, data } = await axios.get(
      `${baseURL}/contacts/${contactId}`,
      {
        headers,
      }
    );

    return { status, data };
  } catch (error) {
    return {
      status: error.response.status,
      data: error.response.data,
    };
  }
};

const createContact = async ({ token, name, lastname, phone }) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  const body = {
    name,
    lastname,
    phone,
  };
  try {
    const { status, data } = await axios.post(`${baseURL}/contacts`, body, {
      headers,
    });

    return { status, data };
  } catch (error) {
    return {
      status: error.response.status,
      data: error.response.data,
    };
  }
};

const deleteContact = async ({ token, contactId }) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  try {
    const { status, data } = await axios.delete(
      `${baseURL}/contacts/${contactId}`,
      {
        headers,
      }
    );

    return { status, data };
  } catch (error) {
    return {
      status: error.response.status,
      data: error.response.data,
    };
  }
};

module.exports = {
  register,
  login,
  recovery,
  getContacts,
  getContact,
  createContact,
  deleteContact,
};
