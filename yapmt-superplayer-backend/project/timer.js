const Project = require('./project.schema');
const dateFormat = require('dateformat');

class Timer {
	releaseTimer() {
        setInterval(() => {
            Project.find({}).then(projects => {
                let projectsToBeUpdated = [];	
                let flagProject = false;
                projects.forEach(project => {	
                    let tasksToBeUpdated = [];	
                    let flagTask = false;
                    project.tasks.forEach(task => {
                        let date = dateFormat(new Date(), "mm/dd");
                        let taskDate = dateFormat(task.due_date, "mm/dd");
                        if((new Date(task.due_date).getMonth() == new Date().getMonth())){
                            if((new Date(task.due_date).getDate()-new Date().getDate()) == -1 && task.due_date_string != "Yesterday"){
                                task.due_date_string = "Yesterday";
                                flagTask = true;
                            }else if ((new Date(task.due_date).getDate()-new Date().getDate()) == 0 && task.due_date_string != "Today"){
                                task.due_date_string = "Today";
                                flagTask = true;
                            }else if ((new Date(task.due_date).getDate()-new Date().getDate()) == 1 && task.due_date_string != "Tomorrow"){
                                task.due_date_string = "Tomorrow";
                                flagTask = true;
                            }else if (((new Date(task.due_date).getDate()-new Date().getDate()) > 1 || 
                                (new Date(task.due_date).getDate()-new Date().getDate()) < -1) && 
                                task.due_date_string != taskDate){

                                task.due_date_string = taskDate;
                                flagTask = true;
                            }					
                        }
                        if (taskDate < date && task.status != "completed" && task.status != "late") {
                            task.status = "late";		
                            flagTask = true;
                        } else if (taskDate >= date && task.status != "in time"){
                            task.status = "in time";
                            flagTask = true;
                        }
                        if(flagTask){
                            tasksToBeUpdated.push(task);
                            flagProject = true;
                        }			
                    });
                    if(flagProject){
                        project.tasks = tasksToBeUpdated;
                        projectsToBeUpdated.push(project);
                    }
                }); 
                projectsToBeUpdated.forEach(projectUpdate => {
                    projectUpdate.tasks.forEach(task => {
                        Project.updateOne(
                            { '_id': projectUpdate.id, 
                            'tasks._id': task._id },
                            { $set: { 
                                'tasks.$.status': task.status, 
                                'tasks.$.completed': task.completed, 
                                'tasks.$.due_date_string': task.due_date_string 
                            } } ).then( (res, err) => {
                            console.log("Atualizou status de uma task");                          
                        });
                    });                    
                });		
            });            
        }, 60000)
    }    
}

module.exports = new Timer();