import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface DialogData {
    description: String,
    owner: String,
    due_date: Date
}

  
@Component({
    templateUrl: 'dialogTask.html',
  })
  export class DialogTask {
  
    modalTitle: string;
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        this.modalTitle = data.title;
        console.log(data)
    }

    date = new FormControl(new Date());
    serializedDate = new FormControl((new Date()).toISOString());
  
}