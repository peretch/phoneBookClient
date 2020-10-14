const { getContacts } = require('../lib/api');
const { getCredentials } = require('../lib/auth');

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

module.exports = { contactSearch };
