
            function vali(){
                var rem = document.getElementById('rem').value;
                if(rem <= '0')
                {
                    alert("No more Attempts Allowed");
                    document.getElementById("btn").disabled = true;
                }
                else
                document.getElementById("btn").disabled = false;
            }
            var myfunc = setInterval(function() {
            var stime = document.getElementById('stime').value;
            var stopp = document.getElementById('stop').value;
            var d = new Date().getTime();
            var s = new Date(stime).getTime();
            var e = new Date(stopp).getTime();
            var diff = d - s;
            var ntavail = d - e ;
             var timeleft = s - d;
             var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
             var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
             var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
             if(hours<10 && hours>=0)
             hours="0"+hours;
             if(minutes<10 && minutes>=0)
             minutes="0"+minutes;
             if(seconds<10 && seconds>=0)
             seconds="0"+seconds;
             document.getElementById("clockdiv").innerHTML = "Time Left : "+hours+":"+minutes+":"+seconds;  
             if(hours<=0 && minutes <=0 && seconds<=0)
             {
                 document.getElementById("clockdiv").innerHTML = "Course Started";
             }
            if(diff < 0){
            document.getElementById("msg").innerHTML = "Course Status : Available Soon ";
            document.getElementById("btn").disabled = true;
        }
            else if(diff > 0 && ntavail < 0){
            document.getElementById("msg").innerHTML = "Course Status : Started";
            document.getElementById("btn").disabled = false;
        }
            else{
            document.getElementById("msg").innerHTML = "Course Status : Not Available";
            document.getElementById('clockdiv').innerHTML = "Not Available";
            document.getElementById("btn").disabled = true;
        }
        }, 100)