const Reducer = (state, action) => {
  switch (action.type) {
    case 'SET_EXAMPLE_VALUE':
      return {
        ...state,
        example: action.payload,
      };

    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      };

    case 'SET_CONTACTS_SEARCH':
      return {
        ...state,
        contactsSearch: action.payload,
      };

    case 'SET_CONTACTS':
      return {
        ...state,
        contacts: action.payload,
      };

    case 'SET_CONTACTS_CURRENT_PAGE':
      return {
        ...state,
        contactsCurrentPage: action.payload,
      };

    case 'SET_CONTACTS_TOTAL':
      return {
        ...state,
        contactsTotal: action.payload,
      };

    case 'SET_CONTACTS_PAGES':
      return {
        ...state,
        contactsPages: action.payload,
      };

    default:
      return state;
  }
};

export default Reducer;
