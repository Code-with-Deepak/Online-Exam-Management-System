var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    Name:{type:String},
    dept:{type:String},
    year:{type:String},
    regno:{type:String,unique:true},
    email:{type:String,unique:true},
    mobile:{type:Number,unique:true},
    password:{type:String},
    token:{type:String},
});

module.exports = mongoose.model('user',userSchema);