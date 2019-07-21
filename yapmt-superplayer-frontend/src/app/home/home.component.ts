import { Component, OnInit, NgZone, Input, ViewChild, Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProjectService } from '../project.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogProject } from './dialogProject';
import { DialogTask } from './dialogTask';
import { DialogConfirm } from './dialogConfirm';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ProjectService]
})


export class HomeComponent {
  
  projects: any;
  projectSelected: any;

  constructor(private projectsService: ProjectService, public dialog: MatDialog) {   
  }
  
  current_selected: string;

  onSelection(e, v){
    this.projectsService.completeTask(this.projectSelected.name, e.option.value).subscribe(res => {
      let result: any = res;
      if (result) {
        this.openProject(this.projectSelected.name);
      }
    })
  }
  
  openProject(name) {
    this.projectsService.getProject(name).subscribe(res => {
      if(res){
        this.projectSelected = res;
        let result: any = res;
        if (result.tasks){
          let completed = 0;
          let late = 0;
          let total = result.tasks.length;
          result.tasks.forEach(task => {
            if(task.status == 'completed' || task.completed){
              completed++;
            }else if (task.status == 'late') {
              late++;
            }
          });
          this.projectSelected.statusFinal = completed + '/' + late + '/' + total;
        }        
      }
    })
  }

  get sortTasks() {
    return this.projectSelected.tasks.sort((a, b) => {
      return <any>new Date(a.due_date) - <any>new Date(b.due_date);
    });
  }

  deleteProject () {
    this.projectsService.deleteProject(this.projectSelected._id).subscribe(res => {
      let result: any = res;
      if(result){
        alert(result.message);
        this.openProjects();
      }
    })
  }

  openDialog(disabled) {
    const dialogConfig = new MatDialogConfig();
    if(disabled) {
      dialogConfig.disableClose = disabled;
    }
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: 'Create Project'
    };
    const dialogRef = this.dialog.open(DialogProject, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {      
      if (result) {
        this.projectsService.createProject(result).subscribe(res => {
          let result: any = res;
          if (result) {
            alert(result.message);
            this.projectsService.getProjects().subscribe(res => {
              if(res[0]){
                this.projects = res;
                this.projectSelected = res[0];
              }
            })
          } else {
            alert('Error');
          }          
        })
      } else {
        alert('Wrong values, try again');
      } 
    });
  }

  openDialogTask() {
    const dialogConfig = new MatDialogConfig();    
    dialogConfig.disableClose = false;    
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 2,
      title: 'Create Task'
    };
    const dialogRef = this.dialog.open(DialogTask, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {   
      console.log(result);
      if (result) {
        if(result.description && result.due_date && result.owner){
          let data = {
            'description': result.description,
            'owner': result.owner,
            'due_date': result.due_date
          }
          this.projectsService.createTask(this.projectSelected.name, data).subscribe(res =>{
            let result: any = res;
            alert(result.message);
            this.openProject(this.projectSelected.name);
          })
        } else {
          alert('Wrong values, try again');
        }  
      }            
    })
  }

  openDialogConfirm() {
    const dialogConfig = new MatDialogConfig();    
    dialogConfig.disableClose = false;    
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 3,
      title: 'Delete project?'
    };
    const dialogRef = this.dialog.open(DialogConfirm, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {   
      if (result) {
        this.deleteProject();
      }            
    })
  }

  ngOnInit (){
    this.openProjects();
  }

  openProjects() {
    this.projectsService.getProjects().subscribe(res => {
      if(!res[0]){
        this.openDialog(true);
      } else {
        this.projects = res;
        this.projectSelected = res[0];
        this.openProject(this.projectSelected.name);
      } 
    })
  }
}