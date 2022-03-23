var mongoose = require('mongoose');

var resultSchema = mongoose.Schema({
    exam_id:{type:Number},
    exam_name:{type:String},
    regno:{type:String},
    dept:{type:String},
    attempt_rem:{type:Number},
    attempted:{type:String,default:"No"},
    marks:{type:Number},
});

module.exports = mongoose.model('result',resultSchema);