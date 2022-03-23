var express = require('express');
var router = express.Router();
var Exam = require('../controller/exam.js');
var mongoose = require('mongoose');
var Result = require('../controller/stuResult.js');
const User = require('../controller/user.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs');
});

router.get('/admin',function(req,res,next){
  res.render('admin.ejs');
});

router.get('/adminHome',async(req,res,next) => {
  if(req.session.loggedIn == true && req.session.aname != null)
  {
  var exam = await Exam.find();
  var result = await Result.find();
  var user = await User.find();
  var op = req.body.op || req.query.op ;
  if(op==1)
  var succmessage = "Attempt Resetted successfully"; 
  res.render('adminHome.ejs',{message:exam,succmessage:succmessage,resmessage:result,op:op,usemessage:user});
  }
  else
  res.send("Invalid Access");
})

router.get('/studentHome',async(req,res,next) => {
  if(req.session.loggedIn == true && req.session.name != null)
  {
  var result = await Exam.find({for_dept:{$regex:req.session.dept},for_year:{$regex:req.session.year}});
  console.log(result);
  res.render('studentHome.ejs',{message:result,succmessage:""});
  }
  else
  res.send("Invalid Access");
})

router.get('/signup',function(req,res,next){
  res.render('signup.ejs');
})

router.get('/deleteexam/:examid',async(req,res,next) => {
  if(req.session.loggedIn == true && req.session.aname != null)
  {
    var examid = req.params.examid;
    console.log(examid);
    Exam.deleteOne({"exam_id":examid},(err,result)=>{
      console.log(result);
    })
    req.session.succmessage = "Examination Deleted Successfully";
  res.redirect('/adminHome');
  }
  else
  res.send("Invalid Access");

})

router.get('/filechooser/:examid',function(req,res,next){
  if(req.session.loggedIn == true && req.session.aname!=null){
  var examid = req.params.examid;
  res.render('filechooser.ejs',{message:examid});
  }
  else
  res.send("Invalid access");
})

router.get('/logout',(req,res,next)=>{
  req.session.destroy();
  res.redirect('/');
})

module.exports = router;
