import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    onPost: PropTypes.func
};

const defaultProps = {
    onPost: () => { console.error('post function not defined') }
};

class Write extends Component {

    constructor(props) {
        super(props);

        this.state = {
            contents: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            contents: e.target.value
        });
    }

    handlePost = () => {
        let contents = this.state.contents;
        this.props.onPost(contents)
        .then( () => {
            this.setState({
                contents: ''
            })
        } );
    }


    render() {
        return(
            <div className="write">
                <div className="card mt-5 bc-1">
                    <div className="card-header h4">
                        글을 작성해 주세요
                    </div>
                    <div className="card-body">
                        <textarea
                            className=""
                            name="contents"
                            value={this.state.contents}
                            onChange={this.handleChange}
                        ></textarea>
                    </div>
                    <div className="card-footer text-right">
                        <button
                            className="btn h6"
                            onClick={this.handlePost}
                            >
                            글쓰기
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

Write.propTypes = propTypes;
Write.defaultProps = defaultProps;

export default Write;
