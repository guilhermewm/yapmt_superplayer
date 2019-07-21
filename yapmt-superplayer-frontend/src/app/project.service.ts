import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from './appSettings';

@Injectable()
export class ProjectService {
    constructor(private httpClient: HttpClient, private appSettings: AppSettings) { }

    getProjects(){
        return this.httpClient.get(this.appSettings.getBaseUrl() + 'projects');
    }

    getProject(name){
        return this.httpClient.get(this.appSettings.getBaseUrl() + 'project/' + name);
    }

    createProject(name){
        return this.httpClient.post(this.appSettings.getBaseUrl() + 'createProject', {"name": name});
    }

    createTask(name, task){
        return this.httpClient.post(this.appSettings.getBaseUrl() + 'createTask', {"name": name, 'task': task});
    }

    completeTask(name, id){
        return this.httpClient.post(this.appSettings.getBaseUrl() + 'updateTask', {"name": name, '_id': id});
    }

    deleteProject(id){
        return this.httpClient.delete(this.appSettings.getBaseUrl() + 'deleteProject/' + id);
    }
}