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
