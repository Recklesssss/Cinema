const userDatas = (state = [],action)=>{
    switch (action.type) {
        case 'logged':
            return [...state,action.data]
        default:
            return state;
    }
}
export default userDatas;