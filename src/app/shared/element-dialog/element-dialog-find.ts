import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { UnidadeDeSaude } from 'src/app/models/UnidadeDeSaude';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog-find.html',
  styleUrls: ['./element-dialog.component.scss']
})
export class FindDialogComponent implements OnInit{
  element!:UnidadeDeSaude;
  isChange!: boolean;

  constructor(
    public dialogRef: MatDialogRef<FindDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UnidadeDeSaude,) {}

  ngOnInit(): void {
    
  }


  onCancel(): void {
    this.dialogRef.close();
  }

}