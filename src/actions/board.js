import {
    BOARD_POST,
    BOARD_POST_SUCCESS,
    BOARD_POST_FAIL,
    BOARD_LIST,
    BOARD_LIST_SUCCESS,
    BOARD_LIST_FAIL,
    BOARD_EDIT,
    BOARD_EDIT_SUCCESS,
    BOARD_EDIT_FAIL,
    BOARD_REMOVE,
    BOARD_REMOVE_SUCCESS,
    BOARD_REMOVE_FAIL
} from './ActionTypes';

import axios from 'axios';

const server = 'http://0.0.0.0:4000';

// BOARD POST
export function boardPostRequest(contents){
    return (dispatch) => {
        // API 실행
        dispatch(boardPost());

        return axios.post( server + '/api/board', { contents } )
        .then( (res) => {
            dispatch(boardPostSuccess());
        } )
        .catch( (err) => {
            dispatch(boardPostFail(err.response.data.code));
        } );
    }
}

export function boardPost(){
    return {
        type: BOARD_POST
    }
}

export function boardPostSuccess(){
    return {
        type: BOARD_POST_SUCCESS
    }
}

export function boardPostFail(error){
    return {
        type: BOARD_POST_FAIL,
        error
    }
}

// BOARD LIST

/*
    Parameter:
        - init: 초기로드 여부
        - listType:  OPTIONAL; 이전메모 또는 새메모로드
        - id:        OPTIONAL;
        - username:  OPTIONAL;
*/
export function boardListRequest(init, listType, id, username) {
    return (dispatch) => {
        dispatch(boardList());

        let url = '/api/board';

        if(typeof username === 'undefined'){
            url = init ? url : url + "/" +listType + "/" + id;
        }else {
            url = init ? url + "/" +username : url + "/" + username + "/" + listType + "/" + id;
        }

        return axios.get( server + url )
               .then( (res) => {
                   dispatch(boardListSuccess(res.data, init, listType));
               } )
               .catch( (err) => {
                   dispatch(boardListFail());
               } );
    };
}

export function boardList() {
    return {
        type: BOARD_LIST
    };
}

export function boardListSuccess(data, init, listType) {
    return {
        type: BOARD_LIST_SUCCESS,
        data,
        init,
        listType
    };
}

export function boardListFail() {
    return {
        type: BOARD_LIST_FAIL
    };
}

// BOARD EDIT`

export function boardEditRequest(id, index, contents) {
    return (dispatch) => {
        dispatch(boardEdit());

        return axios.put( server + '/api/board/' + id, { contents })
        .then((response) => {
            dispatch(boardEditSuccess(index, response.data.board));
        }).catch((error) => {
            dispatch(boardEditFailure(error.response.data.code));
        });
    };
}

export function boardEdit() {
    return {
        type: BOARD_EDIT
    };
}

export function boardEditSuccess(index, board) {
    return {
        type: BOARD_EDIT_SUCCESS,
        index,
        board
    };
}

export function boardEditFailure(error) {
    return {
        type: BOARD_EDIT_FAIL,
        error
    };
}

// BOARD REMOVE

export function boardRemoveRequest(id, index){
    return (dispatch) => {
        dispatch(boardRemove());

        return axios.delete( server + '/api/board/' + id)
        .then((response) => {
            dispatch(boardRemoveSuccess(index));
        }).catch((error) => {
            dispatch(boardRemoveFail(error.response.data.code));
        });
    }
}

export function boardRemove(){
    return {
        type: BOARD_REMOVE
    }
}

export function boardRemoveSuccess(index){
    return {
        type: BOARD_REMOVE_SUCCESS,
        index
    }
}

export function boardRemoveFail(error){
    return {
        type: BOARD_REMOVE_FAIL,
        error
    }
}
