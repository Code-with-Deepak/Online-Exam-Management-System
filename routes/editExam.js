var express = require('express');
var router = express.Router();
var Exam = require('../controller/exam.js');
var Question = require('../controller/question.js');
var Result = require('../controller/stuResult.js');

router.get('/editExam/:id',async(req,res,next)=>{
    if(req.session.loggedIn == true && req.session.aname!=null)
    {
        var exid = req.params.exid;
        var query1 = await Exam.find({exid});
        var query = await Question.find({exid});
            res.render('editExam.ejs',{message:query,message1:query1});        
    }
    else
    res.send("Invalid Access");
})

module.exports = router;