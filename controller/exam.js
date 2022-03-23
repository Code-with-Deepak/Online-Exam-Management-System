var mongoose = require('mongoose');

var examSchema = mongoose.Schema({
    exam_id:{type:Number,unique:true},
    exam_name:{type:String},
    total_questions:{type:Number},
    attempt:{type:Number},
    start_time:{type:String},
    stop_time:{type:String,},
    for_dept:{type:String},
    for_year:{type:String},
});

module.exports = mongoose.model('exam',examSchema);