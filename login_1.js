const container = document.querySelector(".container"),
      pwShowHide = document.querySelectorAll(".showHidePw"),
      pwFields = document.querySelectorAll(".password"),
      signUp = document.querySelector(".signup-link"),
      login = document.querySelector(".login-link");

    //   js code to show/hide password and change icon
    pwShowHide.forEach(eyeIcon =>{
        eyeIcon.addEventListener("click", ()=>{
            pwFields.forEach(pwField =>{
                if(pwField.type ==="password"){
                    pwField.type = "text";

                    pwShowHide.forEach(icon =>{
                        icon.classList.replace("uil-eye-slash", "uil-eye");
                    })
                }else{
                    pwField.type = "password";

                    pwShowHide.forEach(icon =>{
                        icon.classList.replace("uil-eye", "uil-eye-slash");
                    })
                }
            }) 
        })
    })


    function validateAll()
    {
        // var acc=[
        //     ['yashavi@gmail.com','yashasvi']
        //     ['lohith@gmail.com','lohith']
        //     ['deepthi@gmail.com','deepthi']
        //     ['vaidehi@gmail.com','vaidehi']
        // ]
        var usernames=['yashasvi@gmail.com','lohith@gmail.com','deepthi@gmail.com','vaidehi@gmail.com']
        var pass=['yashasvi','lohith','deepthi','vaidehi']

        var emailID=document.loginForm.email.value;
        var password=document.loginForm.password.value;
        

        var at=emailID.indexOf('@');
        var dot=emailID.lastIndexOf('.')
        var mail=usernames.indexOf(emailID)
        if((at==-1)||(dot==-1)||(dot-at<2)||(mail==-1)){
            alert("You have entered an invalid email address!");
            return false;
        }

        if (password === pass[mail]){
            emailID=emailID.substring(0,at);
            window.location.href= "dashboard.html?uname="+emailID;
            return true;
        }
        else{ 
            alert("You have entered wrong password");
            return false;
        }
        
    }


// Signup page validation

       function Validate1(){
        ValidateUsername();
        Validateemail();
        ValidatePass();
        validatecheck();
     
         }

         function validatecheck(){
            if (!document.signupform.checkbox.checked)
            {
                alert("You must agree to the terms");
                return false;
            }
         }


        function ValidatePass(){
            if (document.signupform.createps.value === document.signupform.confirmps.value){
               
            return true;
            }
            else{
                alert("The passwords doesn't match");
                return false;
            }
        }


        function Validateemail(){    
            

            var emailID=document.signupform.email.value;
            

            if(!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailID))){
                alert("Enter your email ID in correct format");
                return false;

            }
          
            return true;
        }
        function ValidateUsername(){
            var uname=document.signupform.username.value;
            if(uname==""){
                alert("Please enter the full name")
                return false;}
                
             else{
                return true;
                    }
                
            }
        
            

    
    


    
    // js code to appear signup and login form
    signUp.addEventListener("click", ( )=>{
        container.classList.add("active");
    });
    login.addEventListener("click", ( )=>{
        container.classList.remove("active");
    });
