import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reponse } from './module/Reponse'; // Make sure to import the Reponse model

@Injectable({
  providedIn: 'root',
})
export class ReponseService {
  private apiUrl = 'http://localhost:8089/reponse'; // Adjust the URL to match your backend API

  constructor(private http: HttpClient) {}

  getAllResponses(): Observable<Reponse[]> {
    return this.http.get<Reponse[]>(`${this.apiUrl}/retrieve-all-reponse`);
  }

  getResponseById(id: number): Observable<Reponse> {
    return this.http.get<Reponse>(`${this.apiUrl}/retrieve-reponse/${id}`);
  }

  addResponse(response: Reponse): Observable<Reponse> {
    return this.http.post<Reponse>(`${this.apiUrl}/add-reponse`, response);
  }

  updateResponse(response: Reponse): Observable<Reponse> {
    return this.http.put<Reponse>(`${this.apiUrl}/modify-reponse`, response);
  }

  deleteResponse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove-reponse/${id}`);
  }

  affecterRepARec(idRep: number, idRec: number): Observable<Reponse> {
    return this.http.put<Reponse>(
      `${this.apiUrl}/affecterRepARec/${idRep}/${idRec}`,
      {}
    );
  }

  affecterRepAUser(idRep: number, userId: number): Observable<Reponse> {
    return this.http.put<Reponse>(
      `${this.apiUrl}/affecterRepAUser/${idRep}/${userId}`,
      {}
    );
  }
  getResponsesForReclamation(reclamationId: number): Observable<Reponse[]> {
    const url = `${this.apiUrl}/${reclamationId}/responses`;
    return this.http.get<Reponse[]>(url);
  }
}
