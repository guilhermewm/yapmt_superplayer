import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
export interface DialogData {
    animal: string;
    name: string;
}
  
@Component({
    templateUrl: 'dialogProject.html',
  })
  export class DialogProject {
  
    modalTitle: string;
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        this.modalTitle = data.title;
        console.log(data)
    }
  
}