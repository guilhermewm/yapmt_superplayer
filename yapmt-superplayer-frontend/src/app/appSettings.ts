import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class AppSettings {
    private baseUrl : string;

    constructor() {       
        if (environment.production) { 
            this.baseUrl = "http://localhost:3000/"  
        } else {  
            this.baseUrl = "http://localhost:3000/"  
        }
    }

    getBaseUrl() {
        return this.baseUrl;
    }
}
