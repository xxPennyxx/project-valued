<!DOCTYPE html>
<html>
<head>
<title>Dashboard</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" href="images/favicon.png">


<!--Google Fonts-->
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat">



<!--Bootstrap-->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://getbootstrap.com/docs/5.2/assets/css/docs.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js"></script>




<!--Font Awesome-->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<script defer src="https://use.fontawesome.com/releases/v5.0.7/js/all.js"></script>



<!--W3-->

<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">


<!--Stylesheet-->
<link rel="stylesheet" href="styles.css">

<style>
html,body,h1,h2,h3,h4,h5 {font-family: "Montserrat", sans-serif;
font-size: 1.2rem;
}
</style>
<script>
  function myFunction() {
    alert("You can open tasks for each project only");
  }
</script>
</head>
<body class="w3-light-grey">

<!-- Top container -->
<div class="w3-bar w3-top colored-section w3-large" style="z-index:4;">
  <button class="w3-bar-item w3-button w3-hide-large w3-hover-none w3-hover-text-light-grey" onclick="w3_open();"><i class="fa fa-bars"></i>  Menu</button>
  <a href="dashboard.html" class="w3-bar-item w3-left" style="color: white;">ProjectValued</a>
  
  <span class="w3-bar-item w3-right "> Search </span>
</div>
<script>
    document.querySelector(".change").setAttribute("src",<?php $_POST['imgURL'] ?>);



</script>

<!-- Sidebar/menu -->
<nav class="w3-sidebar w3-collapse w3-white w3-animate-left" style="z-index:3;width:300px;" id="mySidebar"><br>
  <div class="w3-container w3-row">
    <div class="w3-col s4">
      <img src="<?php echo $_POST['imgURL']?>" class=" change w3-circle w3-margin-right" style="width:70%">
    </div>

    

    <div class="w3-col s8 w3-bar">
      <span>Welcome, <strong><?php echo $_POST['fullname']?></strong></span><br>
      
    </div>



  </div>
  <hr>
  <div class="w3-container">
  </div>
  <div class="w3-bar-block" >
    <a href="#" class="w3-bar-item w3-button w3-padding-16 w3-hide-large w3-dark-grey w3-hover-black" onclick="w3_close()" title="close menu">   X   Close Menu</a>
    <a onclick="myFunction()" class="w3-bar-item w3-button w3-padding"><i class="fa fa-check fa-fw"></i>  Tasks</a>
    <a href="dashboard.html" data-bs-toggle="modal" data-bs-target="#exampleModal"  class="w3-bar-item w3-button w3-padding"><i class="fa fa-eye fa-fw"></i>  Join Project</a>

    <a href="editprofile.html" class="w3-bar-item w3-button w3-padding"><i class="fa fa-user"></i>   Profile</a>
    <br><br><br><br><br><br><br><br><br>
    <a href="index.html" class="w3-bar-item w3-button w3-padding"><i class="fas fa-arrow-left"></i>  Log Out</a>
  </div>
</nav>


<!--Modal-->

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Enter code to join a project</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <input type="text" name="projectCode" placeholder="eg. XXXX">
      </div>
      <div class="modal-footer">
        <a href="" class="btn btn-danger" >OK</a>
      </div>
    </div>
  </div>
</div>




<!-- Overlay effect when opening sidebar on small screens -->
<div class="w3-overlay w3-hide-large w3-animate-opacity" onclick="w3_close()" style="cursor:pointer" title="close side menu" id="myOverlay"></div>

<!-- !PAGE CONTENT! -->
<div class="w3-main" style="margin-left:300px;margin-top:43px;">

  <!-- Header -->
  

  
     
  <div class="w3-panel row" >

    <div class="col-lg-6 col-md-12 w3-half banana">
    <h1 style="font-size:2rem" id="day"></h1>
      <h1 style="font-size:2.5rem; color:darkgreen" id="today"></h1>
        <h1 style="font-size:2rem;"  id="time"></h1>
    </div> 

    <div class="col-lg-6 col-md-12 w3-half colored-section" style="width:50%; margin:auto; padding: 2rem">
      <h3>Today's progress</h3>
      
        <div class="progress" style="height: 5rem;">
          <div class="progress-bar bg-info progress-bar-striped" role="progressbar" aria-label="Example 20px high" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        </div><br>

        <a class="btn btn-success w3-large" href="/report.html">Generate report</a>
    </div> 

  </div>

<hr>






