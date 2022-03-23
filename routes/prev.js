var express = require('express');
var router = express.Router();
var Exam = require('../controller/exam.js');
var Question = require('../controller/question.js');
var Result = require('../controller/stuResult.js');

const store = require('store2');

router.post('/prev',async(req,res,next)=>{
    //if(req.session.loggedIn == true && req.session.name!=null)
    //{
        var exname = req.body.exname;
        var stu_ans = req.body.ans;
        var exid = req.body.exid;
        var question_id = req.body.qid;
        var stime = req.body.stime;
        var stop = req.body.stop;
        var total = req.body.total;
        var plus = parseInt(question_id);
        plus--;
        store.set("ques"+exid,stu_ans);
        var stu_ans_get = store("ques"+exid);
        question_id = plus.toString();
        var query = await Question.find({question_id,exid});
        console.log(query);
        if(query.question != '')
        {
            res.render('examAttempt.ejs',{exname:exname,exid:exid,start:stime,stop:stop,total:total,message:query,stu_ans:stu_ans_get,change_from:''});
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