import { BASE_URL, API_PATH } from './constants';

const axios = require('axios');

const baseURL = `${BASE_URL}${API_PATH}`;
const { getCredentials } = require('./auth');

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

const getContacts = async ({ token, page }) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
  try {
    const { status, data } = await axios.get(`${baseURL}/contacts`, {
      headers,
      params: {
        page,
      },
    });

    return { status, data };
  } catch (error) {
    return {
      status: error.response.status,
      data: error.response.data,
    };
  }
};

module.exports = {
  login,
  getContacts,
};
