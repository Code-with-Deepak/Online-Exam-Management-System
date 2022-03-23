var mongoose = require('mongoose');

var adminSchema = mongoose.Schema({
    username:{type:String,default:"Admin"},
    password:{type:String,default:"123"},
});

module.exports = mongoose.model('adminAuth',adminSchema);