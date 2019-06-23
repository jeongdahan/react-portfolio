import React, { Component } from 'react';

import Header from '../components/Header';
import { getInfoRequest, logoutRequest } from '../actions/member';
import { connect } from 'react-redux';

class App extends Component {
    componentDidMount(){
        this.props.getInfoRequest().then(
            () => {
                console.log(this.props.status);
            }
        );
    }

    handleLogout = () => {
        this.props.logoutRequest().then(
            () => {
                console.log(this.props.status);
                window.$('#react-alert .text').text("로그아웃을 하였습니다");
                window.$('#react-alert').show();
            }
        );
    }

    render() {
        return(
            <div>
                <Header
                    isLogin={this.props.status.isLogin}
                    onLogout={this.handleLogout}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.member.status
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getInfoRequest: () => {
            return dispatch(getInfoRequest());
        },
        logoutRequest: () => {
            return dispatch(logoutRequest());
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(App);
