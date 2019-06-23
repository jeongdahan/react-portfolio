import React, { Component } from 'react';
import { Member, Alert } from '../components';
import { connect } from 'react-redux';
import { registerRequest } from '../actions/member';

class Register extends Component {
    handleRegister = (id, pw) => {
        return this.props.registerRequest( id, pw )
               .then(
                   () => {
                       if(this.props.status === "SUCCESS"){
                           this.props.history.push('/login');

                           window.$('#react-alert .text').text("회원가입 성공");
                           window.$('#react-alert').show();

                           return true;
                       }else{
                           /*
                            에러코드:
                                1: 아이디 확인
                                2: 패스워드 확인
                                3: 아이디 존재
                           */

                           let errorMessage = [
                            '아이디 확인',
                            '패스워드 확인',
                            '아이디 존재'
                           ];

                           window.$('#react-alert .text').text(errorMessage[this.props.error-1] + "으로 인해 회원가입 실패");
                           window.$('#react-alert').show();

                           return false;
                       }
                   }
               );
    }

    render() {
        return(
            <div>
                <Member mode={false}
                        onRegister={this.handleRegister}
                />

                <Alert />

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.member.register.status,
        error: state.member.register.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        registerRequest: ( id, pw ) => {
            return dispatch(registerRequest( id, pw ));
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(Register);
