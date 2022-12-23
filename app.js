let express=require('express');
let bodyParser=require('body-parser');
let ejs = require("ejs");
const mongoose=require('mongoose');
mongoose.set("strictQuery", false);


mongoose.connect('mongodb://127.0.0.1:27017/projectValuedDB');


let newUsers=[];
let loggedInUsers=[];

let app=express();
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))



const credsSchema = {
  username: String,
  email:String,
  password:String,
  password1:String,
  phonenumber:Number,
  imgURL:String,
  address:String,
  city:String,
  state:String,
  zipcode: Number,
  about: String
};

const Credential = mongoose.model("Credential", credsSchema);



app.get("/",function(req,res){
    res.render("index");
  });


  app.get("/login",function(req,res){
    res.render("login");
  
  });
  app.get("/signup",function(req,res){
    res.render("signup");
  });
 

  app.get("/editprofile",function(req,res){
    res.render("editprofile",{newUsers1:newUsers});
  });


  app.post("/signup",function(req,res){

    const newUsername=req.body.username;
    const newEmail=req.body.email;
    const newPassword=req.body.createps;
     const newPassword1=req.body.confirmps;
      const profile = new Credential({
       username: newUsername,
   email:newEmail,
   password:newPassword,
   password1:newPassword1
     });
 
   var newUsers=Credential.find({email:newEmail},function(err,foundItems){

    if(foundItems.length===0){
      profile.save();
      console.log(profile.username+" is a new user!");
      res.redirect("/login");


    }
    else{
      //console.log(foundItems[0].username);
      res.redirect("/login")
    }
   });
    
         
 
      
   });


   app.get("/dashboard",function(req,res){
    res.render("dashboard",{newUsers1:newUsers})


  });

  app.post("/login",function(req,res){


    
    const loginEmail=req.body.email;
    const loginpwd=req.body.password;
    var LoggedInUsers=Credential.find({email:loginEmail, password: loginpwd}, function(err,foundItems){
      

      if(foundItems.length===0){  
        //console.log("Invalid User")
        res.redirect("/login");
      }
      else
      {
        newUsers=foundItems;
        res.redirect("/dashboard");
        //console.log(foundItems[foundItems.length-1].username+" is SUS!")
      }

      }) 

    });

   
 




  app.post("/editprofile",function(req,res){
    
     const newFullName=req.body.fullname;
    const newEmail=req.body.email;
    const newPhoneNumber=req.body.phonenumber;
    const newimgURL=req.body.imgURL;
    const newAbout=req.body.about;
    const newAddress=req.body.address;

    const newStreet=req.body.street;
    const newCity=req.body.city;
    const newState=req.body.state;
    const newZipcode=req.body.zipcode;
    const profileToUpdate=req.body.update;
    
    

   Credential.updateOne({username: profileToUpdate}, {username:newFullName, 
    email:newEmail,
    phonenumber:newPhoneNumber,
    imgURL:newimgURL,
    address:newAddress,
    city:newCity,
    state:newState,
    zipcode:newZipcode,
    about:newAbout
  }, function(err,updatedData){
    if(err){
      console.log(":/")
    }
    else
    {
      console.log("Edited profile of "+profileToUpdate);
      Credential.find({username:newFullName},function(err,foundItems){
        if(!err){
          newUsers=foundItems;
          //console.log(newUsers);
        //.log(updatedData);
      res.redirect("/dashboard");

        }

      });
      
    }

   })
    


  })



  app.listen(3000, function() {
     console.log("Project management made easier @  http://localhost:3000/");
     });

