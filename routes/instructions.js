var express = require('express');
var Result = require('../controller/stuResult');
var router = express.Router();


router.post('/instructions',async(req,res,next)=>{
    if(req.session.loggedIn == true && req.session.name!=null)
    {
        var exname = req.body.exname;
        var exid = req.body.exid;
        var stime = req.body.stime;
        var stop = req.body.stop;
        var attempt_rem = req.body.rem;
        var rem = parseInt(attempt_rem);
        rem--;
        var total = req.body.total;
        const filter = {exam_name:exname,regno:req.session.regno};
        const update = {attempt_rem:rem,attempted:'Yes'};
        Result.findOneAndUpdate(filter,update,{new:true},(err,docs)=>{
            
        });
        res.render('instructions.ejs',{exname:exname,start:stime,stop:stop,rem:attempt_rem,exid:exid,totalq:total});
    }
    else
    res.send("Invalid Access");
})

module.exports = router;