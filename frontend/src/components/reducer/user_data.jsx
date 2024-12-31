const userDatas = (state = {}, action) => {
  switch (action.type) {
    case 'setUserData':
      return {
        name: action.name,
        profile: action.profile,
        userId: action.userId,
      };
    default:
      return state;
  }
};

export default userDatas;
