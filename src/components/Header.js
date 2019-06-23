import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const propTypes = {
    isLogin: PropTypes.bool,
    onLogout: PropTypes.func
};

const defaultProps = {
    isLogin: false,
    onLogout: () => { console.error("logout function not defined");}
};

class Header extends Component {
    render() {

        const loginButton = (
            <li className="list-inline-item pointer">
                <Link to="/login">
                    <i className="fas fa-key icon"></i>
                </Link>
            </li>
        );

        const logoutButton = (
            <li className="list-inline-item pointer">
                <div onClick={this.props.onLogout}>
                    <i className="fas fa-unlock icon color-2"></i>
                </div>
            </li>
        );

        return(
            <nav id="main-gnb" className="container-fluid">
                <div className="row align-items-center">
                    <div className="col">
                        <i className="fas fa-search icon d-none"></i>
                    </div>
                    <div className="col">
                        <Link to="/home" className="d-block text-center">
                            <h1 className="pointer">
                                MEMOPADE
                            </h1>
                        </Link>
                    </div>
                    <div className="col">
                        <ul className="list-inline text-right">
                            { this.props.isLogin ? logoutButton : loginButton }
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
