var mongoose = require('mongoose'); // Importando mongoose para criar schema

// Criando Schema Tansk
var taskSchema = new mongoose.Schema({
    description: {type: String, required: true},
    owner: {type: String, required: true},
    due_date: Date,
    due_date_string: String,
    status: {type: String, default: ""},
    completed: {type: Boolean, default: false}
});

// Criando Schema Project
var projectkSchema = new mongoose.Schema({
    name: {type: String, required: true},
    tasks: [taskSchema]  
});

// Exportando Schema
module.exports = mongoose.model('project', projectkSchema);
