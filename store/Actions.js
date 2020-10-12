const setExampleValue = async (dispatch, exampleValue) => {
  dispatch({
    type: 'SET_EXAMPLE_VALUE',
    payload: exampleValue,
  });
};

module.exports = { setExampleValue };
