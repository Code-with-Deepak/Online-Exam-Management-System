var mongoose = require('mongoose');

var questionSchema = mongoose.Schema({
    question_id:{type:String},
    question:{type:String},
    ans1:{type:String},
    ans2:{type:String},
    ans3:{type:String},
    ans4:{type:String,},
    ans:{type:String},
    exam_id:{type:String},
});

module.exports = mongoose.model('question',questionSchema);