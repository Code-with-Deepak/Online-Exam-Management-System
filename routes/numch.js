var express = require('express');
var router = express.Router();
var Exam = require('../controller/exam.js');
var Question = require('../controller/question.js');
var Result = require('../controller/stuResult.js');
const url = require('url');
const store = require('store2');


router.post('/numch',async(req,res,next)=>{
    //if(req.session.loggedIn == true && req.session.name!=null)
    //{
        var currurl = new URL('http://localhost:3000'+req.url);
        const search = currurl.searchParams;

        const id =search.get('questionid');
        console.log(id);
        var exname = req.body.exname;
        var qid = req.body.qid;
        var exid = req.body.exid;
        var stu_ans = req.body.ans;
        var question_id = id;
        var stime = req.body.stime;
        var stop = req.body.stop;
        var total = req.body.total;
        store.set("ques"+exid,stu_ans);
        var stu_ans_get = store("ques"+exid);
        var query = await Question.find({question_id,exid});
        console.log(query);
        if(query.question != '')
        {
            res.render('examAttempt.ejs',{exname:exname,exid:exid,start:stime,stop:stop,total:total,message:query,stu_ans:stu_ans_get,change_from:qid});
        }
        
    //}
    //else
    //res.send("Invalid Access");
})

module.exports = router;