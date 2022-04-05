var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
require('dotenv').config();
const adminAuth = require('../controller/adminAuth.js');
const User = require('../controller/user.js');

router.post('/login', async(req, res, next) => {
  var regno = req.body.regno;
  var pass = req.body.pass;
  var tokenfrommail = req.body.token;
  const regnofind = await User.findOne({"regno":regno});
  var fromdb = regnofind.regno;
  if(fromdb.includes(regno))
  {
    const passworddecrpt = await bcrypt.compare(pass,regnofind.password);
    if(passworddecrpt){
      const token = jwt.sign(
        { regno },
        "token123",
        {
          expiresIn: "2h",
        }
      );
      User.token = token;
      if(token == tokenfrommail || User.token){
        req.session.loggedIn = true
        req.session.email = regnofind.email;
        req.session.regno = regnofind.regno;
        req.session.name = regnofind.Name;
        req.session.dept = regnofind.dept;
        req.session.year = regnofind.year;
      res.redirect('/studentHome');
      }
      else
      res.send("Token Required");
    }
    else
    res.send("Incorrect Password");
  }
  else
  res.send("User Not Found!");

});

router.post('/admin',async (req,res,next) => {
  try {
    var adminid = req.body.regno;
  var apass = req.body.pass;
  var adminidvali = await adminAuth.findOne({adminid});
  var fromdb = adminidvali.username;
  if(fromdb.includes(adminid))
  {
    if(apass.includes(adminidvali.password))
    {
            req.session.loggedIn = true
            req.session.aname = adminidvali.username;
      res.redirect('/adminHome');
    }
    else
    res.render('admin.ejs',{message:"Incorrect password"});
  }
  else
  res.render('admin.ejs',{message:"Admin not found!"});
    
  } catch (error) {
    console.log(error);
  }
  

})

function mailSender(mail_id,regno,pass,token){
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
    subject:'Welcome to Online EMS',
    html:'Your Account Activated successfully <form action="http://localhost:3000/login" method="post" ><input type="hidden" value="'+regno+'" name="regno"> <input type="hidden" value="'+pass+'" name="pass" <input type="hidden" value="'+token+'" name="token"> <input style="background-color:#00854A;color:white; padding:10px" type="submit" value="Activate">'
}

transpoter.sendMail(mailOption,(err,result)=>{
    if(err)
    {
        console.log(err);
    }
    else
    res.render('index.ejs',{message:"Activation Link sent to Mail Id"});
});
}

router.post('/signup',async (req,res,next) => {
  try {
      var fname = req.body.uname;
      var email = req.body.email;
      var password = req.body.password;
      var dept = req.body.dpt;
      var year = req.body.year;
      var regno = req.body.rollno;
      var mbl = req.body.mbl;
      const salt = await bcrypt.genSalt(10);
      const password1 = await bcrypt.hash(password, salt);
      const already = await User.findOne({regno});
      if(already)
        res.render('index.ejs',{message:"User Already exist please Login In"});
      else{
      if(User.create([
        {"Name":fname,
        "dept":dept,
        "year":year,
        "regno":regno,
        "email":email[0],
        "mobile":mbl,
        "password":password1},
      ]))
      {
        const token = jwt.sign(
          { email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        User.token = token;
        mailSender(email,regno,password,token);
    res.render('index.ejs',{message:"Activation Link sent to Mail Id"});
      }
      else
      res.send("Error uploading to database");
    }
  } catch (error) {
    console.log(error);
    res.end();
  }
})

module.exports = router;
