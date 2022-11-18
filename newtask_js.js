function validation(){
    var task_name= document.task.taskName.value;
    var assigned=document.task.assigned_name.value;
    var des=document.task.Description.value;

    if(task_name==""){
        alert("Please enter task name");
        return false;
    }
    if(assigned==""){
        alert("Please enter Team met name");
        return false;
    }
    if(des==""){
        alert("Please enter description");
        return false;
    } 
    window.location.href = "tasklist.html";  
    return true;
    

}