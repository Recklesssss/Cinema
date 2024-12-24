const userDatas = (state = [],action)=>{
    switch (action.type) {
        case 'count':
            return [...state,action.data]
        default:
            return state;
    }
}
export default userDatas;