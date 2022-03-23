var fs = require('fs');
var express = require('express');
const exp = require('constants');
var router = express.Router();
var Result = require('../controller/stuResult');


router.get('/exportData',async(req,res)=>{
    var date = Date.now();
var writeStream = fs.createWriteStream(date+".xls");
var result = await Result.find();
var header = "Exam Id \t Exam Name \t Register No \t Department \t Attempt_Remaining \t Attempted \t Marks \n";
writeStream.write(header);
for(var i=0;i<result.length;i++)
{
var row1 = result[i].exam_id+"\t"+result[i].exam_name+"\t"+result[i].regno+"\t"+result[i].dept+"\t"+result[i].attempt_rem+"\t"+result[i].attempted+"\t"+result[i].marks+"\n";
writeStream.write(row1);
}

writeStream.close();
res.send("Data Downloadded ");
})


module.exports = router;