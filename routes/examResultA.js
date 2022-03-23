var express = require('express');
var router = express.Router();
var Exam = require('../controller/exam.js');
var Question = require('../controller/question.js');
var Result = require('../controller/stuResult.js');
var nodemailer = require('nodemailer');

function mailSender(mail_id,regno,marks){
    const transpoter = nodemailer.createTransport({
      service:'gmail',
      auth:{
          user:process.env.USER,
          pass:process.env.PASS,
      }
  });
  
  const mailOption = {
      from:process.env.USER,
      to:mail_id,
      subject:'Scores',
      html:'<input style="background-color:#00854A;color:white; padding:10px" type="submit" value="Marks Scored = '+marks+'">'
  }
  
  transpoter.sendMail(mailOption,(err,result)=>{
      if(err)
      {
          console.log(err);
      }
  });
  }

router.post('/examResult',async(req,res,next)=>{
    //if(req.session.loggedIn == true && req.session.name!=null)
    //{
        var mark = req.body.marks;
        var email = req.session.email;
        var regno = req.session.regno;
        var exid = req.body.exid;
        console.log(exid);
         var result = await Result.findOneAndUpdate({exam_id:exid,regno:regno},{marks:mark},{returnOriginal:false});
         console.log(result);
         mailSender(email,regno,mark);
        res.render('examResult.ejs',{exid:exid,marks:mark});

//}
    //else
    //res.send("Invalid Access");
})

module.exports = router;