import { Component } from '@angular/core';
import { AuthorCardComponent } from '../author-card/author-card.component';

@Component({
  selector: 'app-author-list',
  standalone: true,
  imports: [AuthorCardComponent],
  templateUrl: './author-list.component.html',
  styleUrl: './author-list.component.css'
})
export class AuthorListComponent {

}
