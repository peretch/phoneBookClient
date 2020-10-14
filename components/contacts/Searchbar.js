import React, { useContext, useState } from 'react';

import CustomInput from '../custom/CustomInput';
import { Context } from '../../store/Store';
import { contactSearch } from '../../store/Actions';

const Searchbar = () => {
  const [state, dispatch] = useContext(Context);
  const [onlineSearch, setOnlineSearch] = useState(false);

  const handleInputChange = e => {
    contactSearch(dispatch, {
      currentContacts: state.contacts,
      search: e.target.value,
      onlineSearch,
    });
  };

  return (
    <div className="grid grid-cols-3">
      <div className="col-span-2 px-2">
        <CustomInput
          label=""
          type="text"
          placeholder="Search contact"
          onChange={handleInputChange}
        />
      </div>
      <div className="flex justify-center px-2">
        <label className="sm:py-3 text-center" htmlFor="online">
          Online search{' '}
          <input
            id="online"
            className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            type="checkbox"
            onChange={e => {
              setOnlineSearch(e.target.checked);
            }}
          />
        </label>
      </div>
    </div>
  );
};

export default Searchbar;
