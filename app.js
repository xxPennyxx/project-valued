let express=require('express');
let bodyParser=require('body-parser');
let ejs = require("ejs");
const mongoose=require('mongoose');
let newUsers=[]
mongoose.set("strictQuery", false);


mongoose.connect('mongodb://127.0.0.1:27017/projectValuedDB');

/*
let newUsers=[];
let loggedInUsers=[];
let EditedProfiles=[];
*/
let app=express();
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))



const credsSchema = {
  username: String,
  email:String,
  password:String,
  password1:String
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
    res.render("editprofile",{newUsers1:newUsers, EditedProfiles1:EditedProfiles});
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
 
   var newUsers=Credential.find({},function(err){});
    
         profile.save();
         res.redirect("/dashboard")
 
      
   });


   app.get("/dashboard",function(req,res){
    res.render("dashboard",{newUsers1:newUsers, EditedProfiles1: newUsers});

  });

  // app.post("/login",function(req,res){



  //  const newUsername=req.body.username;
  //  const newEmail=req.body.email;
  //  const newPassword=req.body.createps;
  //   const newPassword1=req.body.confirmps;
  //    const profile = new Credential({
  //     username: newUsername,
  // email:newEmail,
  // password:newPassword,
  // password1:newPassword1
  //   });

    
  //   const loginEmail=req.body.email1;
  //   const loginpwd=req.body.password1;
  //   Credential.find({email:loginEmail}, function(err,foundCredentials){
  //     if(err)
  //     console.log("WG");
  //     else if (!(foundCredentials)){
  //       profile.save();


  //       res.redirect("/dashboard")


  //     }
     

  //   })
     
  // });

  
  
 




  app.post("/editprofile",function(req,res){
    const newEditedUser={
        fullname:req.body.fullname,
    email:req.body.email,
    phonenumber:req.body.phonenumber,
    imgURL:req.body.imgURL,
    about:req.body.about,
    street:req.body.street,
    city:req.body.city,
    state:req.body.state,
    zipcode:req.body.zipcode
     } ;
    
     EditedProfiles.push(newEditedUser);

     //console.log(newEditedUser);
     res.redirect("/dashboard");
  })








  app.listen(3000, function() {
     console.log("Project management made easier @  http://localhost:3000/");
     });

