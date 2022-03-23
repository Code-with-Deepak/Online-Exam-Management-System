var express = require('express');
var router = express.Router();
var Exam = require('../controller/exam.js');
var Question = require('../controller/question.js');
var Result = require('../controller/stuResult.js');

router.post('/review',async(req,res,next)=>{
    //if(req.session.loggedIn == true && req.session.name!=null)
    //{
        var exname = req.body.exname;
        var stu_ans = req.body.ans;
        var exid = req.body.exid;
        console.log(exid);
        var question_id = req.body.qid;
        var stime = req.body.stime;
        var stop = req.body.stop;
        var total = req.body.total;
        Question.find({exid},(err,docs)=>{
        res.render('resultReview.ejs',{total:total,query:docs,stu_ans:stu_ans,qid:question_id,exid:exid});
        })
        
    //}
    //else
    //res.send("Invalid Access");
})

module.exports = router;