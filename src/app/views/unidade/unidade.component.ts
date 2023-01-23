import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { UnidadeDeSaude } from 'src/app/models/UnidadeDeSaude';
import { UnidadeDeSaudeService } from 'src/app/services/unidadeDeSaudeService';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';


const ELEMENT_DATA: UnidadeDeSaude[] = [
];

@Component({
  selector: 'app-unidade',
  templateUrl: './unidade.component.html',
  styleUrls: ['./unidade.component.scss'],
  providers:[UnidadeDeSaudeService]
})
export class UnidadeComponent {
  @ViewChild(MatTable)
  table!:MatTable<any>
  displayedColumns: string[] = ['cnes', 'nomeDoEstabelecimento', 'cepInicio', 'cepFim', 'actions'];
  dataSource!: UnidadeDeSaude[];

  constructor(
    public diaLog: MatDialog,
    public unidadeDeSaudeService: UnidadeDeSaudeService
    ){
      this.unidadeDeSaudeService.getUnidades()
      .subscribe((data:UnidadeDeSaude[])=>{
        this.dataSource=data;
      });
    }

  openUnidade(element: UnidadeDeSaude | null): void{
    const dialogRef = this.diaLog.open(ElementDialogComponent, {
      width:'250px',
      data:element===null ?{
        cnes:'',
        nomeDoEstabelecimento:'',
        cepInicio:null,
        cepFim:null
      }:{
        cnes:element.cnes,
        nomeDoEstabelecimento:element.nomeDoEstabelecimento,
        cepInicio:element.cepInicio,
        cepFim:element.cepFim
      }
   });

    dialogRef.afterClosed().subscribe(result => {
      if(result !==undefined){
        console.log(result);
        if(this.dataSource.map(p=>p.cnes).includes(result.cnes)){
          this.unidadeDeSaudeService.editarUnidade(result).subscribe((data: UnidadeDeSaude)=>{
            const index=this.dataSource.findIndex(p=>p.cnes===data.cnes);
            this.dataSource[index]=result;
            this.table.renderRows();
          })
          
        }else{
           this.unidadeDeSaudeService.adicionarUnidade(result).subscribe((data:UnidadeDeSaude)=>{
            this.dataSource.push(data);
            this.table.renderRows();
          });  
        }
      }
    });
  }

  editUnidade(element: UnidadeDeSaude ):void{
    this.openUnidade(element)
  }

  deleteUnidade(cnes: string): void{
    this.unidadeDeSaudeService.deletarUnidade(cnes).subscribe(()=>{
      this.dataSource=this.dataSource.filter(p=>p.cnes !== cnes);
    })
  }
}

export { UnidadeDeSaude };

