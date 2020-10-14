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

const contactSearch = async (
  dispatch,
  { currentContacts, search, onlineSearch = false }
) => {
  dispatch({
    type: 'SET_SEARCH',
    search,
  });

  if (onlineSearch) {
    const { token } = await getCredentials();
    const { status, data } = await getContacts({
      token,
      search,
    });
    if (status === 200) {
      dispatch({ type: 'SET_FILTERED_CONTACTS', payload: data });
    }
    return true;
  }

  console.log({ currentContacts });
  if (currentContacts) {
    const contacts = await currentContacts.filter(
      contact =>
        contact.name.toUpperCase().includes(search.toUpperCase()) ||
        contact.lastname.toUpperCase().includes(search.toUpperCase()) ||
        `${contact.name.toUpperCase()} ${contact.lastname.toUpperCase()}`.includes(
          search.toUpperCase()
        )
    );
    contacts.sort((a, b) => (a.name > b.name ? 1 : -1));
    await dispatch({ type: 'SET_FILTERED_CONTACTS', payload: contacts });
  }
  return true;
};

module.exports = { contactSearch, userLogin };
