import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { ProfileUser } from '../Models/profileUser.model';
import { PagedResult } from '../Models/pagingResult.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  users:ProfileUser[] = []
  errorMessage: string | null = null;
  totalItems = 0;
  pageNumber = 1;
  pageSize = 3;
  Math = Math;
  selectedRole: string | null=null;
  searchKeyword: string = '';
  startDate:any;
  endDate:any;

  constructor(private dataService: DataService) {}

  ngOnInit(){
    this.getUsers();
  }


  getUsers(){

    this.dataService.getPagedUsers(this.pageNumber,this.pageSize,this.selectedRole,this.searchKeyword,this.startDate,this.endDate)
    .subscribe({
      next: (result: PagedResult<ProfileUser>) => {
        this.users = result.items,
        this.totalItems = result.totalItems;
        console.log("user infos:",this.users);
      },
      error: (err) => {
        this.errorMessage = 'Kullanıcıları alırken hata oluştu: ' + err.message;
      }
    })

  }

  onPageChange(page: number): void {
    this.pageNumber = page;
    window.scrollTo({ top: 50, behavior: 'smooth' });
    this.getUsers();
    
  }
  onSearchChange(): void {
    // Her arama değişikliğinde sayfa numarasını sıfırla ve yeni istek gönder
    this.pageNumber = 1;
    console.log('Arama Anahtar Kelimesi:', this.searchKeyword);
    this.getUsers();
  }
  onRoleChange(): void {
    console.log(' on category change basşında Selected Category ID:', this.selectedRole);
    if (!this.selectedRole) {
      this.selectedRole = null;
    }
    this.getUsers();

}

onDateChange():void {

  this.pageNumber = 1;
  console.log('baslangic tarihi:',this.startDate);
  console.log('bitiş tarihi:',this.endDate);
  this.getUsers();
}

}
