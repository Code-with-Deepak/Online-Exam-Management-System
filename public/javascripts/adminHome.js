        function Logout(){
            var a = confirm("Do you Really want to Logout?");
            if(a == true)
            window.location.href = 'Logout.jsp';
        }
        function frmdisp(){
            var op = document.getElementById("frmdisp").value;
            if(op == 1)
                document.getElementById("viewresult").style.display = "block";
            if(op == 2)
                document.getElementById("viewques").style.display = "block";
        }
        function ViewResult(){
            document.getElementById("viewques").style.display = "none";
            document.getElementById("addques").style.display = "none";
            document.getElementById("viewresult").style.display = "block";
            document.getElementById("viewStudent").style.display = "none";
        }
        function Addques(){
            document.getElementById("viewques").style.display = "none";
            document.getElementById("addques").style.display = "block";
            document.getElementById("viewresult").style.display = "none";
            document.getElementById("viewStudent").style.display = "none";
        }
        function Viewques(){
            document.getElementById("addques").style.display = "none";
            document.getElementById("viewques").style.display = "block";
            document.getElementById("viewresult").style.display = "none";
            document.getElementById("viewStudent").style.display = "none";
        }
        function viewStudent(){
            document.getElementById("addques").style.display = "none";
            document.getElementById("viewques").style.display = "none";
            document.getElementById("viewresult").style.display = "none";
            document.getElementById("viewStudent").style.display = "block";
        }
        function Search() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("UserInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("dbInput");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

        function remove(exid){
            var a = confirm("Do you Want to Delete this exam ? ");
            if(a==true)
            window.location.href = "/deleteexam/"+exid;
        }