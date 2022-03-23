var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var db = require('./models/db.js').connect();
var index = require('./routes/index.js');
var login = require('./routes/loginHandler.js');
var addAll = require('./routes/addAll.js');
var instruct = require('./routes/instructions.js');
var reset = require('./routes/resetAttempt.js');
var preview = require('./routes/examPreview.js');
var attempt = require('./routes/examAttempt.js');
var next = require('./routes/next.js');
var prev = require('./routes/prev.js');
var numch = require('./routes/numch.js');
var edit = require('./routes/editExam.js');
var review = require('./routes/review.js');
var result = require('./routes/examResultA.js');
var exportd = require('./routes/exportData.js');

app.use(express.json());
app.use(bodyParser());

var oneDay = 1000*60*60*24;
app.use(session({
secret:"123secret",
saveUninitialized:true,
cookie:{maxAge:oneDay},
resave:false,
}));
//middle ware
function messages(req,res,next){
    var message;
    res.locals.message = message;
    next();
}
//session middle ware
app.use(function(req, res, next) {
    res.locals.user = req.session.name;
    res.locals.succmsg = req.session.succmessage;
    res.locals.studept = req.session.dept;
    res.locals.stuyear = req.session.year;
    res.locals.regno = req.session.regno;
    res.locals.email = req.session.email;
    next();
  });

app.use(express.static('./public'));
app.set('view-engine','ejs');

app.use('/',messages,index);
app.get('/filechooser',messages,index);

app.post('/login',messages,login);
app.post('/signup',login);
app.post('/admin',messages,login);

app.post('/addExam',messages,addAll);
app.post('/addQues',messages,addAll);
app.post('/updateExam',messages,addAll);
app.post('/preview',messages,preview);

app.post('/instructions',messages,instruct);

app.post('/resetAttempt',messages,reset);

app.post('/examAttempt',messages,attempt);

app.post('/next',messages,next);
app.post('/prev',messages,prev);
app.post('/numch',messages,numch);

app.post('/examResult',messages,result);

app.post('/review',messages,review);

app.get('/editExam/:id',messages,edit);

app.get('/exportData',messages,exportd);

app.listen(3000,console.log("Server Started"));