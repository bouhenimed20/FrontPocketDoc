import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reclamation } from './module/Reclamation'; // Define the Reclamation interface as needed

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private apiUrl = 'http://localhost:9090/reclamation';

  constructor(private http: HttpClient) { }

  getAllReclamations(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(`${this.apiUrl}/retrieve-all-reclamation`);
  }

  addReclamation(reclamation: Reclamation): Observable<Reclamation> {
    return this.http.post<Reclamation>(`${this.apiUrl}/add-reclamation`, reclamation);
  }

  getReclamation(id: number): Observable<Reclamation> {
    return this.http.get<Reclamation>(`${this.apiUrl}/retrieve-reclamation/${id}`);
  }

  removeReclamation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove-reclamation/${id}`);
  }

  modifyReclamation(reclamation: Reclamation): Observable<Reclamation> {
    return this.http.put<Reclamation>(`${this.apiUrl}/modify-reclamation`, reclamation);
  }

  deleteReclamation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove-reclamation/${id}`);
  }
}
