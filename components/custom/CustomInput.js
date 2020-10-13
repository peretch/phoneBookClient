import React from 'react';
import PropTypes from 'prop-types';

const CustomInput = ({
  label,
  type = 'text',
  placeholder,
  onChange,
  value,
}) => (
  <div className="w-full px-2 py-1">
    {true && (
      <label className="text-gray-600 font-medium" htmlFor={label}>
        {label}
        <input
          id={label}
          type={type}
          className="w-full rounded-lg p-2 bg-white text-sm hover:border-blue-600 border-2 focus:outline-none"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      </label>
    )}
  </div>
);

CustomInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

export default CustomInput;
