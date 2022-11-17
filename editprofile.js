
        
    function validateForm(){
        if(!validateusername()){
            return False;
        }

        if(!Validateemail()){
            return False;
        }

        if(!validatePhoneNumber()){
            return False;
        }

        if(!validatestreet()){
            return False;
        }

        if(!validatecity()){
            return False;
        }

        if(!validatestate()){
            return False;
        }

        if(!validatezipcode()){
            return False;
        }
       
    }

    function Validateemail(){    

        var emailID=document.edit.email.value;


        if(!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailID))){
            alert("enter your email ID in correct format");
            return false;

        }
        
        return true;
    }
        
    function validatePhoneNumber() {

        var phonenum=document.edit.phonenumber.value;
        if (/^\d{10}$/.test(phonenum)){
        return true;
        }
        else
        {
        alert("Please enter a valid phone number")
        return false;
        }
    }
      

    function validatezipcode(){
        var zipcod=document.edit.zipcode.value;
        if (/^\d{6}$/.test(zipcod)){
            return true;
            }
            else
            {
            alert("Please enter a valid zipcode")
            return false;
            }

    }

    function validatestreet(){
        var street1=document.edit.street.value;
        if(street1=="" ){
            alert("Please fill the street name")
            return false;
       
        }
        else{
            return true;
        }

    }

    function validateusername(){
        var uname=document.edit.fullname.value;
        if(uname=="" ){
            alert("Please fill the full name")
            return false;
       
        }
        else{
            return true;
        }

    }

    function validatecity(){
        var city=document.edit.city.value;
        if(city=="" ){
            alert("Please fill the city name")
            return false;
       
        }
        else{
            return true;
        }

    }

    function validatestate(){
        var state1=document.edit.state.value;
        if(state1=="" ){
            alert("Please fill the State name")
            return false;
       
        }
        else{
            return true;
        }

    }




    




            