var express = require('express');
var member = require('./member');
var board = require('./board');


const router = express.Router();
router.use('/member', member);
router.use('/board', board);

module.exports = router;
