const getCredentials = () => {
  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');
  return { email, token };
};

const setCredentials = ({ email, token }) => {
  localStorage.setItem('email', email);
  localStorage.setItem('token', token);
};

const clearCredentials = () => {
  localStorage.removeItem('email');
  localStorage.removeItem('token');
};

module.exports = {
  getCredentials,
  setCredentials,
  clearCredentials,
};
