
var express = require('express');
var router = express.Router();
const ProjectController = require("../project/project.controller");

router.get('/',function(req, res){
    res.send("API funcionando");
})

router.get("/projects", ProjectController.getProjects);
router.get("/project/:name", ProjectController.getProject);

router.post("/createProject", ProjectController.createProject);
router.post("/createTask", ProjectController.createTask);
router.post("/updateTask", ProjectController.completeTask);

router.delete("/deleteProject/:id", ProjectController.deleteProject);



module.exports = router;