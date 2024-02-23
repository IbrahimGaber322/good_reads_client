import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AuthorListComponent } from './components/author/author-list/author-list.component';

import { NotfoundComponent } from './components/notfound/notfound.component';
import { BookListComponent } from './components/book/book-list/book-list.component';
import { BookDetailsComponent } from './components/book/book-details/book-details.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { ReviewsComponent } from './components/book/reviews/reviews.component';
import { AuthorDetailsComponent } from './components/author/author-details/author-details.component';
export const routes: Routes = [

    {
        path:"",
        component:HomeComponent,
        title:"Home"
      },
      {
          path:"admin",
          component:AdminComponent,
          title:"Admin Panel"
      },
      {
        path:"books",
        component:BookListComponent,
        title:"Books",
      
    },
    {
        path:"books/:id",
        component:BookDetailsComponent,
        title:"Book Details",
      
    },
    {
        path:"categories",
        component:CategoryListComponent,
        title:"Categories",
      
    },
    {
        path:"authors",
        component:AuthorListComponent,
        title:"Authors",
      
    },
    {
        path:"authors/:id",
        component:AuthorDetailsComponent,
        title:"Author Details",
      
    },
    {
        path:"review",
        component:ReviewsComponent,
        title:"reviews",
      
    },
      {
          path:"**",
          component:NotfoundComponent,
          title:"Not Found"
      },
];
