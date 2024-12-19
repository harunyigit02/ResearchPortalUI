import { Routes } from '@angular/router';
import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { ContentComponent } from './content/content.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { AddResearchFormComponent } from './add-research-form/add-research-form.component';
import { ResearchListComponent } from './research-list/research-list.component';
import { AddResearchComponent } from './add-research/add-research.component';
import { ResearchDetailsComponent } from './research-details/research-details.component';
import { UnPublishedResearchListComponent } from './un-published-research-list/un-published-research-list.component';
import { AnswerDenemeComponent } from './answer-deneme/answer-deneme.component';
import { LoginComponent } from './login/login.component';
import { MyArticlesComponent } from './my-articles/my-articles.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { ParticipantInfoFormComponent } from './participant-info-form/participant-info-form.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { RoleGuard } from './guards/role.guard';
import { ResearchRequirementFormComponent } from './research-requirement-form/research-requirement-form.component';


export const routes: Routes = [
    {path: '', component: ContentComponent, canActivate: [AuthGuard]},
    {path: 'crisis-list', component: CrisisListComponent},
    {path: 'heroes-list', component: HeroesListComponent},
    {path: 'articles', component: ContentComponent, canActivate: [AuthGuard]},
    {path: 'add-article', component: AddArticleComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['Admin'] }},
    {path: 'add-research-form', component: AddResearchFormComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['Admin'] }},
    {path: 'researches', component: ResearchListComponent, canActivate: [AuthGuard]},
    {path: 'add-research', component: AddResearchComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['Admin'] }},
    {path: 'research-detail/:id', component: ResearchDetailsComponent, canActivate: [AuthGuard, ]},
    {path: 'my-researches', component: UnPublishedResearchListComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['Admin','Researcher'] }},
    {path: 'participation-form/:id', component: AnswerDenemeComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'my-articles', component: MyArticlesComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['Admin','Researcher'] }},
    {path: 'register', component: RegisterComponent},
    {path: 'participant-form', component: ParticipantInfoFormComponent},
    {path: 'email-verification', component: EmailVerificationComponent},
    {path: 'research-requirement-form', component: ResearchRequirementFormComponent},
];
