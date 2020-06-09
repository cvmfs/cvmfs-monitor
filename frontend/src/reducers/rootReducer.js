var initState = {
  isFetching: true,
  repositories: {}
};

const rootReducer = (state = initState, action) => {
  if (action.type === 'RECEIVE_REPOLIST') {
    return {
      isFetching: false,
      repositories: action.repolist
    };
  }
  return state;
};

export default rootReducer;
