let express=require('express');
let bodyParser=require('body-parser');
let ejs = require("ejs");

let newUsers=[];
let loggedInUsers=[];
let EditedProfiles=[];

let app=express();
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))

app.get("/",function(req,res){
    res.render("index");
  });


  app.get("/login",function(req,res){
    res.render("login");
  });

  
  app.get("/dashboard",function(req,res){
    res.render("dashboard",{newUsers1:newUsers,EditedProfiles1:EditedProfiles});
  });

  app.get("/editprofile",function(req,res){
    res.render("editprofile",{newUsers1:newUsers, EditedProfiles1:EditedProfiles});
  });



  app.post("/login",function(req,res){
    const newUser={
        username:req.body.username,
    email:req.body.email,
    password:req.body.createps,
    password1:req.body.confirmps
     } ;
            var at=newUser.email.indexOf('@');
            var dot=newUser.email.lastIndexOf('.');
            if(!((at==-1)||(dot==-1)||(dot-at<2)||(newUser.password!=newUser.password1))){
                newUsers.push(newUser);
                const loggedInUser={

                    email:req.body.email,
                password:req.body.createps,
            
                 }
            
                 if((newUser.email===loggedInUser.email) && (newUser.password===loggedInUser.password) )
                 {
                    //console.log(loggedInUser);
                    res.redirect("/dashboard");
                 }

            }
           
     
  })





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



  