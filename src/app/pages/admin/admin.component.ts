import { Component } from '@angular/core';
import { AdminBooksComponent } from '../../components/tables/admin-books/admin-books.component';
import { AdminCategoriesComponent } from '../../components/tables/admin-categories/admin-categories.component';
import { AdminAuthorsComponent } from '../../components/tables/admin-authors/admin-authors.component';
import { AdminUsersComponent } from '../../components/tables/admin-users/admin-users.component';
import { AdminTabs } from '../../interfaces/admin-tabs';
import { AdminBookComponent } from '../../components/forms/admin-book/admin-book.component';
import { AdminAuthorComponent } from '../../components/forms/admin-author/admin-author.component';
import { AdminCategoryComponent } from '../../components/forms/admin-category/admin-category.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [AdminBooksComponent, AdminCategoriesComponent, AdminAuthorsComponent, AdminUsersComponent, AdminBookComponent, AdminAuthorComponent, AdminCategoryComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
    active:AdminTabs = "categories";
    create:Boolean=false;

    setActive(table:AdminTabs){
      this.active=table;
    }
    setCreate=(bool:Boolean)=>{
         this.create=bool;
    }
}
