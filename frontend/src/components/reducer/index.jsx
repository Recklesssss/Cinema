import {combineReducers} from 'redux';
import isLogged from './isLogged';
import userDatas from './user_data';
import user from './user';
import participantReducer from './counter_paricipant';

const allReducers = combineReducers({
    isLogged:isLogged,
    userDatas:userDatas,
    user:user,
    participantReducer:participantReducer
})

export default allReducers;