import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from './Models/article.model';
import { Research } from './Models/research.model';
import { Answer } from './Models/answer.model';
import { LoginRequest } from './Models/login-request.model';
import { NavigationEnd, Router } from '@angular/router';
import { RegisterRequest } from './Models/register-request.model';
import { PagedResult } from './Models/pagingResult.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://localhost:7237/api';
  private loginPageRoute = '/login';
  isLoginPage: boolean = false;

  constructor(private router:Router,private http: HttpClient) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = this.router.url === this.loginPageRoute;
      }
    });
   }

  getArticle(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Article`);
  }
  getUserArticles(token: string,pageNumber:number,pageSize:number,categoryId:number|null|undefined,keyword:string|null|undefined): Observable<any> {
    // Token varsa, header'a Authorization ekliyoruz
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    let params= new HttpParams()
    .set('pageNumber',pageNumber)
    .set('pageSize',pageSize);
    if(categoryId!=null&&categoryId!=undefined){
      
      params=params.set('categoryId',categoryId);
      
    }
    if(keyword){
      params=params.set('keyword',keyword);
    }

    return this.http.get<PagedResult<Article>>(`${this.apiUrl}/Article/UserArticles`, { headers,params });
  }
  getPagedArticles(pageNumber:number,pageSize:number,categoryId:number|null|undefined,keyword:string|null|undefined):Observable<any> {
    console.log("dataService başında selectedCategoryId:",categoryId,typeof(categoryId));
    let params= new HttpParams()
    .set('pageNumber',pageNumber)
    .set('pageSize',pageSize)
    if(categoryId!=null&&categoryId!=undefined){
      params=params.set('categoryId',categoryId);
    }
    if(keyword){
      params=params.set('keyword',keyword);
    }
    console.log(" dataService  sonunda selectedcategoryId:",categoryId);
    console.log("param:"+params);
    
    return this.http.get<PagedResult<Article>>(`${this.apiUrl}/Article`, { params });
    

    
  }

  addArticle(article: Article,token:string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post<any>(`${this.apiUrl}/Article`, article,{ headers });
   }

   getCategories(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Category`);
  }

  addQuestion(questionData: { questionText: string, researchId: number},token:string ) :Observable<any> {
    const headers=new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    })
    return this.http.post<number>(`${this.apiUrl}/Question`, questionData,{headers});
  }

  // Tek bir seçenek ekleme isteği
  addOption(optionData: { questionId: number; optionText: string },token:string) {
    const headers=new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    })
    return this.http.post(`${this.apiUrl}/Option`, optionData,{headers});
  }
  getResearches(pageNumber:number,pageSize:number): Observable<Research[]> {
    const params=new HttpParams()
    .set('pageNumber',pageNumber)
    .set('pageSize',pageSize)
    return this.http.get<Research[]>(`${this.apiUrl}/Research`,{params});
  }

  getUserResearches(token: string,pageNumber:number,pageSize:number,categoryId:number|null|undefined,keyword:string|null|undefined): Observable<any> {
    // Token varsa, header'a Authorization ekliyoruz
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    let params=new HttpParams()
    .set('pageNumber',pageNumber)
    .set('pageSize',pageSize)
    if(categoryId!=null&&categoryId!=undefined){
      params=params.set('categoryId',categoryId);

    }
    if(keyword){
      params=params.set('keyword',keyword);
    }

    return this.http.get<any>(`${this.apiUrl}/Research/UserResearches`, { headers, params });
  }


  getPublishedResearches(pageNumber:number,pageSize:number,categoryId:number|null|undefined,keyword:string|null|undefined):Observable<any>{
    let params=new HttpParams()
    .set('pageNumber',pageNumber)
    .set('pageSize',pageSize)
    if(categoryId!=null&&categoryId!=undefined){
      params=params.set('categoryId',categoryId);
    }
    if(keyword){
      params=params.set('keyword',keyword);
    }
    return this.http.get<any>(`${this.apiUrl}/Research/Published`,{params});
  }

  getResearchById(id:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/Research/${id}`);
  }

  addResearch(research: Research,token:string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post<any>(`${this.apiUrl}/Research`, research,{headers});
   }

   updateResearch(id:number,research: Research): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Research/${id}`, research);
   }


   getArticleViewsCount(articleId:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/Views/${articleId}/count`);
   }

   submitAnswers(answers: Answer[],token:string): Observable<any> {
    const headers=new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    })
    return this.http.post<any>(`${this.apiUrl}/Answer/submitAnswers`, answers,{headers});
  }

  getUserParticipantInfo(token:string):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    })

    return this.http.get<any>(`${this.apiUrl}/ParticipantInfo/UserInfos`,{headers});
  }

   addParticipantInfo(token:string,participantInfo:any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    })
    return this.http.post<any>(`${this.apiUrl}/ParticipantInfo`, participantInfo,{headers});
   }



  //Auth işlemleri---------------

  login(loginRequest: LoginRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/Auth/login`, loginRequest);
  }
  register(registerRequest:RegisterRequest):Observable<any>{
    return this.http.post(`${this.apiUrl}/Auth/register`,registerRequest);
  }

  // Token'ı localStorage'a kaydet
  saveToken(token: string): void {
    localStorage.setItem('jwt_token', token);
  }

  // Kullanıcıyı çıkış yaptırma (Token'ı silme)
  logout(): void {
    localStorage.removeItem('jwt_token');
  }

  // Token'ı al
  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  // Kullanıcının oturum açıp açmadığını kontrol et
  isAuthenticated(): boolean {
    return !!this.getToken();
  }


  //Participant Form

  

   


  
}
