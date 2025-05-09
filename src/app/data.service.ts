import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Article } from './Models/article.model';
import { Research } from './Models/research.model';
import { Answer } from './Models/answer.model';
import { LoginRequest } from './Models/login-request.model';
import { NavigationEnd, Router } from '@angular/router';
import { RegisterRequest } from './Models/register-request.model';
import { PagedResult } from './Models/pagingResult.model';
import { VerifyEmail } from './Models/verify-email.model';
import { ResearchRequirement } from './Models/research-requirement.model';
import { Question } from './Models/question.model';
import { ProfileUser } from './Models/profileUser.model';
import { FilterDto } from './Models/filterDto.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:7237/api';
  private loginPageRoute = '/login';
  isLoginPage: boolean = false;
  private userSubject: BehaviorSubject<ProfileUser | null> = new BehaviorSubject<ProfileUser | null>(null);

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
  getUserArticles(token: string,pageNumber:number,pageSize:number,categoryId:number|null|undefined,keyword:string|null|undefined,minDate:string|null|undefined,maxDate:string|null|undefined): Observable<any> {
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
    if(minDate!=null&&minDate!=undefined){
      params=params.set('keyword',minDate);
    }
    if(maxDate!=null&&maxDate!=undefined){
      params=params.set('keyword',maxDate);
    }

    return this.http.get<PagedResult<Article>>(`${this.apiUrl}/Article/UserArticles`, { headers,params });
  }
  getPagedArticles(pageNumber:number,pageSize:number,categoryId:number|null|undefined,keyword:string|null|undefined,minDate:string|null|undefined,maxDate:string|null|undefined):Observable<any> {
    console.log("dataService başında selectedCategoryId:",categoryId,typeof(categoryId));
    let params= new HttpParams()
    .set('pageNumber',pageNumber)
    .set('pageSize',pageSize)
    if(categoryId!=null&&categoryId!=undefined){
      params=params.set('categoryId',categoryId);
    }
    if(keyword!=null&&keyword!=undefined){
      params=params.set('keyword',keyword);
    }
    if(minDate!=null&&minDate!=undefined){
      params=params.set('minDate',minDate);
    }
    if(maxDate!=null&&maxDate!=undefined){
      params=params.set('maxDate',maxDate);
    }
    console.log(" dataService  sonunda selectedcategoryId:",categoryId);
    console.log("param:"+params);

    return this.http.get<PagedResult<Article>>(`${this.apiUrl}/Article`, { params });



  }
  getArticleById(id:number):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Article/${id}`);
  }

  addArticle(formData: FormData, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    return this.http.post(`${this.apiUrl}/Article`, formData, { headers });
  }

  downloadArticle(id: number): Observable<Blob> {
    
  
    return this.http.get<Blob>(`${this.apiUrl}/Article/${id}/Download`, {
      
      
      responseType: 'blob' as 'json'  // 'blob' türünde döndüğünden emin olun
    });
  }

   updateArticle(id:number,article:Article):Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Article/${id}`,article);
   }

   deleteArticle(id:number):Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Article/${id}`);
   }

   deleteResearch(id:number):Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Research/${id}`)
   }

   deleteMultipleArticle(articleIds:number[]):Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Article/MultiDelete`, {body: articleIds});
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

  deleteOption(optionId: number) {
    
    return this.http.delete(`${this.apiUrl}/Option/${optionId}`);
  }
  
  getResearches(pageNumber:number,pageSize:number): Observable<Research[]> {
    const params=new HttpParams()
    .set('pageNumber',pageNumber)
    .set('pageSize',pageSize)
    return this.http.get<Research[]>(`${this.apiUrl}/Research`,{params});
  }

  getUserResearches(token: string,pageNumber:number,pageSize:number,categoryId:number|null|undefined,keyword:string|null|undefined,minDate:string|null,maxDate:string|null): Observable<any> {
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
    if(minDate!=null&&minDate!=undefined){
      params=params.set('minDate',minDate);
    }
    if(maxDate!=null&&maxDate!=undefined){
      params=params.set('maxDate',maxDate);
    }

    return this.http.get<any>(`${this.apiUrl}/Research/UserResearches`, { headers, params });
  }




  getPublishedResearches(pageNumber:number,pageSize:number,categoryId:number|null|undefined,keyword:string|null|undefined,minDate:string|null|undefined,maxDate:string|null|undefined):Observable<any>{
    let params=new HttpParams()
    .set('pageNumber',pageNumber)
    .set('pageSize',pageSize)
    if(categoryId!=null&&categoryId!=undefined){
      params=params.set('categoryId',categoryId);
    }
    if(keyword){
      params=params.set('keyword',keyword);
    }
    if(minDate!=null&&minDate!=undefined){
      params=params.set('minDate',minDate);
    }
    if(maxDate!=null&&maxDate!=undefined){
      params=params.set('maxDate',maxDate);
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
   addResearchRequirement(token:string,researchRequirement: any): Observable<ResearchRequirement> {
    const headers=new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    })


    return this.http.post<ResearchRequirement>(`${this.apiUrl}/ResearchRequirement`, researchRequirement,{headers});
  }

  getResearchRequirementByResearchId(researchId:number):Observable<any> {
    const result = this.http.get<any>(`${this.apiUrl}/ResearchRequirement/ResearchsConditions/${researchId}`);
    console.log("Service yanıtı",result);
    return result;
  }

  updateResearchRequirement(id:number,researchRequirement:ResearchRequirement):Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/ResearchRequirement/${id}`,researchRequirement);
  }

  getMatchedResearches(token: string | null,pageNumber:number,pageSize:number,categoryId:number|null|undefined,keyword:string|null|undefined,minDate:string|null,maxDate:string|null):Observable<any> {
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
    if(minDate!=null&&minDate!=undefined){
      params=params.set('minDate',minDate);
    }
    if(maxDate!=null&&maxDate!=undefined){
      params=params.set('maxDate',maxDate);
    }
    return this.http.get<any>(`${this.apiUrl}/ResearchRequirement/MatchedResearchRequirements`,{headers,params});
  }

  getResearchAnswers(researchId:number):Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Answer/${researchId}/Answers`)
  }

  getParticipantInfos(token:string):Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    })
    return this.http.get<any>(`${this.apiUrl}/ParticipantInfo/UserInfos`,{headers});
  }
  getQuestionParticipantPercentage(filterDto:FilterDto): Observable<any[]> {
   
    return this.http.post<any[]>(`${this.apiUrl}/Answer/AnalyzeTargetQuestion`, filterDto);
  }

  analyzeAllQuestions(optionIds:number[],researchId:number):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/Answer/AnalyzeAllQuestions/${researchId}`,optionIds);

  }

  getQuestionsByResearchId(researchId:number):Observable<any>{
    return this.http.get<any[]>(`${this.apiUrl}/Question/ByResearch/${researchId}`);
  }

  updateQuestion(id:number,question:Question):Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Question/${id}`,question);
  }

  deleteQuestion(id:number):Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Question/${id}`);
  }







  //Auth işlemleri---------------

  login(loginRequest: LoginRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/Auth/login`, loginRequest);
  }
  register(registerRequest:RegisterRequest):Observable<any>{
    return this.http.post(`${this.apiUrl}/Auth/register`,registerRequest);
  }
  verifyEmail(verifyEmail:VerifyEmail):Observable<any> {
    return this.http.post(`${this.apiUrl}/Auth/verify-email`,verifyEmail)
  }

  // Token'ı localStorage'a kaydet
  saveToken(token: string): void {
    localStorage.setItem('jwt_token', token);
  }
  saveEmailLocal(email:string):void {
    localStorage.setItem('email',email);
  }

  // Kullanıcıyı çıkış yaptırma (Token'ı silme)
  logout(): void {
    this.userSubject.next(null);
    localStorage.removeItem('jwt_token');
  }

  // Token'ı al
  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }
  getEmailLocal():string | null {
    return localStorage.getItem('email');
  }

  // Kullanıcının oturum açıp açmadığını kontrol et
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
  getUserRole(): any {
    const token = localStorage.getItem('jwt_token');
    console.log("GetUserRole Token:", token);

    if (!token) {
      console.error('Token bulunamadı.');
      return ''; // Eğer token yoksa boş rol döner
    }

    const decodedToken = this.decodeToken(token);
    console.log('Decoded Token:', decodedToken); // Decode edilmiş token'ı logla

    // Burada doğru key ile role bilgisine erişin
    return decodedToken?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || '';

  }
  getUserId(){
    const token = localStorage.getItem('jwt_token');
    if(!token) {
      console.error('Token missing token');
      return null;
    }
    const decodedToken= this.decodeToken(token);

    return decodedToken?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || '';

  }
  decodeToken(token: string): any {
    if (!token) {
      return null;
    }

    const payload = token.split('.')[1];
    if (!payload) {
      console.error('Token payload kısmı bulunamadı.');
      return null;
    }

    try {
      const decodedPayload = atob(payload); // Base64 çözümleme
      console.log('Decoded Payload:', decodedPayload); // Base64 sonrası payload'u logla
      return JSON.parse(decodedPayload); // JSON dönüşüm
    } catch (e) {
      console.error('Token çözümleme hatası:', e);
      return null;
    }
  }



  // ---------- User

  getUser(token:string):Observable<any>{

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get<any>(`${this.apiUrl}/Auth/User`,{headers})

  }


  getPagedUsers(pageNumber:number,pageSize:number,role:string|null|undefined,keyword:string|null|undefined,minDate:string|null|undefined,maxDate:string|null|undefined):Observable<any> {
    console.log("dataService başında selectedCategoryId:",role,typeof(role));
    let params= new HttpParams()
    .set('pageNumber',pageNumber)
    .set('pageSize',pageSize)
    if(role!=null&&role!=undefined){
      params=params.set('role',role);
    }
    if(keyword!=null&&keyword!=undefined){
      params=params.set('keyword',keyword);
    }
    if(minDate!=null&&minDate!=undefined){
      params=params.set('minDate',minDate);
    }
    if(maxDate!=null&&maxDate!=undefined){
      params=params.set('maxDate',maxDate);
    }
    console.log(" dataService  sonunda selectedcategoryId:",role);
    console.log("param:"+params);

    return this.http.get<PagedResult<ProfileUser>>(`${this.apiUrl}/Auth/Users`, { params });



  }







  getUserObservable(): Observable<ProfileUser | null> {
    return this.userSubject.asObservable();
  }







}
