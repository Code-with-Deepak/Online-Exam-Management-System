var express = require('express');
var router = express.Router();
var Exam = require('../controller/exam.js');
var Question = require('../controller/question.js');
var Result = require('../controller/stuResult.js');
var path = require('path');
var fs = require('fs');
var multer = require('multer');
var csv = require('csvtojson');
const exam = require('../controller/exam.js');
const { isRegExp } = require('util/types');
var changePath = process.cwd();

var storage = multer.diskStorage({
    destination: (req,file,callBack) => {
        callBack(null,'./public/uploads')
    },
    filename: (req,file,callBack) => {
        callBack(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage
});

router.post('/addExam',async(req,res,next)=>{
    var countQ = await Exam.countDocuments({});
    var eid = countQ+1;
    var ename = req.body.sub;
    var attempt = req.body.attempt;
    var start = req.body.start;
    var stop = req.body.stop;
    var total = req.body.total;
    const dept1 = req.body.dept;
    const splitdept = dept1.toString().split(',');
    var dept="";
    for(var i=0;i<splitdept.length;i++)
    {
        dept = dept + splitdept[i]+ " ";
    }
    var year1 = req.body.year;
    const splityear = year1.toString().split(',');
    var year="";
    for(var i=0;i<splityear.length;i++)
    year = year + splityear[i]+" ";
    if(await Exam.create({
        "exam_id":eid,
        "exam_name":ename,
        "total_questions":total,
        "attempt":attempt,
        "start_time":start,
        "stop_time":stop,
        "for_dept":dept,
        "for_year":year,
    }))
    {
        req.session.succmessage = "Examination Added Successfully";
        res.redirect('/adminHome');
    }
    else
    {
        res.send("Error While Adding Exam");
    }
})

router.post('/updateExam',async(req,res,next)=>{
    var eid = req.body.exid
    var ename = req.body.sub;
    var attempt = req.body.attempt;
    var start = req.body.start;
    var stop = req.body.stop;
    var total = req.body.total;
    const filter = {exam_id:eid};
    const dept1 = req.body.dept;
    const splitdept = dept1.toString().split(',');
    var dept="";
    for(var i=0;i<splitdept.length;i++)
    {
        dept = dept + splitdept[i]+ " ";
    }
    var year1 = req.body.year;
    const splityear = year1.toString().split(',');
    var year="";
    for(var i=0;i<splityear.length;i++)
    year = year + splityear[i]+" ";
    const update = {"exam_id":eid,
    "exam_name":ename,
    "total_questions":total,
    "attempt":attempt,
    "start_time":start,
    "stop_time":stop,
    "for_dept":dept,
    "for_year":year}
    Exam.findOneAndUpdate(filter,update,{new:true},(err,docs)=>{
            if(err)
            throw err;
            req.session.succmessage = "Examination Updated Successfully";
            res.redirect('/adminHome');
    });
})

router.post('/AddQues',upload.single('csvfile'),async(req,res,next) => {
    var imgPath;
    if(req.session.loggedIn == true && req.session.aname != "")
    {
      var examid = req.body.examid;
    if(!req.file){
        res.redirect('/adminHome');
        req.session.succmessage = "No file is Chosen";
    }
    else
    {
        fileName = req.file.filename;
        csv()  
        .fromFile(req.file.path)  
        .then((jsonObj)=>{  
        console.log(jsonObj);
        Question.insertMany(jsonObj,(err,docs)=>{
            if(err){
                req.session.succmessage = "Questions Are uploaded Already";
            }
            req.session.succmessage = "Questions Are loaded into databse";
            res.redirect('/adminHome');
        });
    });


    }
    }
    else
    res.send("Invalid Access");
  
  })

module.exports = router;
