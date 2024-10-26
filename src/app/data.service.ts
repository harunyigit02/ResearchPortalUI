import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from './Models/article.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://localhost:7237/api';

  constructor(private http: HttpClient) { }

  getArticle(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Article`);
  }

  addArticle(article: Article): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Article`, article);
   }

   getCategories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Category`);
  }

  addQuestion(questionData: { questionText: string, researchId: number }) :Observable<any> {
    return this.http.post<number>(`${this.apiUrl}/Question`, questionData);
}

  // Tek bir seçenek ekleme isteği
  addOption(optionData: { questionId: number; optionText: string }) {
    return this.http.post(`${this.apiUrl}/Option`, optionData);
  }


  
}