<div class="w3-container">
  <h1 style="font-size:2rem">Current Projects</h1>
  <ul class="w3-ul w3-card-4 w3-white">
    <li class="w3-padding-16">
      <img src="" class="w3-left w3-circle w3-margin-right" style="width:35px">
      <span class="w3-xlarge">Voice Recognition</span><br>
      <span class="w3-large">Course code: 19CSE305</span>
      <br>
      <div class="w3-grey" style="width:50%; margin:auto;">
        <div class="w3-container w3-center w3-padding w3-green" style="width:25%">25%</div>
      </div>
      <br>
      <p>
        <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample1" role="button" aria-expanded="false" aria-controls="collapseExample">
          View details
        </a>
        
      </p>
      <div class="collapse" id="collapseExample1">
        <div class="card card-body" style="width:75%; margin:auto;">
          It is another advanced-level ML project where you have to deal mostly with audio data.
          Speech emotion recognition attempts to identify and interpret user emotions and deduce the emotional state from speech. 
          To train such an algorithm, you have to use most of the training data as audio data. This system will take user speech as input. 
          <br> <br> <a class="btn btn-success" style="width:40%; margin:auto;" href="v1.html"> Visit project </a>
        <br>
        </div>
      </div>



    </li>
    <li class="w3-padding-16" >
      <img src="" class="w3-left w3-circle w3-margin-right" style="width:35px">
      <span class="w3-xlarge">Email Spam Recognition</span><br>
      <span class="w3-large">Course code: 19CSE305</span>
      <br>
      <div class="w3-grey" style="margin:auto; width:50%">
        <div class="w3-container w3-center w3-padding w3-orange" style="width:50%; ">50%</div>
      </div><br>
      <p>
        <a  class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample2" role="button" aria-expanded="false" aria-controls="collapseExample">
          View details
        </a>
        
      </p>
      <div class="collapse" id="collapseExample2">
        <div class="card card-body" style="width:75%; margin:auto;">
          Mining text is one of the popular computation techniques widely applied in applications like text summarization, topic classification, machine translation, 
                  sentiment analysis, etc. Modern cybersecurity systems are utilizing machine learning methods a lot.
                   Spam filtering also leverages text mining and document classification to segregate legitimate mails and spam emails. <br>
          <br>
                   <a class="btn btn-success"  style="width:40%; margin:auto;" href="v.html"> Visit project </a>
        
        </div>
      </div>
    </li>
    <li class="w3-padding-16">
      <img src="" class="w3-left w3-circle w3-margin-right" style="width:35px">
      <span class="w3-xlarge">Recommendation system</span><br>
      <span class="w3-large">Course code: 19CSE305</span>
      <br>
      <div class="w3-grey" style="margin:auto; width:50%">
        <div class="w3-container w3-center w3-padding w3-red" style="width:75%">75%</div>
      </div><br>
      <p>
        <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample3" role="button" aria-expanded="false" aria-controls="collapseExample">
          View details
        </a>
        
      </p>
      <div class="collapse" id="collapseExample3" >
        <div class="card card-body" style="width:75%; margin:auto;">
          Have you ever seen movies or web series on online streaming platforms? Once you watch one or two of them, 
          you will notice that apps like Netflix and Amazon Prime recommend new web series and movies. 
          It is because these apps render machine learning models that try to understand the customer's taste.  
          All modern apps come with a recommendation engine that suggests users for more engagement.   <br> <br>
          
          <a class="btn btn-success" style="width:40%; margin:auto;" href="v2.html"> Visit project </a>
        <br>
        </div>
      </div>
    </li>


    <li class="w3-padding-16" style="background-color:#ffadc6">
      <img src="" class="w3-left w3-circle w3-margin-right" style="width:35px">
      <span class="w3-xxlarge">Add Project</span><br>
      <span class="w3-large">Click the button below to add a project.</span>
      <br>
      <p>
        <a class="btn btn-success" role="button" href="add_proj.html">
          Add project
        </a>
        
      </p>
      
    </li>
  </ul>
</div>

<hr>





  
<!-- Footer -->
  <footer class="colored-section" id="footer">
    <div class="container-fluid">
      <i class="social-icon  fab fa-facebook-f"></i>
      <i class="social-icon  fab fa-twitter"></i>
      <i class="social-icon  fab fa-instagram"></i>
      <i class="social-icon  fas fa-envelope"></i>
      <p style="color:white; font-size:1.1rem">© Copyright 2022 ProjectValued</p>
    </div>
    </footer>  

<!-- End page content -->
</div>

<script>
// Get the Sidebar
var mySidebar = document.getElementById("mySidebar");

// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");

// Toggle between showing and hiding the sidebar, and add overlay effect
function w3_open() {
  if (mySidebar.style.display === 'block') {
    mySidebar.style.display = 'none';
    overlayBg.style.display = "none";
  } else {
    mySidebar.style.display = 'block';
    overlayBg.style.display = "block";
  }
}

// Close the sidebar with the close button
function w3_close() {
  mySidebar.style.display = "none";
  overlayBg.style.display = "none";
}

function time(){
    var d = new Date();
    var s = d.getSeconds();
    var m = d.getMinutes();
    var h = d.getHours();
    var date = d.getDate();
    var day=d.getDay();
var month = d.getMonth() + 1;
var  year = d.getFullYear();

days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];


document.getElementById("day").innerHTML= days[day];
    document.getElementById("time").innerHTML= ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2);
    document.getElementById("today").innerHTML= date+"."+month+"."+year;
}

function getTime(){

  time();
  setInterval(time,1000);
}

getTime();

</script>

</body>
</html>
