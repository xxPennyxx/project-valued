let express=require('express');
let bodyParser=require('body-parser');
let ejs = require("ejs");
const mongoose=require('mongoose');
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



const profileSchema={
  credentials:credsSchema,//relationship b/w credentials and actual profile
  phonenumber:Number,
  imgURL:String,
  address:String,
  city:String,
  state:String,
  zipcode: Number,
  about: String

}

const Profile = mongoose.model("Profile", profileSchema);


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
    res.render("editprofile",{newUsers1:[], EditedProfiles1:[]});
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
 
   var newUsers=Credential.find({username:newUsername, email:newEmail},function(err,foundItems){

    if(foundItems.length===0){
      profile.save();
      console.log(profile.username+" is a new user!");
      res.redirect("/login");
      //res.render("dashboard",{newUsers1:foundItems, EditedProfiles1: foundItems})


    }
    else{
      //console.log(foundItems[0].username);
      res.redirect("/login")
    }
   });
    
         
 
      
   });


   app.get("/dashboard",function(req,res){
    //res.render("dashboard");

  });

  app.post("/login",function(req,res){


    
    const loginEmail=req.body.email;
    const loginpwd=req.body.password;
    var LoggedInUsers=Credential.find({email:loginEmail}, function(err,foundItems){
      

      if(foundItems.length===0){  
        //console.log("Invalid User")
        res.redirect("/login");
      }
      else
      {
        //console.log(foundItems[foundItems.length-1].username+" is SUS!")
        res.render("dashboard",{newUsers1:foundItems, EditedProfiles1: foundItems})
      }

      }) 

    });

   
 




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

