const userDatas = (state = {}, action) => {
    switch (action.type) {
      case 'setUserData':
        return {
          ...state,
          [action.name]: {
            name: action.name,
            profile: action.profile,
          },
        };
  
      default:
        return state;
    }
  };
  
  export default userDatas;
  