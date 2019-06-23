import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

let initState = {
    post: {
        status: 'INIT',
        error: -1
    },
    list: {
        status: 'INIT',
        data: [],
        isLast: false
    },
    edit: {
        status: 'INIT',
        error: -1,
    },
    remove: {
        status: 'INIT',
        error: -1
    }
}

export default function board( state, action ){
    if( typeof state === 'undefined' ){
        state = initState;
    }

    switch(action.type){
        // BOARD POST
        case types.BOARD_POST:
            return update(state, {
                post: {
                    status: { $set: 'WARNING' },
                    error: { $set: -1 }
                }
            });

        case types.BOARD_POST_SUCCESS:
            return update(state, {
                post: {
                    status: { $set: 'SUCCESS' }
                }
            });

        case types.BOARD_POST_FAIL:
            return update(state, {
                post: {
                    status: { $set: 'FAIL' },
                    error: { $set: action.error }
                }
            });

        // BOARD LIST

        case types.BOARD_LIST:
            return update(state, {
                list: {
                    status: { $set: 'WARNING' }
                }
            });

        case types.BOARD_LIST_SUCCESS:
            if(action.init) {
                return update(state, {
                    list: {
                        status: { $set: 'SUCCESS' },
                        data: { $set: action.data },
                        isLast: { $set: action.data.length < 6 }
                    }
                })
            }else{
                if(action.listType === 'new') {
                    return update(state, {
                        list: {
                            status: { $set: 'SUCCESS' },
                            data: { $unshift: action.data },
                        }
                    });
                } else {
                    return update(state, {
                        list: {
                            status: { $set: 'SUCCESS' },
                            data: { $push: action.data },
                            isLast: { $set: action.data.length < 6 }
                        }
                    });
                }
            }

        case types.BOARD_LIST_FAIL:
            return update(state, {
                list: {
                    status: { $set: 'FAILURE' }
                }
            });

        case types.BOARD_EDIT:
            return update(state, {
                edit: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 },
                    board: { $set: undefined }
                }
            });
        case types.BOARD_EDIT_SUCCESS:
            return update(state, {
                edit: {
                    status: { $set: 'SUCCESS' },
                },
                list: {
                    data: {
                        [action.index]: { $set: action.board }
                    }
                }
            });
        case types.BOARD_EDIT_FAIL:
            return update(state, {
                edit: {
                    status: { $set: 'FAIL' },
                    error: { $set: action.error }
                }
            });

        /* BOARD REMOVE */
        case types.BOARD_REMOVE:
            return update(state, {
                remove: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 }
                }
            });
        case types.BOARD_REMOVE_SUCCESS:
            return update(state, {
                remove:{
                    status: { $set: 'SUCCESS' }
                },
                list: {
                    data: { $splice: [[action.index, 1]] }
                }
            });
        case types.BOARD_REMOVE_FAIL:
            return update(state, {
                remove: {
                    status: { $set: 'FAIL' },
                    error: { $set: action.error }
                }
            });

        default:
            return state;
    }
}
