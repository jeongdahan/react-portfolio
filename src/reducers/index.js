import member from './member';
import board from './board';
import { combineReducers } from 'redux';

export default combineReducers({
    member,
    board
});
