import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Badwords } from './module/Badwords';

@Injectable({
  providedIn: 'root',
})
export class BadwordsService {
  private apiUrl = 'http://localhost:8089/badwords'; // Correct API URL

  constructor(private http: HttpClient) {}

  getAllBadwords(): Observable<Badwords[]> {
    return this.http.get<Badwords[]>(`${this.apiUrl}/retrieve-all`);
  }

  getBadwordById(id: number): Observable<Badwords> {
    return this.http.get<Badwords>(`${this.apiUrl}/retrieve/${id}`);
  }

  addBadword(badword: Badwords): Observable<Badwords> {
    return this.http.post<Badwords>(`${this.apiUrl}/add-badwords`, badword);
  }

  removeBadword(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove/${id}`);
  }
}
