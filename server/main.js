var express   = require('express');
var app       = express();

// server port
var port = 4000;

// router
var api       = require('./routes');

// morgan
var morgan     = require('morgan');

// bodyParser
var bodyParser = require('body-parser');

// mongoose
var mongoose    = require('mongoose');

// express-session
var session = require('express-session');

// MONGODB 접속
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    console.log("MONGODB 접속");
});

mongoose.connect('mongodb://localhost/react-portfolio');

// CORS 이슈 해결
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* use session */
app.use(session({
    secret: 'Jungda1$1$234',
    resave: false,
    saveUninitialized: true
}));

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res){
    return res.send('Hello World');
});

// router
app.use('/api', api);

app.listen(port, function(){
    console.log('App is listening on '+ port);
});
