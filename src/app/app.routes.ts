import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminLoginComponent } from './pages/admin/admin-login/admin-login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { BookListComponent } from './pages/book/book-list/book-list.component';

export const routes: Routes = [

    {
        path:"",
        component:HomeComponent,
        title:"Home"
      },
      {
          path:"admin",
          component:AdminLoginComponent,
          title:"Admin Panel"
      },
      {
        path:"books",
        component:BookListComponent,
        title:"Books"
    },
      {
          path:"**",
          component:NotfoundComponent,
          title:"Not Found"
      },
];
