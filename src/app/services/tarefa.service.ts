import { Injectable } from '@angular/core';
import { CrudService } from '../classes/CrudService';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Tarefa } from '../interfaces/tarefa';

@Injectable({
  providedIn: 'root'
})
export class TarefaService extends CrudService<Tarefa>{
  constructor(httpClient: HttpClient, private http: HttpClient) {
    super(httpClient, `${environment.apiUrlProduction}/api/tarefas`)
  }

  orderItems(itemToDownID:number, itemToUpID:number){
    return this.http.get<void>(`${environment.apiUrlProduction}/api/tarefas/${itemToDownID}/${itemToUpID}`);
  }
}
