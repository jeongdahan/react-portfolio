import {
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    GET_INFO,
    GET_INFO_SUCCESS,
    GET_INFO_FAIL,
    LOGOUT
} from './ActionTypes';

import axios from 'axios';

const server = 'http://0.0.0.0:4000';

/* LOGIN */

export function loginRequest( username, password ){
    return (dispatch) => {
        // 로그인 API 시작
        dispatch(login());

        // API 요청
        return axios.post( server + '/api/member/signin', { username, password } )
        .then( (res) => {
            // 성공
            dispatch(loginSuccess(username));
        } )
        .catch( (err) => {
            // 실패
            dispatch(loginFail());
        } );
    }
}

export function login(){
    return {
        type: LOGIN
    }
}

export function loginSuccess(username){
    return {
        type: LOGIN_SUCCESS,
        username
    }
}

export function loginFail(){
    return {
        type: LOGIN_FAIL
    }
}

/* REGISTER */

export function registerRequest( username, password ){
    return (dispatch) => {
        // 회원가입 API 시작
        dispatch(register());

        return axios.post( server + '/api/member/signup', { username, password } )
        .then( (res) => {
            // 성공
            dispatch(registerSuccess());
        } )
        .catch( (err) => {
            // 실패
            dispatch(registerFail(err.response.data.code));
        } )
    }
}

export function register(){
    return {
        type: REGISTER
    }
}

export function registerSuccess( username, password ){
    return {
        type: REGISTER_SUCCESS,
        username,
        password
    }
}

export function registerFail(error){
    return {
        type: REGISTER_FAIL,
        error
    }
}

/* GET INFO */

export function getInfoRequest(){
    return (dispatch) => {
        dispatch(getInfo());

        return axios.get( server + '/api/member/getinfo' )
        .then( (res) => {
            dispatch(getInfoSuccess(res.data.info.username));
        } )
        .catch( (err) => {
            dispatch(getInfoFail());
        } )
    }
}

export function getInfo(){
    return {
        type: GET_INFO
    }
}

export function getInfoSuccess(username){
    return {
        type: GET_INFO_SUCCESS,
        username
    }
}

export function getInfoFail(){
    return {
        type: GET_INFO_FAIL
    }
}

/* LOGOUT */

export function logoutRequest(){
    return (dispatch) => {
        return axios.post( server + '/api/member/logout' )
        .then( () => {
            dispatch(logout());
        } );
    }
}

export function logout(){
    return {
        type: LOGOUT
    }
}
