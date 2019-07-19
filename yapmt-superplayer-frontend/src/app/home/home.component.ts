import { Component, OnInit, NgZone, Input, ViewChild, Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProjectService } from '../project.service';

export interface Projects {
  nome: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ProjectService]
})

export class HomeComponent{
  
  constructor(private projectsService: ProjectService) {   
    this.projectsService.getProjects().subscribe(res => {})
  }
  
}