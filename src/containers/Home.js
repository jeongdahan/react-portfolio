import React, { Component } from 'react';
import { Write, BoardList, Alert } from '../components';

import { connect } from 'react-redux';
import { boardPostRequest, boardListRequest, boardEditRequest, boardRemoveRequest } from '../actions/board';

class Home extends Component {
    constructor(){
        super();

        this.state = {
            loadingState: false
        };
    }

    componentDidMount() {
        // 스크롤시 새로운 계시물 로딩
        window.$(window).scroll(() => {
            if (window.$(document).height() - window.$(window).height() - window.$(window).scrollTop() < 250) {
                if(!this.state.loadingState){
                    this.loadOldBoard();
                    this.setState({
                        loadingState: true
                    });
                }

            }else{
                if(this.state.loadingState){
                    this.setState({
                        loadingState: false
                    });
                }
            }
        });

        // 새로운 게시물을 5초 마다 로딩
        const loadBoardLoop = () => {
            this.loadNewBoard().then(
                () => {
                    setTimeout(loadBoardLoop, 5000);
                }
            );
        };



        this.props.boardListRequest(true).then(
            () => {
                loadBoardLoop();
            }
        );
    }

    handlePost = (content) => {
        return this.props.boardPostRequest(content)
               .then( () => {
                   if( this.props.postStatus.status === 'SUCCESS' ){
                       // 글 작성 후 게시물 로딩
                       this.loadNewBoard()
                       .then( () => {
                           window.$('#react-alert .text').text("글쓰기를 성공하였습니다");
                           window.$('#react-alert').show();
                       } );
                   }else{
                       /*
                            에러코드
                                1: 로그인 확인
                                2: 내용 확인
                        */
                        switch(this.props.postStatus.error){
                            case 1:
                                return alert("로그인을 해주시기 바랍니다.");

                            case 2:
                                return alert("내용을 적어주시기 바랍니다.");

                            default:
                                return alert("글쓰기에 실패했습니다.");
                        }
                   }
               } );
    }

    handleEdit = ( id, index, contents ) => {
        return this.props.boardEditRequest( id, index, contents )
               .then( () => {
                   if(this.props.editStatus.status==="SUCCESS") {
                    window.$('#react-alert .text').text("수정을 성공하였습니다");
                    window.$('#react-alert').show();
                } else {
                    /*
                        에러코드
                            1: 아이디 확인
                            2: 내용 확인
                            3: 로그인 확인
                            4: 내용 확인
                            5: 권한 확인
                    */
                    let errorMessage = [
                        '아이디',
                        '내용',
                        '로그인',
                        '내용',
                        '권한'
                    ];

                    let error = this.props.editStatus.error;

                    window.$('#react-alert .text').text( "수정을 실패했습니다." + errorMessage[error - 1] + "를(을) 확인해 주세요" );
                    window.$('#react-alert').show();

                    if(error === 3) {
                        setTimeout(()=> { this.props.history.push('/login'); }, 2000);
                    }

                }
               } );
    }

    handleRemove = ( id, index ) => {
        return this.props.boardRemoveRequest( id, index )
               .then( () => {
                   let errorMessage = [
                       '아이디',
                       '로그인',
                       '내용',
                       '권한'
                   ];

                   if(this.props.removeStatus.status==="SUCCESS") {
                        window.$('#react-alert .text').text( "해당 게시물을 삭제했습니다." );
                        window.$('#react-alert').show();
                    } else {
                        /*
                            에러코드
                                1: 아이디 확인
                                2: 로그인 확인
                                3: 내용 확인
                                4: 권한 확인
                        */

                        let error = this.props.removeStatus.error;
                        window.$('#react-alert .text').text( "해당 게시물 삭제를 실패했습니다." + errorMessage[error - 1] + "를(을) 확인해 주세요" );
                        window.$('#react-alert').show();


                        if(this.props.removeStatus.error === 2) {
                            setTimeout(()=> { this.props.history.push('/login'); }, 2000);
                        }
                    }
               } );
    }

    loadNewBoard = () => {
        if( this.props.listStatus === 'WAITING' && this.props.boardData.length === 0 ){
            return this.props.boardListRequest(true);
        }


        return this.props.boardListRequest(false, 'new', this.props.boardData[0]._id);
    }

    loadOldBoard = () => {
        let lastId = this.props.boardData[this.props.boardData.length - 1]._id;

        return this.props.boardListRequest(false, 'old', lastId).then(() => {
            if(this.props.isLast) {
                window.$('#react-alert .text').text("마지막 게시물 입니다");
                window.$('#react-alert').show();
            }
        });
    };



    render() {
        const write = (<Write onPost={this.handlePost} />);

        return(
            <div className="container">
                { this.props.isLogin ? write : undefined }
                <BoardList
                    data={this.props.boardData}
                    currentUser={this.props.currentUser}
                    onEdit={this.handleEdit}
                    onRemove={this.handleRemove}
                />
                <Alert />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLogin: state.member.status.isLogin,
        postStatus: state.board.post,
        currentUser: state.member.status.currentUser,
        boardData: state.board.list.data,
        listStatus: state.board.list.status,
        isLast: state.board.list.isLast,
        editStatus: state.board.edit,
        removeStatus: state.board.remove
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        boardPostRequest: (contents) => {
            return dispatch(boardPostRequest(contents));
        },
        boardListRequest: (init, listType, id, username) => {
            return dispatch(boardListRequest(init, listType, id, username));
        },
        boardEditRequest: ( id, index, contents ) => {
            return dispatch(boardEditRequest( id, index, contents ));
        },
        boardRemoveRequest: ( id, index ) => {
            return dispatch(boardRemoveRequest( id, index ));
        }
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(Home);
