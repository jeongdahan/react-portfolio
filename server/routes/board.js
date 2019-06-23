var express = require('express');
var Board = require('../models/board');
var mongoose = require('mongoose');

var router = express.Router();

/*
    사용방법: POST /api/board
    예제: { contents: "내용" }
    에러코드
        1: 로그인 확인
        2: 내용 확인
*/
router.post('/', (req, res) => {
    if(typeof req.sessionStore.loginInfo === 'undefined') {
        return res.status(400).json({
            error: "NOT LOGGED IN",
            code: 1
        });
    }

    if(req.body.contents === "") {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    let board = new Board({
        writer: req.sessionStore.loginInfo.username,
        contents: req.body.contents
    });

    board.save( err => {
        if(err) throw err;
        return res.json({ success: true });
    });
});

/*
    사용방법: GET /api/board
*/
router.get('/', (req, res) => {
    Board.find()
    .sort({"_id": -1})
    .limit(6)
    .exec((err, board) => {
        if(err) throw err;
        res.json(board);
    });
});

/*
    사용방법: GET /api/board/:listType/:id
*/
router.get('/:listType/:id', (req, res) => {
    let listType = req.params.listType;
    let id = req.params.id;

    if(listType !== 'old' && listType !== 'new') {
        return res.status(400).json({
            error: "INVALID LISTTYPE",
            code: 1
        });
    }

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 2
        });
    }

    let objId = new mongoose.Types.ObjectId(req.params.id);

    if(listType === 'new') {
        Board.find({ _id: { $gt: objId }})
        .sort({_id: -1})
        .limit(6)
        .exec((err, boards) => {
            if(err) throw err;
            return res.json(boards);
        });
    } else {
        Board.find({ _id: { $lt: objId }})
        .sort({_id: -1})
        .limit(6)
        .exec((err, boards) => {
            if(err) throw err;
            return res.json(boards);
        });
    }
});

/*
    사용방법: DELETE /api/board/:id
    에러코드
        1: ID 확인
        2: 로그인 확인
        3: 내용 확인
        4: 권한 확인
*/
router.delete('/:id', (req, res) => {

    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    if(typeof req.sessionStore.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 2
        });
    }

    Board.findById(req.params.id, (err, board) => {
        if(err) throw err;

        if(!board) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 3
            });
        }
        if(board.writer != req.sessionStore.loginInfo.username) {
            return res.status(403).json({
                error: "PERMISSION FAILURE",
                code: 4
            });
        }

        Board.remove({ _id: req.params.id }, err => {
            if(err) throw err;
            res.json({ success: true });
        });
    });

});

/*
    사용방법: PUT /api/board/:id
    예제: { contents: "내용 "}
    에러코드
        1: 아이디 확인
        2: 내용 확인
        3: 로그인 확인
        4: 내용확인
        5: 권한 확인
*/
router.put('/:id', (req, res) => {

    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    if(req.body.contents === "") {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    if(typeof req.sessionStore.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 3
        });
    }

    Board.findById(req.params.id, (err, board) => {
        console.log(board);
        if(err) throw err;

        if(!board) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 4
            });
        }

        if(board.writer != req.sessionStore.loginInfo.username) {
            return res.status(403).json({
                error: "PERMISSION FAILURE",
                code: 5
            });
        }

        board.contents = req.body.contents;
        board.date.edited = new Date();
        board.is_edited = true;

        board.save((err, board) => {
            if(err) throw err;
            return res.json({
                success: true,
                board
            });
        });

    });
});

module.exports = router;
