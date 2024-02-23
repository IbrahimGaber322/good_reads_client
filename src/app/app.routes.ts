import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

import { NotfoundComponent } from './components/notfound/notfound.component';
import { BookListComponent } from './pages/book/book-list/book-list.component';
import { AdminComponent } from './pages/admin/admin.component';

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
        title:"Books"
    },
      {
          path:"**",
          component:NotfoundComponent,
          title:"Not Found"
      },
];
