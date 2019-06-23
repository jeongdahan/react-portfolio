import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const propTypes = {
    mode: PropTypes.bool,
    onLogin: PropTypes.func,
    onRegister: PropTypes.func

};

const defaultProps = {
    mode: true,
    onLogin: ( id, pw ) => { console.error("onLogin function not defined") },
    onRegister: ( id, pw ) => { console.error("onRegister function ont defined") }

};

class Member extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    componentDidMount(){
        this.onFocus();
    }

    onFocus = () => {
        this.textInput.focus();
    }


    handleChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleKeyPress = (e) => {
        if(e.charCode === 13){
            if(this.props.mode){
                this.handleLogin();
            }else{
                this.handleRegister();
            }
        }
    }

    handleLogin = () => {
        let id = this.state.username;
        let pw = this.state.password;

        this.props.onLogin( id, pw )
        .then( (result) => {
            if(!result){
                this.setState({
                    password: ''
                });
            }
        } );
    }

    handleRegister = () => {
        let id = this.state.username;
        let pw = this.state.password;

        this.props.onRegister( id, pw )
        .then( (result) => {
            if(!result){
                this.setState({
                    username: '',
                    password: ''
                });
            }
        } );
    }

    render() {
        const inputBoxes =(
            <div>
                <div className="input-group">
                    <span className="input-group-addon">
                        <i className="fas fa-user-circle"></i>
                    </span>
                    <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        className="validate form-control h6"
                        placeholder="ID"
                        ref={ (input) => { this.textInput = input } }
                        onChange={this.handleChange}
                    />
                </div>

                <div className="input-group mt-3">
                    <span className="input-group-addon">
                        <i className="fas fa-unlock"></i>
                    </span>
                    <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        className="validate form-control h6"
                        placeholder="PASSWORD"
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                    />
                </div>
            </div>
        );

        const loginView = (
            <div>
                <div className="form-wrap">
                    { inputBoxes }
                </div>

                <button onClick={this.handleLogin} className="btn mt-4">로그인</button>

                <div className="text-right mt-3">
                    <Link to="/register" className="ml-2">회원가입</Link>
                </div>
            </div>
        );

        const registerView = (
            <div>
                <div className="form-wrap">
                    { inputBoxes }
                </div>

                <button onClick={this.handleRegister} className="btn mt-4">회원가입</button>
            </div>
        );

        return (
            <div className="container auth pt-5">
                <div className="row d-flex justify-content-center mt-5">
                    <div className="col-12 col-md-6">
                        <div className="card">
                            <h2 className="card-header h4">
                                {this.props.mode ? "LOGIN" : "REGISTER"}
                            </h2>
                            <div className="card-body">
                                <div className="card-text">
                                    {this.props.mode ? loginView : registerView }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Member.propTypes = propTypes;
Member.defaultProps = defaultProps;

export default Member;
