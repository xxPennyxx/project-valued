require('dotenv').config();
let express=require('express');
let bodyParser=require('body-parser');
let ejs = require("ejs");
const mongoose=require('mongoose');
const md5=require('md5');

mongoose.set("strictQuery", false);


mongoose.connect('mongodb://127.0.0.1:27017/projectValuedDB');


let newUsers=[];
let projectList=[];
let currentProject="";
let currTask="";
let currTasks=[];
let checkedTasks=[];
let app=express();
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))


const taskSchema={
  taskName:{
    type: String,
   required:[true, ""]
},
  taskAssignedTo: {
    type: String,
   required:[true, ""]
},
  taskDesc:String
}


const userSchema={

  name:{
    type: String,
   required:[true, ""]
},

email:{
  type: String,
 required:[true, ""]
},
imgURL:String}

const projectSchema={
  projectName:{
    type: String,
   required:[true, ""],
},
  description:String,
  code:{
    type:Number,
    required:[true, ""]
  },
  technologies: String,
  deadline:{
    type: Date,
   required:[true, ""]
},
  courseCode:String,
  mentor: String,
  progress:Number,
  tasks:[taskSchema],
  completedTasks:[taskSchema],
  users:[userSchema]

}

const credsSchema = new mongoose.Schema({
  username: {
    type: String,
   required:[true, ""]
},
  email:{
    type: String,
   required:[true, ""]
},
  password:{
    type: String,
   required:[true, ""]
},
  password1:{
    type: String,
   required:[true, ""]
},
  phonenumber:Number,
  imgURL:String,
  street:String,
  city:String,
  state:String,
  zipcode: Number,
  about: String,
  projects:[projectSchema]
});



