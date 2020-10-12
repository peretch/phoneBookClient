import React from 'react';
import PropTypes from 'prop-types';

const CustomButton = ({ text, bgColor, onClickHandler, waiting }) => (
  <button
    type="submit"
    tabIndex="0"
    onKeyPress={onClickHandler}
    onClick={onClickHandler}
    className={`w-full py-2 bg-${bgColor}-800 text-white text-xl rounded-lg m-1 focus:outline-none`}
  >
    {!waiting ? (
      text
    ) : (
      <div className="flex justify-center">
        <svg
          className="animate-spin -ml-1 mr-3 stext-white h-8 w-8"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    )}
  </button>
);

CustomButton.propTypes = {
  text: PropTypes.string,
  bgColor: PropTypes.string,
  waiting: PropTypes.bool,
  onClickHandler: PropTypes.func,
};

export default CustomButton;
