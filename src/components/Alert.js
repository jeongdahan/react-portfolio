import React, { Component } from 'react';

class Alert extends Component {   
    onClose = () => {
        window.$('#react-alert').hide();
    }

    render() {
        return(
            <div id="react-alert" className="">
                <button onClick={this.onClose}><i className="fas fa-times icon"></i></button>
                <div className="d-flex p-4">
                    <div className="mr-4">
                        <i className="fas fa-exclamation-circle icon"></i>
                    </div>

                    <div>
                        <div className="title h4 mb-3">알림</div>
                        <div className="text h5"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Alert;
