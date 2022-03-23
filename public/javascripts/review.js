alert("Helo");
var total = document.getElementById('total').value;
var totalint = parseInt(total);
for(var i=1;i<=totalint;i++)
{
    var str = "answer"+i;
    var stat = "status"+i;
    document.getElementById(stat).innerHTML = await localStorage.getItem(str);
}