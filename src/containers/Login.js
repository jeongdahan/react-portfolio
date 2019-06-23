import React, { Component } from 'react';
import { Member, Alert } from '../components'
import { connect } from 'react-redux';
import { loginRequest } from '../actions/member';

class Login extends Component {
    handleLogin = (id, pw) => {
        return this.props.loginRequest( id, pw )
               .then(
                   () => {
                       if(this.props.status === "SUCCESS"){
                           // 세션 데이터 생성
                           let loginData = {
                               isLogin: true,
                               username: id
                           }

                           document.cookie = 'key=' + btoa(JSON.stringify(loginData));

                           window.location.href = "/home";

                           return true;
                       }else{
                           window.$('#react-alert .text').text("로그인 실패");
                           window.$('#react-alert').show();

                           return false;
                       }
                   }
               );
    }

    render() {
        return(
            <div>
                <Member mode={true}
                        onLogin={this.handleLogin}
                />
                
                <Alert />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.member.login.status
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (id, pw) => {
            return dispatch(loginRequest( id, pw ));
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(Login);
