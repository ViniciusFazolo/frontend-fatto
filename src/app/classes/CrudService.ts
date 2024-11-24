import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class CrudService<T extends {id?: number}> {
  constructor(private httpClient: HttpClient, private url: string) {}

  listAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(`${this.url}/listar`);
  }

  listById(id: number): Observable<T> {
    return this.httpClient.get<T>(`${this.url}/${id}`);
  }

  create(obj: T): Observable<T> {
    return this.httpClient.post<T>(`${this.url}/novo`, obj);
  }

  update(obj: T): Observable<T> {
    return this.httpClient.put<T>(`${this.url}/update`, obj);
  }

  delete(id: number): Observable<string> {
    return this.httpClient.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
