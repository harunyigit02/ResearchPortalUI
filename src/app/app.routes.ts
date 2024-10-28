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


export const routes: Routes = [
    {path: 'crisis-list', component: CrisisListComponent},
    {path: 'heroes-list', component: HeroesListComponent},
    {path: 'articles', component: ContentComponent},
    {path: 'add-article', component: AddArticleComponent},
    {path: 'add-research-form', component: AddResearchFormComponent},
    {path: 'researches', component: ResearchListComponent},
    {path: 'add-research', component: AddResearchComponent},
    {path: 'research-detail/:id', component: ResearchDetailsComponent},
    {path: 'my-researches', component: UnPublishedResearchListComponent},


];
