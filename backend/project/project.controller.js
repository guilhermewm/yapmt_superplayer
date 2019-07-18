const Project = require('./project.schema');
const dateFormat = require('dateformat');

class ProjectController {	

	async getProjects(req, res) {
		try{
			const resultProject = await Project.find({});		
			if (!resultProject){
				return res.status(401).json({ message: "Erro" });
			}			
			return res.status(200).json(newProjects);
		} catch (err){
			if(err){
				return res.status(401).json({ message: err.reason.message });
			}
			return res.status(401).json({ message: "Erro"});
		}		
	}


	async createProject(req, res) {
			const { name } = req.body;
			if (!name){
				return res.status(401).json({ message: "Erro" });
			}			
		try{
			const project = await Project.find({'name': name});
			if (project[0]){
				return res.status(401).json({ message: "Projeto já existente" });
			}
			const newProject = new Project({'name': name});
			const resultProject = await newProject.save();
			if (!resultProject){
				return res.status(401).json({ message: "Erro" });
			}
			return res.status(200).json({ message: "Projeto criado" });
		} catch (err){
			if(err){
				return res.status(401).json({ message: err.reason.message });
			}
			return res.status(401).json({ message: "Erro"});
		}
	}

	async completeTask(req, res) {
		const { _id, name } = req.body;
		if (!_id || !name) {
			return res.status(401).json({ message: "Erro" });
		}
		try {
			const resultTask = await Project.update({ 'name': name, 'tasks.id': _id }, { $set: { 'completed': true, 'status': 'completed' } });
			if (!resultTask){
				return res.status(401).json({ message: "Erro" });
			}
			return res.status(200).json({ message: resultTask});	
		} catch (err){
			if(err){
				return res.status(401).json({ message: err.reason.message });
			}
			return res.status(401).json({ message: "Erro"});
		}
	}

	async createTask(req, res) {
		const { task, name } = req.body;
		if (!task || !task.description || !task.owner || !task.due_date || !name){
			return res.status(401).json({ message: "Erro" });
		}
		// Temporario		
		task.due_date = new Date();	
		try {
			let date = dateFormat(new Date(), "dd/mm");
			let taskDate = dateFormat(task.due_date, "dd/mm");
			task.due_date_string = taskDate;
			if((new Date(task.due_date).getMonth() == new Date().getMonth())){
				if((new Date(task.due_date).getDate()-new Date().getDate()) == -1){
					task.due_date_string = "Yesterday";
				}else if ((new Date(task.due_date).getDate()-new Date().getDate()) == 0){
					task.due_date_string = "Today";
				}else if ((new Date(task.due_date).getDate()-new Date().getDate()) == 1){
					task.due_date_string = "Tomorrow";
				}else if (((new Date(task.due_date).getDate()-new Date().getDate()) > 1 || 
				(new Date(task.due_date).getDate()-new Date().getDate()) < -1) && 
				task.due_date_string != taskDate){

				task.due_date_string = taskDate;
				flagTask = true;
			}					
			}
			if (taskDate < date && task.status != "completed") {
				task.status = "late";
			} else if (taskDate >= date){
				task.status = "in time";
			}
			const resultProject = await Project.update({ 'name': name }, { $push: { 'tasks': task } });
			if (!resultProject){
				return res.status(401).json({ message: "Erro" });
			}
			return res.status(200).json({ message: "Task criada" });	
		} catch (err){
			if(err){
				return res.status(401).json({ message: err.reason.message });
			}
			return res.status(401).json({ message: "Erro"});
		}
	}

	async deleteProject(req, res) {
		const { name } = req.body;
		if (!name){
			return res.status(401).json({ message: "Erro" });
		}
		const project = await Project.find({'name': name});
		if (!project[0]){
			return res.status(401).json({ message: "Projeto inexistente" });
		}
		try {			
			const resultProject = await Project.findOneAndRemove({'name': name});
			if (!resultProject){
				return res.status(401).json({ message: "Erro" });
			}
			return res.status(200).json({ message: "Projeto removido" });	
		} catch (err){
			if(err){
				return res.status(401).json({ message: err.reason.message });
			}
			return res.status(401).json({ message: "Erro"});
		}
	}	
}

module.exports = new ProjectController();