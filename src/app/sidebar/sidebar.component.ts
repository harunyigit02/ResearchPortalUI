import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  userRole:any
  isSidebarOpen = false; // Başlangıçta kapalı

  
  constructor(
    private router:Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.userRole = this.dataService.getUserRole();
    console.log("userRole:",this.userRole); // Kullanıcı rolünü al
  }

  hasRole(roles: string[]): boolean {
    return roles.includes(this.userRole);
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

}
