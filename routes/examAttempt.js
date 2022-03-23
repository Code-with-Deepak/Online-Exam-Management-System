var express = require('express');
const { readDirectory } = require('node-persist');
var router = express.Router();
var Exam = require('../controller/exam.js');
var Question = require('../controller/question.js');
var Result = require('../controller/stuResult.js');

router.post('/examAttempt',async(req,res,next)=>{
    //if(req.session.loggedIn == true && req.session.name!=null)
    //{
        var exname = req.body.exname;
        var exid = req.body.exid || req.query.exid;
        var question_id = req.body.qid;
        var stime = req.body.stime;
        var stop = req.body.stop;
        var total = req.body.total;
        var query = await Question.find({question_id,exid});
        if(query.question != '')
        {
            res.render('examAttempt.ejs',{exname:exname,exid:exid,start:stime,stop:stop,total:total,message:query,stu_ans:'',change_from:''});
        }
        else
        {
            res.send("Questions are Not added");
        }
        
    //}
    //else
    //res.send("Invalid Access");
})

module.exports = router;