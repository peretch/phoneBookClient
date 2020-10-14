const { getContacts, login } = require('../lib/api');
const { getCredentials, setCredentials } = require('../lib/auth');

const userLogin = async (dispatch, payload) => {
  const { email, password } = payload;
  const { status, data } = await login({ email, password });

  if (status === 200) {
    await setCredentials({ email: data.email, token: data.token });
  }
  return { status, data };
};

const contactSearch = async (dispatch, payload) => {
  const { token } = await getCredentials();
  const { input: search, page: currentPage } = payload;

  const { status, data } = await getContacts({
    token,
    page: currentPage,
    search,
  });

  if (status === 200) {
    const { contacts, totalContacts, totalPages, page } = data;
    dispatch({ type: 'SET_CONTACTS_SEARCH', payload: search });
    dispatch({ type: 'SET_CONTACTS', payload: contacts });
    dispatch({ type: 'SET_CONTACTS_CURRENT_PAGE', payload: page });
    dispatch({ type: 'SET_CONTACTS_TOTAL', payload: totalContacts });
    dispatch({ type: 'SET_CONTACTS_PAGES', payload: totalPages });
  }

  dispatch({
    type: 'SET_SEARCH',
    payload: search,
  });
};

module.exports = { contactSearch, userLogin };
