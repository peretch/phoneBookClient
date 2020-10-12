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

    default:
      return state;
  }
};

export default Reducer;
