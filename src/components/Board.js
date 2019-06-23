import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';

const propTypes = {
    data: PropTypes.object,
    ownership: PropTypes.bool
};

const defaultProps = {
    data: {
        _id: 'id1234567890',
        writer: 'Writer',
        contents: 'Contents',
        is_edited: false,
        date: {
            edited: new Date(),
            created: new Date()
        },
        starred: []
    },
    ownership: true
};

class Board extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editMode: false,
            value: props.data.contents
        }
    }

    toggleEdit = () => {
        if(this.state.editMode) {
            let id = this.props.data._id;
            let index = this.props.index;
            let contents = this.state.value;

            this.props.onEdit(id, index, contents).then(() => {
                this.setState({
                    editMode: !this.state.editMode
                });
            })
        } else {
            this.setState({
                editMode: !this.state.editMode
            });
        }
    }

    handleRemove = () => {
        let id = this.props.data._id;
        let index = this.props.index;

        this.props.onRemove(id, index);
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        });
    }

    render() {
        let editdInfo = (
            <span style={{color: '#aab5bc'}} className="h6"> · Edited <TimeAgo date={this.props.data.date.edited} live={true}/></span>
        );

        const dropBox = (
            <div className="card-footer text-right">
                <div className="button ml-auto">
                    <span onClick={this.toggleEdit} className="pointer h6 color-1">Edit</span>
                    <span onClick={this.handleRemove} className="pointer ml-2 h6 color-1">Delete</span>
                </div>
            </div>
        );

        const boardView = (
            <div className="card bc-1">
                <div className="card-header d-flex align-items-end">
                    <div className="card-title mb-0 mr-3 h5">{this.props.data.writer}</div>
                    <div className="card-text h6"><TimeAgo date={this.props.data.date.created}/></div>
                    { this.props.data.is_edited ? editdInfo : undefined }
                </div>

                <div className="card-body h6">
                    {this.props.data.contents}
                </div>

                { this.props.ownership ? dropBox : undefined }
            </div>
        );

        const editView = (
            <div className="card bc-1">
                <div className="card-header h4">
                    수정 하실 내용을 작성해 주세요
                </div>
                <div className="card-body">
                    <textarea
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                    </textarea>
                </div>
                <div className="card-footer text-right">
                    <button
                        className="btn"
                        onClick={this.toggleEdit}
                    >
                        수정
                    </button>

                </div>
            </div>
        );

        return(
            <div className="board mt-4">
                { this.state.editMode ? editView : boardView }
            </div>
        );
    }
}

Board.propTypes = propTypes;
Board.defaultProps = defaultProps;

export default Board;
