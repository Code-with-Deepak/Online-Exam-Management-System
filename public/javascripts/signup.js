         function vali(){
             var cpass = document.forms["frm"]["confirm-password"].value;
             var pass = document.forms["frm"]["password"].value;
             if(pass == cpass)
             return true;
             else{
                 alert("Password And Confirm Password Does Not Match !");
                 return false;
             }
             
         }
         function showMenu1(){
             document.getElementById('signup1').style.display = "block";
             document.getElementById('signup2').style.display = "none";
             document.getElementById('circle1').style.backgroundColor="#00854A";
             document.getElementById('circle1').style.color="white";
             document.getElementById('circle2').style.color="#00854A";
             document.getElementById('circle2').style.backgroundColor="#EBEBEB";
         }
         function showMenu2(){
             document.getElementById('signup1').style.display = "none";
             document.getElementById('signup2').style.display = "block";
             document.getElementById('circle2').style.backgroundColor="#00854A";
             document.getElementById('circle2').style.color="white";
             document.getElementById('circle1').style.color="#00854A";
             document.getElementById('circle1').style.backgroundColor="#EBEBEB";
             document.getElementById('email1').value = document.getElementById('email').value;
             document.getElementById('fname1').value = document.getElementById('fname1').value;
             document.getElementById('pass1').value = document.getElementById('pass').value;
         }
         function checkpage1(){
            if(document.getElementById('fname').value=="" || document.getElementById('email').value=="" || document.getElementById('password').value=="" || document.getElementById('confirm-password').value=="")
            {
                document.getElementById('errors').innerHTML = "All the Basic personal details are required";
                return false;
            }
            else if(document.getElementById('password').value != document.getElementById('confirm-password').value)
            document.getElementById('errors').innerHTML = "Password and Confirm password does'nt match !"
            else
            {
                showMenu2();
            }
         }
         function check(id){
            
            var all = document.getElementById(id).value;
            if(all != ""){
            document.getElementById('errors').innerHTML = "";
            return true;
            }
            else
            document.getElementById('errors').innerHTML = "Please Fill "+id;
         }