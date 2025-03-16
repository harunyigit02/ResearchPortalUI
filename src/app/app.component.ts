import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { CommonModule } from '@angular/common';
import { AddResearchFormComponent } from './add-research-form/add-research-form.component';
import { ResearchListComponent } from './research-list/research-list.component';
import { AddResearchComponent } from './add-research/add-research.component';
import { ResearchDetailsComponent } from './research-details/research-details.component';
import { UnPublishedResearchListComponent } from './un-published-research-list/un-published-research-list.component';
import { LoginComponent } from './login/login.component';
import { MyArticlesComponent } from './my-articles/my-articles.component';
import { DataService } from './data.service';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { ParticipantInfoFormComponent } from './participant-info-form/participant-info-form.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { ResearchRequirementFormComponent } from './research-requirement-form/research-requirement-form.component';
import { ConditionDenemeComponent } from './condition-deneme/condition-deneme.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ResearchResultsComponent } from './research-results/research-results.component';
import { QuestionAnalysisComponent } from './question-analysis/question-analysis.component';
import { EditArticleFormComponent } from './edit-article-form/edit-article-form.component';
import { EditResearchFormComponent } from './edit-research-form/edit-research-form.component';
import { EditRequirementsFormComponent } from './edit-requirements-form/edit-requirements-form.component';
import { EditQuestionsComponent } from './edit-questions/edit-questions.component';
import { UserListComponent } from './user-list/user-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    RouterOutlet,
    CrisisListComponent,
    HeroesListComponent,
    NavbarComponent,
    SidebarComponent,
    ContentComponent,
    FooterComponent,
    AddArticleComponent,
    CommonModule,
    AddResearchFormComponent,
    ResearchListComponent,
    AddResearchComponent,
    ResearchDetailsComponent,
    UnPublishedResearchListComponent,
    LoginComponent,
    MyArticlesComponent,
    RegisterComponent,
    ParticipantInfoFormComponent,
    EmailVerificationComponent,
    ResearchRequirementFormComponent,
    ConditionDenemeComponent,
    UserProfileComponent,
    ResearchResultsComponent,
    QuestionAnalysisComponent,
    EditArticleFormComponent,
    EditResearchFormComponent,
    EditRequirementsFormComponent,
    EditQuestionsComponent,
    UserListComponent
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-router-sample';
  isLoginPage: boolean = false;
  isRegisterPage: boolean = false;
  isParticipantPage:boolean = false;
  isVerificationPage:boolean = false;


  constructor(private dataService:DataService,private router: Router) {
    // NavigationEnd olayını dinle ve isLoginPage'i güncelle
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = this.router.url === '/login'
        this.isRegisterPage = this.router.url === '/register';
        this.isParticipantPage = this.router.url === '/participant-form'
        this.isVerificationPage = this.router.url === '/email-verification'
      }
    });
  }

}
