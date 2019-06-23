import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Board from './Board';

const propTypes = {
    data: PropTypes.array,
    currentUser: PropTypes.string
};

const defaultProps = {
    data: [],
    currentUser: ''
};

class BoardList extends Component {
    render() {
        const mapToComponents = (data) => {
            return data.map( ( v, i ) => {
                return (
                    <Board
                        data={v}
                        ownership={ v.writer === this.props.currentUser }
                        key={v._id}
                        index={i}
                        onEdit={this.props.onEdit}
                        onRemove={this.props.onRemove}
                    />
                );
            } )
        }

        return(
            <div>
                {mapToComponents(this.props.data)}
            </div>
        );
    }
}

BoardList.propTypes = propTypes;
BoardList.defaultProps = defaultProps;

export default BoardList;
