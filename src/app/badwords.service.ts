import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Badwords } from './module/Badwords';

@Injectable({
  providedIn: 'root'
})
export class BadwordsService {
  private apiUrl = 'http://localhost:9090/badwords'; // Replace 'your_api_url' with your actual API endpoint

  constructor(private http: HttpClient) { }

  getAllBadwords(): Observable<Badwords[]> { // Ensure the return type is Observable<Badwords[]>
    return this.http.get<Badwords[]>(`${this.apiUrl}/badwords`);
  }


  getBadwordById(id: number): Observable<Badwords> {
    return this.http.get<Badwords>(`${this.apiUrl}/badwords/${id}`);
  }

  addBadword(badword: Badwords): Observable<Badwords> {
    return this.http.post<Badwords>(`${this.apiUrl}/badwords`, badword);
  }

  removeBadword(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/badwords/${id}`);
  }
}
