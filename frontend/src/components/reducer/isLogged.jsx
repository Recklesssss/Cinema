const isLogged = (state = false, action)=>{
    switch (action.type) {
        case 'logged':
            return !state;
        default:
            return false
    }
}
export default isLogged;