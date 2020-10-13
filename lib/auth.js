const getCredentials = () => {
  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');
  return { email, token };
};

const clearCredentials = () => {
  localStorage.removeItem('email');
  localStorage.removeItem('token');
};

const setCredentials = async ({ email, token }) => {
  await clearCredentials();
  localStorage.setItem('email', email);
  localStorage.setItem('token', token);
};

module.exports = {
  getCredentials,
  setCredentials,
  clearCredentials,
};
