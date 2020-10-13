import React from 'react';
import PropTypes from 'prop-types';

const NavbarLink = ({ href, text }) => (
  <a
    href={href}
    className="block mt-4 md:inline-block md:mt-0 text-gray-200 mr-4 text-base hover:text-blue-200 hover:shadow-xl px-6 sm:px-2"
  >
    {text}
  </a>
);

NavbarLink.propTypes = {
  href: PropTypes.string,
  text: PropTypes.string,
};

export default NavbarLink;
