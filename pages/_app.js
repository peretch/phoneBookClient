/* eslint-disable react/jsx-props-no-spreading */
import Head from 'next/head';
import PropTypes from 'prop-types';
import Store from '../store/Store';

function App({ Component, pageProps }) {
  return (
    <Store>
      <Head>
        <title>Phone book app</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="/css/tailwind.css" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </Store>
  );
}

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};

Store.propTypes = {
  children: PropTypes.array,
};

export default App;
