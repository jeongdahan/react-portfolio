var express = require('express');
var router  = express.Router();
var Member = require('../models/member');
var session = require('express-session');

/*
    사용방법: POST /api/member/signup
    예제: { "username": "이름", "password": "비밀번호" }
    에러코드:
        1: 아이디 없음
        2: 패스워드 없음
        3: 기존 아이디 존재
*/

router.post('/signup', (req, res) => {
    // 아이디에 알파뱃, 숫자외 문자가 들어가는지 확인
    let usernameRegex = /^[a-z0-9]+$/;

    if(!usernameRegex.test(req.body.username)) {
        return res.status(400).json({
            error: "BAD USERNAME",
            code: 1
        });
    }

    // 패스워드가 4글자 미만인지 확인
    if(req.body.password.length < 4) {
        return res.status(400).json({
            error: "BAD PASSWORD",
            code: 2
        });
    }

    // 기존에 아이디가 존재하는지 확인
    Member.findOne({ username: req.body.username }, (err, exists) => {
        if (err) throw err;
        if(exists){
            return res.status(400).json({
                error: "USERNAME EXISTS",
                code: 3
            });
        }

        // 계정생성
        let member = new Member({
            username: req.body.username,
            password: req.body.password
        });

        // 비밀번호 해시화
        member.password = member.generateHash(member.password);

        // 데이터베이스 저장
        member.save( err => {
            if(err) throw err;
            return res.json({ success: true });
        });

    });
});

/*
    사용방법: POST /api/member/signin
    예제: { "username": "이름", "password": "비밀번호" }
    ERROR CODES:
        1: 로그인 실패
*/
router.post('/signin', (req, res) => {
    Member.findOne({ username: req.body.username}, (err, member) => {
        if(err) throw err;

        // 아이디가 존재 하는지 확인
        if(!member) {
            return res.status(400).json({
                error: "LOGIN FAILED",
                code: 1
            });
        }

        // 암호가 맞는지 확인
        if(!member.validateHash(req.body.password)) {
            return res.status(400).json({
                error: "PASSWORD FAILED",
                code: 2
            });
        }

        let session = req.sessionStore;
        session.loginInfo = {
            _id: member._id,
            username: member.username
        };

        return res.json({
            success: true,
            session
        });
    });
});


/*
    사용방법: GET /api/member/getInfo
*/
router.get('/getinfo', (req, res) => {
    console.log(req.sessionStore);
    if(typeof req.sessionStore.loginInfo === "undefined") {
        return res.status(400).json({
            error: 1
        });
    }

    return res.json({ info: req.sessionStore.loginInfo });
});

/*
    사용방법: POST /api/member/logout
*/
router.post('/logout', (req, res) => {
    req.sessionStore.loginInfo = null;
    return res.json({ sucess: true });
});

module.exports = router;
