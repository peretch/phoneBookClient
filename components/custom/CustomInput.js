import React from 'react';
import PropTypes from 'prop-types';

const CustomInput = ({ type = 'text', placeholder, onChange }) => (
  <input
    type={type}
    className="w-full rounded-lg p-2 bg-white text-sm m-1 hover:border-blue-600 border-2 focus:outline-none"
    placeholder={placeholder}
    onChange={onChange}
  />
);

CustomInput.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default CustomInput;
