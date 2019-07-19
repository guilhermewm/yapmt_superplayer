import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from './appSettings';

@Injectable()
export class ProjectService {
    constructor(private httpClient: HttpClient, private appSettings: AppSettings) { }

    getProjects(){
        return this.httpClient.get(this.appSettings.getBaseUrl() + '');
    }

    createProject(){
        return this.httpClient.post(this.appSettings.getBaseUrl() + '', {"name": ''});
    }

    createTicket(){
        return this.httpClient.post(this.appSettings.getBaseUrl() + '', {"name": '', 'task': ''});
    }

    deleteProject(){
        return this.httpClient.get(this.appSettings.getBaseUrl() + '');
    }
}
