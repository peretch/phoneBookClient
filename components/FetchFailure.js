import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CustomButton from './custom/CustomButton';

const FetchFailure = ({ reload }) => {
  const [waiting, setWaiting] = useState(false);
  return (
    <div className="mt-20 p-4">
      <p className="text-red-500 text-lg">Failed to get content</p>
      <CustomButton
        bgColor={!waiting ? 'blue' : 'gray'}
        text="Save contact"
        waiting={waiting}
        onClickHandler={
          !waiting
            ? async () => {
                setWaiting(true);
                await reload();
                setWaiting(false);
              }
            : () => {}
        }
      />
    </div>
  );
};

FetchFailure.propTypes = {
  reload: PropTypes.func,
};

export default FetchFailure;
