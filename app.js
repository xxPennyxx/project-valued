let express=require('express');
let bodyParser=require('body-parser');
let ejs = require("ejs");
const mongoose=require('mongoose');
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
  taskName:String,
  taskAssignedTo: String,
  taskDesc:String
}

const projectSchema={
  projectName:String,
  description:String,
  code:Number,
  technologies: String,
  deadline:String,
  courseCode:String,
  mentor: String,
  progress:Number,
  tasks:[taskSchema],
  completedTasks:[taskSchema]

}

const credsSchema = {
  username: String,
  email:String,
  password:String,
  password1:String,
  phonenumber:Number,
  imgURL:String,
  street:String,
  city:String,
  state:String,
  zipcode: Number,
  about: String,
  projects:[projectSchema]
};


const Credential = mongoose.model("Credential", credsSchema);
const Project=mongoose.model("Project",projectSchema)
const Task=mongoose.model("Task",taskSchema)



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
      const profile = new Credential({
       username: newUsername,
   email:newEmail,
   password:newPassword,
   password1:newPassword1
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
    const newProject=new Project({
      projectName:projName,
      description:desc,
      code:projCode,
      technologies:tech,
      deadline:date,
      courseCode:course,
      mentor:courseMentor,
      progress:currProgress,
      tasks:[]//whenever we're creating a new project, progress gets init'd to 0 and tasks empty
    });
    newProject.save();//add that to project pool




    Credential.findOne({username:projectOwner},function(err,foundItems){

      if(!err){
        foundItems.projects.push(newProject);
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

        const newTask=new Task({
          taskName:taskname,
          taskAssignedTo: assignedTo,
          taskDesc:desc

        });


        newTask.save();//VERY IMPORTANT!!!!!!!!!!!!
        

        Project.findOne({_id:projectId},function(err,foundProject){

          if(!err)
          {
            console.log(foundProject);
            foundProject.tasks.push(newTask);
            foundProject.save();
            res.redirect("/projects/"+projectId+"/tasklist");

          }


        })


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
        console.log("Task completed:"+deletedTask);
        console.log("Current project:"+projectTasksCompleted);



        
        Task.findOne({_id:deletedTask},function(err,foundTask){
          if(!err)
          currTask=foundTask;
          console.log(currTask);
        })


        Project.findOneAndUpdate({_id: projectTasksCompleted}, {$pull: {tasks: {_id: deletedTask}}}, function(err, deletedItems){
          if (!err){
            console.log("Deleted task "+deletedItems);
          }
        });

        
        Project.findOne({_id:projectTasksCompleted},function(err,foundProject){
          if(!err)
          {
            

                foundProject.completedTasks.push(currTask);
                console.log(foundProject);
                console.log("Completed tasks:");
                console.log(foundProject.completedTasks);
              foundProject.progress=foundProject.completedTasks.length/(foundProject.completedTasks.length+foundProject.tasks.length)*100;
              foundProject.save();
              res.redirect("/projects/"+projectTasksCompleted+"/tasklist");

             
          }
        })

       })


       app.post("/changedmymind",function(req,res){


        const undeletedTask=req.body.back;
        const projectTasksCompleted=req.body.projectName;
        console.log("Task NOT completed:"+undeletedTask);
        console.log("Current project:"+projectTasksCompleted);



        
        Task.findOne({_id:undeletedTask},function(err,foundTask){
          if(!err)
          currTask=foundTask;
          console.log(currTask);
        })


        Project.findOneAndUpdate({_id: projectTasksCompleted}, {$pull: {completedTasks: {_id: undeletedTask}}}, function(err, deletedItems){
          if (!err){
            console.log("NOT Deleted task "+deletedItems);
          }
        });

        
        Project.findOne({_id:projectTasksCompleted},function(err,foundProject){
          if(!err)
          {
            

                foundProject.tasks.push(currTask);
                console.log(foundProject);
                console.log("UN-Completed tasks:");
                console.log(foundProject.tasks);
              foundProject.progress=foundProject.completedTasks.length/(foundProject.completedTasks.length+foundProject.tasks.length)*100;
              foundProject.save();
              res.redirect("/projects/"+projectTasksCompleted+"/tasklist");

             
          }
        })

       })











  
  app.listen(3000, function() {
     console.log("Project management made easier @  http://localhost:3000/");
     });

