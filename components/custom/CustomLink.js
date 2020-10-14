import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const CustomLink = ({ text, color, href }) => (
  <Link href={href}>
    <a className={`w-full py-2 text-${color}-500 rounded-lg m-1`}>{text}</a>
  </Link>
);

CustomLink.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  href: PropTypes.string,
};

export default CustomLink;
