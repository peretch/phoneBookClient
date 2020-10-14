import React, { useContext, useEffect } from 'react';

import CustomInput from '../custom/CustomInput';
import { Context } from '../../store/Store';
import { contactSearch } from '../../store/Actions';

const Searchbar = () => {
  const [state, dispatch] = useContext(Context);

  const handleInputChange = e => {
    contactSearch(dispatch, {
      currentContacts: state.contacts,
      search: e.target.value,
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
