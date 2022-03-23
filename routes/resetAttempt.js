var express = require('express');
var Result = require('../controller/stuResult');
var router = express.Router();


router.post('/resetAttempt',async(req,res,next)=>{
    if(req.session.loggedIn == true && req.session.aname!=null)
    {
        var exname = req.body.exname;
        var regno = req.body.regno;
        const filter = {exam_name:exname,regno:regno};
        const update = {attempt_rem:1};
        Result.findOneAndUpdate(filter,update,{new:true},(err,docs)=>{
            
        });
        res.redirect('/adminHome?op=1');
    }
    else
    res.send("Invalid Access");
})

module.exports = router;