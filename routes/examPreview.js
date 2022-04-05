var express = require('express');
var router = express.Router();
var Exam = require('../controller/exam.js');
var Question = require('../controller/question.js');
var Result = require('../controller/stuResult.js');

router.post('/preview',async(req,res,next)=>{
    if(req.session.loggedIn == true && req.session.name!=null)
    {
        var rem;
        var exname = req.body.exname || req.query.exname;
        var exid = req.body.exid;
        var stime = req.body.stime;
        var stop = req.body.stop;
        var attempt = req.body.attempt;
        var total = req.body.total
        Result.findOne({exam_name:{$regex:exname},regno:{$regex:req.session.regno}},(err,resultUp)=>{
            console.log(resultUp.length);
        if(resultUp > 0)
        {
            rem = parseInt(resultUp.attempt_rem); 
            console.log(rem);
        }
        else
        {
            Result.create({
                exam_id:exid,
                exam_name:exname,
                regno:req.session.regno,
                dept:req.session.dept,
                attempt_rem:attempt,
                attempted:"",
                marks:0,
            })
        }
        res.render('examPreview.ejs',{exname:exname,start:stime,stop:stop,rem:rem,totalq:total});
        });
    }
    else
    res.send("Invalid Access");
})

module.exports = router;
