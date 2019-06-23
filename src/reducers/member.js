import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

let initState = {
    login: {
        status: 'INIT'
    },
    status: {
        isSession: false,
        isLogin: false,
        currentUser: ''
    },
    register: {
        status: 'INIT',
        error: -1
    }
}

export default function member(state, action){
    if(typeof state === "undefined"){
        state = initState;
    }

    switch(action.type){
        // LOGIN
        case types.LOGIN:
            return update(state, {
                login: {
                    status: { $set: 'WARNING' }
                }
            });

        case types.LOGIN_SUCCESS:
            return update(state, {
                login: {
                    status: { $set: 'SUCCESS' }
                },
                status: {
                    isLogin: { $set: true },
                    currentUser: { $set: action.username }
                }
            });

        case types.LOGIN_FAIL:
            return update(state, {
                login: {
                    status: { $set: 'FAIL' }
                }
            });

        // REGISTER
        case types.REGISTER:
            return update(state, {
                register: {
                    status: { $set: 'SUCCESS' },
                    error: { $set: -1 }
                }
            });

        case types.REGISTER_SUCCESS:
            return update(state, {
                register: {
                    status: { $set: 'SUCCESS' }
                }
            });

        case types.REGISTER_FAIL:
            return update(state, {
                register: {
                    status: { $set: 'FAIL' },
                    error: { $set: action.error }
                }
            });

        // Get Info
        case types.GET_INFO:
            return update(state, {
                status: {
                    isLogin: { $set: true }
                }
            });

        case types.GET_INFO_SUCCESS:
            return update(state, {
                status: {
                    isSession: { $set: true },
                    currentUser: { $set: action.username }
                }
            });

        case types.GET_INFO_FAIL:
            return update(state, {
                status: {
                    isLogin: { $set: false },
                    isSession: { $set: false }
                }
            });

        // LOGOUT
        case types.LOGOUT:
            return update(state, {
                status: {
                    isLogin: { $set: false },
                    isSession: { $set: false },
                    currentUser: { $set: '' }
                }
            });

        default:
            return state;
    }
}
