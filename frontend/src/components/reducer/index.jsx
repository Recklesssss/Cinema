import {combineReducers} from 'redux';
import isLogged from './isLogged';
import userDatas from './user_data';
import user from './user';

const allReducers = combineReducers({
    isLogged:isLogged,
    userDatas:userDatas,
    user:user,
})

export default allReducers;