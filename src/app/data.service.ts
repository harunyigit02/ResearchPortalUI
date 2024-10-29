import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from './Models/article.model';
import { Research } from './Models/research.model';

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
  getResearches(): Observable<Research[]> {
    return this.http.get<Research[]>(`${this.apiUrl}/Research`);
  }
  getPublishedResearches():Observable<Research[]>{
    return this.http.get<Research[]>(`${this.apiUrl}/Research/Published`);
  }

  getResearchById(id:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/Research/${id}`);
  }

  addResearch(research: Research): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Research`, research);
   }

   updateResearch(id:number,research: Research): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Research/${id}`, research);
   }


   getArticleViewsCount(articleId:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/Views/${articleId}/count`);
   }

   


  
}
