if(window.XMLHttpRequest){
    xmlhttp=new XMLHttpRequest();
}
else{
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.open("GET","tasklist.xml",false);
xmlhttp.send();
xmlDoc=xmlhttp.responseXML;
function displayTask(){   
    document.getElementById("name").innerHTML=xmlDoc.getElementsByTagName("taskname")[0].childNodes[0].nodeValue;
    document.getElementById("Assigned").innerHTML=xmlDoc.getElementsByTagName("AssignedTO")[0].childNodes[0].nodeValue;
    document.getElementById("dec").innerHTML=xmlDoc.getElementsByTagName("description")[0].childNodes[0].nodeValue;
}

function myFunction() {
    alert("Cant add here, Add in dashboard");
  }