import React, { useContext } from 'react';

import CustomInput from '../custom/CustomInput';
import { Context } from '../../store/Store';
import { contactSearch } from '../../store/Actions';

const Searchbar = () => {
  const [state, dispatch] = useContext(Context);

  const handleInputChange = e => {
    contactSearch(dispatch, {
      input: e.target.value,
      page: state.contactsCurrentPage,
    });
  };

  return (
    <div>
      <CustomInput
        label=""
        type="text"
        placeholder="Search contact"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Searchbar;
