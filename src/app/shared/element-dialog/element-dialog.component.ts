import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { UnidadeDeSaude } from 'src/app/models/UnidadeDeSaude';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.scss']
})
export class ElementDialogComponent implements OnInit{
  element!:UnidadeDeSaude;
  isChange!: boolean;

  constructor(
    public dialogRef: MatDialogRef<ElementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UnidadeDeSaude,) {}

  ngOnInit(): void {
    if(this.data.cnes !=''){
      this.isChange=true;
    }else{
      this.isChange=false;
    }
      
  }


  onCancel(): void {
    this.dialogRef.close();
  }

}
