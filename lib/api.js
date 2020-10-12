import { BASE_URL, API_PATH } from './constants';

const axios = require('axios');

const baseURL = `${BASE_URL}${API_PATH}`;

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

    if (status === 200) {
      return { status, data };
    }

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
};