const Credential = mongoose.model("Credential", credsSchema);
const Project=mongoose.model("Project",projectSchema)
const Task=mongoose.model("Task",taskSchema)
const User=mongoose.model("User",userSchema)





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
    //console.log(newUsers);

    res.render("editprofile",{newUsers1:newUsers});
  });


  app.post("/signup",function(req,res){

    const newUsername=req.body.username;
    const newEmail=req.body.email;
    const newPassword=req.body.createps;
     const newPassword1=req.body.confirmps;
     // if(!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailID)

    if(newPassword.length>5 && newPassword1.length>5 && newPassword===newPassword1 && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(newEmail)){
      const profile = new Credential({
       username: newUsername,
   email:newEmail,
   password:md5(newPassword),
   password1:md5(newPassword1)
     });
 
   var newUsers=Credential.find({email:newEmail},function(err,foundItems){

    if(foundItems.length===0){
      profile.save();
      //console.log(profile.username+" is a new user!");
      res.redirect("/login");
      

    }
    else{
      //console.log(foundItems[0].username);
      res.redirect("/login")
    }
   });
    
         
  }
  else{
    res.redirect("/signup");
  }
      
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
        newUsers=foundItems;
        //console.log(foundItems[0].projects);
        projectList=foundItems[0].projects;
        res.redirect("/dashboard");
        //console.log(foundItems[foundItems.length-1].username+" is SUS!")
      }

      }) 

    });

   
 
    app.get("/dashboard",function(req,res){
      res.render("dashboard",{newUsers1:newUsers,projectList1:projectList})
  
  
    });



  app.post("/editprofile",function(req,res){
    
     const newFullName=req.body.fullname;
    const newEmail=req.body.email;
    const newPhoneNumber=req.body.phonenumber;
    const newimgURL=req.body.imgURL;
    const newAbout=req.body.about;
    const newStreet=req.body.street;
    const newCity=req.body.city;
    const newState=req.body.state;
    const newZipcode=req.body.zipcode;
    const profileToUpdate=req.body.update;
    
    

   Credential.updateOne({username: profileToUpdate}, {username:newFullName, 
    email:newEmail,
    phonenumber:newPhoneNumber,
    imgURL:newimgURL,
    street:newStreet,
    city:newCity,
    state:newState,
    zipcode:newZipcode,
    about:newAbout
  }, function(err,updatedData){
    if(err){
      //console.log(":/")
    }
    else
    {
      //console.log("Edited profile of "+profileToUpdate);
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

  app.get("/addproject",function(req,res){
    res.render("add_proj",{newUsers1:newUsers});
  })


  app.post("/addproject",function(req,res){

    const projName=req.body.projName;
    const desc=req.body.Description;
    const tech=req.body.tech;
    const date=req.body.date;
    const courseMentor=req.body.mentor;
    const course=req.body.course;
    const projCode=Math.floor(Math.random()*10000);
    const projectOwner=req.body.add;
    var currProgress=0;
    let today= new Date();

    if((new Date(date)>today)){


    const newProjectUser=new User({
      name:newUsers[0].username,
      email:newUsers[0].email,
      imgURL:newUsers[0].imgURL
    })
    newProjectUser.save();




    const newProject=new Project({
      projectName:projName,
      description:desc,
      code:projCode,
      technologies:tech,
      deadline:date,
      courseCode:course,
      mentor:courseMentor,
      progress:currProgress,
      tasks:[],//whenever we're creating a new project, progress gets init'd to 0 and tasks empty
      completedTasks:[],
      users:[newProjectUser]
    });
    newProject.save();//add that to project pool

   

    Credential.findOne({username:projectOwner},function(err,foundItems){

      if(!err){
        foundItems.projects.push(newProject);
        //foundItems.users.push(newProjectUser);
        foundItems.save();
        //console.log(projectList);
        //res.redirect("/projects/"+newProject._id);
      }
    })
    //now add that to the current user's project list
    Credential.updateOne({username:projectOwner},{projects:projectList},function(err,updatedData){
      if(!err){

          

            }
    
          });



          Credential.findOne({username:projectOwner},function(err,foundItems){

            if(!err){
              projectList.push(newProject);

              res.redirect("/dashboard");

            }
          })
        }
        else{
          res.redirect("/addproject");
        }
      });



      app.get("/projects/:projectId",function(req,res){

        const requestedId=req.params.projectId;
      
        Project.findOne({_id:requestedId},function(err,foundProject){
          if(!(err)){
            //console.log(foundProject);
            currentProject=requestedId;
            res.render("project",{ foundProject1:foundProject, newUsers1:newUsers });
            
          }
        })
      
      
        })


      app.get("/projects/:projectId/addtask",function(req,res){

       let currentProject=req.params.projectId;
      
        res.redirect("/addtask")



      })

      app.get("/addtask",function(req,res){


        Project.findOne({_id:currentProject},function(err,foundProject){
          if(!(err)){
            //console.log(foundProject);
            res.render("newtask",{ foundProject1:foundProject, newUsers1:newUsers });
            
          }
        })

      })

      app.post("/addtask",function(req,res){
        const projectId=req.body.addtask;

        const taskname=req.body.taskName;
        const assignedTo=req.body.assigned_name;
        const desc=req.body.Description;

        if((taskname) && (assignedTo)){

        const newTask=new Task({
          taskName:taskname,
          taskAssignedTo: assignedTo,
          taskDesc:desc

        });


        newTask.save();//VERY IMPORTANT!!!!!!!!!!!!
        

        Project.findOne({_id:projectId},function(err,foundProject){

          if(!err)
          {
            //console.log(foundProject);
            foundProject.tasks.push(newTask);
            foundProject.save();
            res.redirect("/projects/"+projectId+"/tasklist");

          }


        })
      }
      else{
        res.redirect("/addtask")
      }


      })



      app.get("/projects/:projectId/tasklist",function(req,res){

        let currentProject=req.params.projectId;

        Project.findOne({_id:currentProject},function(err,foundProject){
          if(!(err)){
            //console.log(foundProject);
            res.render("tasklist",{ foundProject1:foundProject, newUsers1:newUsers });
            
          }
        })
      
 
       })

       app.post("/completed",function(req,res){


        const deletedTask=req.body.delete;
        const projectTasksCompleted=req.body.projectName;
        //console.log("Task completed:"+deletedTask);
        //console.log("Current project:"+projectTasksCompleted);



        
        Task.findOne({_id:deletedTask},function(err,foundTask){
          if(!err)
          currTask=foundTask;
          //console.log(currTask);
        })


        Project.findOneAndUpdate({_id: projectTasksCompleted}, {$pull: {tasks: {_id: deletedTask}}}, function(err, deletedItems){
          if (!err){
            //console.log("Deleted task "+deletedItems);
          }
        });

        
        Project.findOne({_id:projectTasksCompleted},function(err,foundProject){
          if(!err)
          {
            

                foundProject.completedTasks.push(currTask);
                // console.log(foundProject);
                // console.log("Completed tasks:");
                // console.log(foundProject.completedTasks);
              foundProject.progress=foundProject.completedTasks.length/(foundProject.completedTasks.length+foundProject.tasks.length)*100;
              foundProject.progress=Math.round(foundProject.progress).toFixed(2);
              foundProject.save();
              res.redirect("/projects/"+projectTasksCompleted+"/tasklist");

             
          }
        })

       })


       app.post("/changedmymind",function(req,res){


        const undeletedTask=req.body.back;
        const projectTasksCompleted=req.body.projectName;
        // console.log("Task NOT completed:"+undeletedTask);
        // console.log("Current project:"+projectTasksCompleted);



        
        Task.findOne({_id:undeletedTask},function(err,foundTask){
          if(!err)
          currTask=foundTask;
          //console.log(currTask);
        })


        Project.findOneAndUpdate({_id: projectTasksCompleted}, {$pull: {completedTasks: {_id: undeletedTask}}}, function(err, deletedItems){
          if (!err){
            //console.log("NOT Deleted task "+deletedItems);
          }
        });

        
        Project.findOne({_id:projectTasksCompleted},function(err,foundProject){
          if(!err)
          {
            

                foundProject.tasks.push(currTask);
                // console.log(foundProject);
                // console.log("UN-Completed tasks:");
                // console.log(foundProject.tasks);
              foundProject.progress=foundProject.completedTasks.length/(foundProject.completedTasks.length+foundProject.tasks.length)*100;
              foundProject.save();
              res.redirect("/projects/"+projectTasksCompleted+"/tasklist");

             
          }
        })

       })




       app.post("/joinproject",function(req,res){
        const projectToJoin=req.body.projectCode;
        
        Project.findOne({code:projectToJoin},function(err,foundProject){

          //console.log("Project to join:"+foundProject._id);

          if(err){
            //console.log("Project does not exist")
            res.redirect("/dashboard")
          }
              else    {

                if(foundProject.users.length<=5){

                  var exists=false;
                  for(var j=0;j<newUsers[0].projects.length;j++){
                    //console.log(newUsers[0].projects[j]._id)

                    if(foundProject.projectName==newUsers[0].projects[j].projectName){
                      exists=true;
                      break;
                    }
                    
                  }


                if(exists==false){

                  //console.log("Project NOT exists!")

                  newUsers[0].projects.push(foundProject);
                  newUsers[0].save();
                  //console.log("added project "+foundProject.projectName);


                const newProjectUser=new User({
                  name:newUsers[0].username,
                  email:newUsers[0].email,
                  imgURL:newUsers[0].imgURL
                })
                newProjectUser.save();
            //console.log("In project: "+foundProject.projectName);
            



             

                foundProject.users.push(newProjectUser);
                foundProject.save();
                res.redirect("/projects/"+foundProject._id);
                }
                else{
                  //console.log("Project exists!")
                  res.redirect("/dashboard");
    
                }

            }
            
            

           
          }
          

        })

       })


       app.post("/deleteproject",function(req,res){

        const p=req.body.deleteProject;
        const owner=req.body.projectOwner;
        Credential.findOneAndUpdate({_id: owner},{$pull: {projects: {_id: p}}},function(err,updatedData){
          if(!err){
            //console.log("Deleted project "+p)
           
          }
        })




        Credential.findOne({_id:owner},function(err,foundItems){

          if(!err){
            projectList=foundItems.projects;
            res.redirect("/dashboard");

          }
        })
       })






  
  app.listen(3000, function() {
     console.log("Project management made easier @  http://localhost:3000/");
     });

