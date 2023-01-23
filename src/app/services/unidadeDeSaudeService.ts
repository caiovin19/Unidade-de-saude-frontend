import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UnidadeDeSaude } from '../models/UnidadeDeSaude';
import { Observable } from 'rxjs';

@Injectable()
export class UnidadeDeSaudeService{

    unidadeApiUrl='http://localhost:8080/unidades';
    buscarUnidade='http://localhost:8080/unidades/buscarporcep/';
    constructor (private http: HttpClient){}

    getUnidades(): Observable<UnidadeDeSaude[]>{
        return this.http.get<UnidadeDeSaude[]>(this.unidadeApiUrl);
    }


    adicionarUnidade(element: UnidadeDeSaude): Observable <UnidadeDeSaude>{
        return this.http.post<UnidadeDeSaude>(this.unidadeApiUrl, element);
    }

    editarUnidade(element:UnidadeDeSaude): Observable<UnidadeDeSaude>{
        
        return this.http.put<UnidadeDeSaude>(this.unidadeApiUrl, element);
    }

    deletarUnidade(cnes:string): Observable<any>{
        return this.http.delete<any>(`${this.unidadeApiUrl}/${cnes}`);
    }

    buscarUnidadePorCep(cep:number): Observable<string>{
        return this.http.get<string>(`${this.buscarUnidade}/${cep}`);
    }

}