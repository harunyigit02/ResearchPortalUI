import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { CommonModule } from '@angular/common';
import { AddResearchFormComponent } from './add-research-form/add-research-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CrisisListComponent,
    HeroesListComponent,
    NavbarComponent,
    SidebarComponent,
    ContentComponent,
    FooterComponent,
    AddArticleComponent,
    CommonModule,
    AddResearchFormComponent
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-router-sample';
}
